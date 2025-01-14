import { Controller, Get, Param,Body,Post} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

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
