import { ApiProperty } from "@nestjs/swagger";
import { StudentsService } from "../students.service";
import { IsNotEmpty, IsInt, Min, IsEmail, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "Name of the student",
    example: 'karthik'
  })
  name: string;

  @IsInt()
  @Min(0)
  @ApiProperty({
    description: "Age of the student",
    example: '28'
  })
  age: number;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(96)
  @ApiProperty({
    description: "Email of the student",
    example: 'karthik@gmail.com'
  })
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: "ID of the student",
    example: '10'
  })
  id: number;

  @IsNotEmpty()
  @ApiProperty({
    description: "Class Number of the student",
    example: 'karthik'
  })
  classId: number;
  // This maps to Class entity
}
