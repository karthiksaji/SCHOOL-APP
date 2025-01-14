import { IsNumber } from 'class-validator';

export class AddStudentDto {
  @IsNumber()
  studentId: number;
}
