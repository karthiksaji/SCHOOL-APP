import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Student } from 'src/students/student.entity';
import { Class } from 'src/classes/class.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
  ) {}

  findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find({
      relations: ['class', 'class.students'], // Load related class and students
    });
  }

 async findOne(id: number): Promise<Teacher> {
    return this.teacherRepository.findOne({
      where: { id },
      relations: ['class', 'class.students'],
    });
  }

  async createTeacher(createTeacherDto: CreateTeacherDto) {
    const teacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(teacher);
  }

  //add student to class

  async addStudentToClass(teacherId: number, classId: number, studentId: number) {
    const teacher = await this.teacherRepository.findOne({ where: { id: teacherId }, relations: ['class'] });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    if (teacher.class.id !== classId) {
      throw new ForbiddenException('Teacher is not authorized to manage this class');
    }

    const student = await this.studentRepository.findOne({ where: { id: studentId } });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const classEntity = await this.classRepository.findOne({ where: { id: classId }, relations: ['students'] });

    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }

    if (classEntity.students.find((s) => s.id === studentId)) {
      throw new Error('Student is already in this class');
    }

    classEntity.students.push(student);
    await this.classRepository.save(classEntity);

    return {
      message: 'Student added to class successfully',
      data: { teacherId, classId, studentId },
    };
  }

  async removeStudentFromClass(teacherId: number, classId: number, studentId: number) {
    const teacher = await this.teacherRepository.findOne({ where: { id: teacherId }, relations: ['class'] });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    if (teacher.class.id !== classId) {
      throw new ForbiddenException('Teacher is not authorized to manage this class');
    }

    const classEntity = await this.classRepository.findOne({ where: { id: classId }, relations: ['students'] });

    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }

    classEntity.students = classEntity.students.filter((s) => s.id !== studentId);
    await this.classRepository.save(classEntity);

    return {
      message: 'Student removed from class successfully',
      data: { teacherId, classId, studentId },
    };
  }

}
