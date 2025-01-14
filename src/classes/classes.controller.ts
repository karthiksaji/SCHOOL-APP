import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Class } from './class.entity';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  findAll() {
    return this.classesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(+id);
  }

  @Post()
  create(@Body() classData: Partial<Class>) {
    return this.classesService.create(classData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() classData: Partial<Class>) {
    return this.classesService.update(+id, classData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(+id);
  }
}
