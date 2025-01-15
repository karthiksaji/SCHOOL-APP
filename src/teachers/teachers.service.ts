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

   // Method to assign a teacher to multiple classes
   async assignTeacherToClasses(
    teacherId: number,
    classIds: number[]
  ) {
    // Fetch the teacher
    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
      relations: ['classes'], // Get the classes the teacher is already assigned to
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }

    // Fetch the classes by the provided class IDs
    const classes = await this.classRepository.find({
      where: {
        id: In(classIds),  // Use In() to query by multiple IDs
      },
    });

    if (!classes || classes.length === 0) {
      throw new NotFoundException('Classes not found');
    }

    // Assign the classes to the teacher
    teacher.classes = [...teacher.classes, ...classes];
    
    // Save the updated teacher
    await this.teacherRepository.save(teacher);

    return {
      message: 'Teacher successfully assigned to the classes',
      teacher,
    };
  }

  
}
