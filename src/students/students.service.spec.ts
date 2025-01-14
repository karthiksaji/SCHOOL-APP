import { Injectable } from '@nestjs/common';
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
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find({ relations: ['class'] });
  }

  async findOne(id: number): Promise<Student> {
    return this.studentRepository.findOne({
      where: { id },
      relations: ['class'],
    });
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const { classId, ...studentData } = createStudentDto;
    const classEntity = await this.classRepository.findOneBy({ id: classId });
    if (!classEntity) throw new Error('Class not found');

    const newStudent = this.studentRepository.create({
      ...studentData,
      class: classEntity,
    });
    return this.studentRepository.save(newStudent);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const existingStudent = await this.studentRepository.findOneBy({ id });
    if (!existingStudent) throw new Error('Student not found');

    if (updateStudentDto.classId) {
      const classEntity = await this.classRepository.findOneBy({ id: updateStudentDto.classId });
      if (!classEntity) throw new Error('Class not found');
      existingStudent.class = classEntity;
    }

    Object.assign(existingStudent, updateStudentDto);
    return this.studentRepository.save(existingStudent);
  }

  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
