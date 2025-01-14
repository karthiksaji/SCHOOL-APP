import { StudentsService } from "../students.service";
import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateStudentDto {
    @IsNotEmpty()
    name: string;

    @IsInt()
    @Min(0)
    age: number;

    @IsNotEmpty()
    classId: number; 
    // This maps to Class entity
  }
  