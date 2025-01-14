import { Controller, Get, Param,Body,Post,Delete,NotFoundException,BadRequestException,  HttpException, 
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

//to add student

@Post(':teacherId/classes/:classId/add-student')
async addStudentToClass(
  @Param('teacherId') teacherId: number,
  @Param('classId') classId: number,
  @Body() addStudentDto: AddStudentDto,
) {
  try {
    return await this.teachersService.addStudentToClass(teacherId, classId, addStudentDto.studentId);
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}


// remove student

@Delete(':teacherId/classes/:classId/remove-student')
async removeStudentFromClass(
  @Param('teacherId') teacherId: number,
  @Param('classId') classId: number,
  @Body() addStudentDto: AddStudentDto,
) {
  try {
    return await this.teachersService.removeStudentFromClass(teacherId, classId, addStudentDto.studentId);
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}

}
