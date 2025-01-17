import { StudentsService } from "../students.service";
import { IsNotEmpty, IsInt, Min, IsEmail ,IsString,MaxLength,IsNumber} from 'class-validator';

export class CreateStudentDto {
    @IsNotEmpty()
    name: string;

    @IsInt()
    @Min(0)
    age: number;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(96)
    email:string;

    @IsNotEmpty()
    @IsNumber()
    id: number; 

    @IsNotEmpty()
    classId: number; 
    // This maps to Class entity
  }
  