import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Class } from './class.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Class])],
  providers: [ClassesService],
  controllers: [ClassesController],
  exports:[ClassesService]
})
export class ClassesModule {}
