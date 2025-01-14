import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { Teacher } from './teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from 'src/students/students.service';
import { StudentsModule } from 'src/students/students.module';
import { ClassesModule } from 'src/classes/classes.module';
import { Student } from 'src/students/student.entity';
import { Class } from 'src/classes/class.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Teacher,Student,Class]),StudentsModule],
  providers: [TeachersService],
  controllers: [TeachersController],
  exports:[TeachersService]
  })
export class TeachersModule {}
