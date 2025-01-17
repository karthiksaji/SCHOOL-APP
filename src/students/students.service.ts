import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { Class } from '../classes/class.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) { }

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find({ relations: ['class', 'class.teacher'] });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['class','class.teacher'],
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async save(student: Student): Promise<Student> {
    return this.studentRepository.save(student);
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const { classId, ...studentData } = createStudentDto;

    const classEntity = await this.classRepository.findOne({ where: { id: classId } });
    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${classId} not found`);
    }

    const newStudent = this.studentRepository.create({
      ...studentData,
      class: classEntity,
    });
    return this.studentRepository.save(newStudent);
  }

  //creating group of students

  async addStudentsGroup(students: CreateStudentDto[]): Promise<number[]> {
    const savedStudents: number[] = [];

    for (const student of students) {
      // Check if the email is already used
      const existingStudent = await this.studentRepository.findOne({
        where: { email: student.email },
      });

      if (existingStudent) {
        throw new Error(`Email ${student.email} is already in use.`);
      }

      // Create and save the student
      const newStudent = this.studentRepository.create(student);
      await this.studentRepository.save(newStudent);

      // Keep track of saved student IDs
      savedStudents.push(newStudent.id);
    }

    return savedStudents;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const { classId, ...studentData } = updateStudentDto;

    const existingStudent = await this.studentRepository.findOne({
      where: { id },
      relations: ['class'],
    });
    if (!existingStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }



    if (classId) {
      const classEntity = await this.classRepository.findOne({ where: { id: classId } });
      if (!classEntity) {
        throw new NotFoundException(`Class with ID ${classId} not found`);
      }
      existingStudent.class = classEntity;
    }

    Object.assign(existingStudent, studentData);
    return this.studentRepository.save(existingStudent);
  }

  async updatestudentbyteacher(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const { classId, ...studentData } = updateStudentDto;

    const existingStudent = await this.studentRepository.findOne({
      where: { id },
      relations: ['class'],
    });
    if (!existingStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    if (classId) {
      const classEntity = await this.classRepository.findOne({ where: { id: classId } });
      if (!classEntity) {
        throw new NotFoundException(`Class with ID ${classId} not found`);
      }
      existingStudent.class = classEntity;
    }

    Object.assign(existingStudent, studentData);
    return this.studentRepository.save(existingStudent);
  }


  async remove(id: number): Promise<void> {
    const result = await this.studentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }


  async removestudentbyteacher(id: number): Promise<void> {
    const result = await this.studentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }
  //pf method
  async addProfilePicture(id: number, profilePicturePath: string): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student) {
      throw new Error('Student not found');
    }

    student.profilePicture = profilePicturePath;
    return await this.studentRepository.save(student);
  }

}
