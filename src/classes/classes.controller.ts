import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Class } from './class.entity';
import { ApiOperation,ApiResponse,ApiBody,ApiParam } from '@nestjs/swagger';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  @ApiOperation({ summary: 'Get the details of every classes ' })
  @ApiResponse({ status: 200, description: 'The class details has been retrieved.' })
  @ApiResponse({ status: 404, description: 'The Classes not found.' })
  findAll() {
    return this.classesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a class by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the Class' })
  @ApiResponse({ status: 200, description: 'The Class has been retrieved.' })
  @ApiResponse({ status: 404, description: 'The class not found.' })
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Class' })
  @ApiResponse({ status: 201, description: 'The class has been created.' })
  @ApiBody({ type: Class})
  create(@Body() classData: Partial<Class>) {
    return this.classesService.create(classData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'To Update class' })
  @ApiResponse({ status: 201, description: 'The Class has been updated.' })
  @ApiResponse({ status: 404, description: 'The Class has not been updated.' })
  update(@Param('id') id: string, @Body() classData: Partial<Class>) {
    return this.classesService.update(+id, classData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'To delete a class' })
  @ApiResponse({ status: 201, description: 'The class has been deleted' })
    remove(@Param('id') id: string) {
    return this.classesService.remove(+id);
  }
}
