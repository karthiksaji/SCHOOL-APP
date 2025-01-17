import { Controller, Get,Put, Param,Body,Post,Delete,NotFoundException,BadRequestException,  HttpException, 
  HttpStatus } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { StudentsService } from 'src/students/students.service';
import { AddStudentDto } from 'src/students/dto/add-student.dto';
import { ApiOperation,ApiResponse,ApiBody,ApiParam } from '@nestjs/swagger';
import { Teacher } from './teacher.entity';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService,
              private readonly studentsService:StudentsService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get the details of every teachers and also shows corresponding class and thier students ' })
  @ApiResponse({ status: 200, description: 'The teachers details has been retrieved.' })
  @ApiResponse({ status: 404, description: 'teachers not found.' })
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
   @ApiOperation({ summary: 'Get a teacher by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the teacher' })
  @ApiResponse({ status: 200, description: 'The teacher has been retrieved.' })
  @ApiResponse({ status: 404, description: 'teacher not found.' })
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Teacher' })
  @ApiResponse({ status: 201, description: 'The Teacher has been created.' })
  @ApiBody({ type: Teacher })
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
  return this.teachersService.createTeacher(createTeacherDto);
}


}
