import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find({
      relations: ['class', 'class.students'], // Load related class and students
    });
  }

  findOne(id: number): Promise<Teacher> {
    return this.teacherRepository.findOne({
      where: { id },
      relations: ['class', 'class.students'],
    });
  }

  async createTeacher(createTeacherDto: CreateTeacherDto) {
    const teacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(teacher);
  }
}
