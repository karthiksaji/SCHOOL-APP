import { Injectable,NotFoundException,ForbiddenException,HttpException,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,In } from 'typeorm';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Student } from 'src/students/student.entity';
import { Class } from 'src/classes/class.entity';
import { Logger } from '@nestjs/common';


@Injectable()
export class TeachersService {
  private readonly logger = new Logger(TeachersService.name);
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
   
}
