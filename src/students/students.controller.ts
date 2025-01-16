import { Controller,All, Get,  UseInterceptors,
  UploadedFile, Post, Put, Delete, Body, Param,RequestTimeoutException } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Student } from './student.entity';
import { ApiOperation,ApiResponse,ApiBody,ApiParam } from '@nestjs/swagger';


@Controller('students')
export class StudentsController {
  private readonly baseUrl = 'http://localhost:3000';
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'List of students retrieved successfully.' })
  @Get()
  findAll() {
    try{
    return this.studentsService.findAll();
    }catch(error){
      throw new RequestTimeoutException(
        'unable to process your request at the momemnt please try again later',
        {
            description:'error connecting to database'
        },
    )
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the student' })
  @ApiResponse({ status: 200, description: 'The student has been retrieved.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new student' })
  @ApiResponse({ status: 201, description: 'The student has been created.' })
  @ApiBody({ type: Student })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update student' })
  @ApiResponse({ status: 201, description: 'The student has been updated.' })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  
  @Put('/teachers/:id')
  @ApiOperation({ summary: 'Teachers can update student' })
  @ApiResponse({ status: 201, description: 'The student has been updated by Teacher.' })
  updatestudentbyteacher(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'To Delete student' })
  @ApiResponse({ status: 201, description: 'The student is Deleted.' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }

  @Delete('/teachers/:id')
  @ApiOperation({ summary: 'Teacher can delete student' })
  @ApiResponse({ status: 201, description: 'The student has been deleted by Teacher.' })
  removestudentbyteacher(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }

  //pic

  @Post(':id/profile-picture')
  @ApiOperation({ summary: 'Add profile picture to students' })
  @ApiResponse({ status: 201, description: 'Profile Picture Added Successfully' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + extname(file.originalname);
          cb(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    }),
  )
  async addProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Body('id') id: number,
  ) {
    if (!file) {
      throw new Error('File not uploaded');
    }

        const profilePicturePath = `uploads/${file.filename}`; // Save the relative file path

        const profilePictureUrl = `${this.baseUrl}/uploads/${file.filename}`;

     
      await this.studentsService.addProfilePicture(id, profilePictureUrl); // Save the URL in the database 
    return this.studentsService.addProfilePicture(id, profilePicturePath);
    return { message: 'Profile picture uploaded successfully', profilePictureUrl };
  }
}




