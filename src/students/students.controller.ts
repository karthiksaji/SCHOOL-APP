import { Controller,All, Get,  UseInterceptors,
  UploadedFile, Post, Put, Delete, Body, Param,RequestTimeoutException } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Student } from './student.entity';


@Controller('students')
export class StudentsController {
  private readonly baseUrl = 'http://localhost:3000';
  constructor(private readonly studentsService: StudentsService) {}

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
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  
  @Put('/teachers/:id')
  updatestudentbyteacher(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }

  @Delete('/teachers/:id')
  removestudentbyteacher(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }

  //pic

  @Post(':id/profile-picture')
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

    // Call the service to update the student record with the image path
    const profilePicturePath = `uploads/${file.filename}`; // Save the relative file path

      // Construct the full URL for the profile picture
      const profilePictureUrl = `${this.baseUrl}/uploads/${file.filename}`;

      // Save the URL in the database or handle it as needed
      await this.studentsService.addProfilePicture(id, profilePictureUrl);
    return this.studentsService.addProfilePicture(id, profilePicturePath);
    return { message: 'Profile picture uploaded successfully', profilePictureUrl };
  }
}




