import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Class } from 'src/classes/class.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Student]),TypeOrmModule.forFeature([Class])],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports:[StudentsService],
  
})
export class StudentsModule {}
