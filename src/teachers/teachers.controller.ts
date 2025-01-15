import { Controller, Get,Put, Param,Body,Post,Delete,NotFoundException,BadRequestException,  HttpException, 
  HttpStatus } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { StudentsService } from 'src/students/students.service';
import { AddStudentDto } from 'src/students/dto/add-student.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService,
              private readonly studentsService:StudentsService
  ) {}

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(+id);
  }

  @Post()
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
  return this.teachersService.createTeacher(createTeacherDto);
}


}
