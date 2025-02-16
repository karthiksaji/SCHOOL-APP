import {
  Controller,
  All,
  Get,
  UseInterceptors,
  UploadedFile,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  RequestTimeoutException,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Student } from './student.entity';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiProperty,
  ApiConsumes,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateStudentsGroupDto } from './dto/create-students-group.dto';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import * as jwt from 'jsonwebtoken';

@Controller('students')
export class StudentsController {
  private readonly baseUrl = 'http://localhost:3000';
  constructor(private readonly studentsService: StudentsService) {}

  // @ApiOperation({ summary: 'Get all students' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'List of students retrieved successfully.',
  // })
  // @Get()
  // findAll() {
  //   try {
  //     return this.studentsService.findAll();
  //   } catch (error) {
  //     throw new RequestTimeoutException(
  //       'unable to process your request at the momemnt please try again later',
  //       {
  //         description: 'error connecting to database',
  //       },
  //     );
  //   }
  // }

  //for email verfication

  @Get('verify')
  async verifyStudent(@Query('token') token: string): Promise<string> {
    try {
      // Verify the token
      const decoded: any = jwt.verify(token, 'SECRET_KEY'); // Replace with your actual secret key

      // Extract the student ID from the token
      const studentId = decoded.studentId;

      // Update the 'verified' column in the database
      await this.studentsService.verifyStudent(studentId);

      return 'Your email has been successfully verified!';
    } catch (error) {
      console.error('Verification failed:', error.message);
      return 'Invalid or expired verification link.';
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated list of students' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Paginated list of students' })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.studentsService.findAll(paginationQuery);
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
  @ApiBody({
    type: CreateStudentDto,
    examples: {
      updateExample: {
        summary: 'An example to insert a student request',
        value: {
          id: 1,
          name: 'Type a Name',
          age: 21,
          email: 'Type a email',
          classId: 1,
        },
      },
    },
  })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  //add students group

  @Post('group')
  @ApiOperation({ summary: 'Add a group of students' })
  @ApiResponse({ status: 201, description: 'Students added successfully' })
  @ApiBody({
    type: CreateStudentsGroupDto,
    description: 'Group of students to be added',
    examples: {
      default: {
        summary: 'Example input for a group of students',
        value: {
          students: [
            { id: 1, name: 'Arun', classId: 1, age: 0, email: '@example.com' },
            {
              id: 2,
              name: 'sooraj',
              classId: 1,
              age: 0,
              email: '@example.com',
            },
            {
              id: 3,
              name: 'karthik',
              classId: 1,
              age: 0,
              email: '@example.com',
            },
          ],
        },
      },
    },
  })
  async addStudentsGroup(
    @Body() createStudentsGroupDto: CreateStudentsGroupDto,
  ) {
    const savedStudents = await this.studentsService.addStudentsGroup(
      createStudentsGroupDto.students,
    );

    return {
      message: 'Students added successfully',
      studentIds: savedStudents,
    };
  }

  @Put(':id')
  @ApiBody({
    type: UpdateStudentDto,
    examples: {
      updateExample: {
        summary: 'An example to insert a student request',
        value: {
          name: 'Type a Name',
          age: 21,
          email: 'Type a email',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Update student' })
  @ApiResponse({ status: 201, description: 'The student has been updated.' })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Put('/teachers/:id')
  @ApiOperation({ summary: 'Teachers can update student' })
  @ApiResponse({
    status: 201,
    description: 'The student has been updated by Teacher.',
  })
  @ApiBody({
    type: CreateStudentDto,
    examples: {
      updateExample: {
        summary: 'An example teacher can update student request',
        value: {
          name: 'karthik',
          age: 21,
          class: 2,
        },
      },
    },
  })
  updatestudentbyteacher(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
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
  @ApiResponse({
    status: 201,
    description: 'The student has been deleted by Teacher.',
  })
  removestudentbyteacher(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }

  //pic

  @Post(':id/profile-picture')
  @ApiParam({ name: 'id', description: 'The ID of the student', type: Number })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Add profile picture to students' })
  @ApiResponse({
    status: 201,
    description: 'Profile Picture Added Successfully',
  })
  @ApiBody({
    description: 'Upload a profile picture',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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
    @Param('id') id: number,
  ) {
    if (!file) {
      throw new Error('File not uploaded');
    }

    const profilePicturePath = `uploads/${file.filename}`; // Save the relative file path

    const profilePictureUrl = `${this.baseUrl}/uploads/${file.filename}`;

    await this.studentsService.addProfilePicture(id, profilePicturePath); // Save the URL in the database

    return {
      message: 'Profile picture uploaded successfully',
      profilePictureUrl,
    };
  }
}
