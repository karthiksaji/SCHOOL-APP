import { IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateTeacherDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    subject: string;

    @IsInt()
    @Min(0)
    experience: number;
  }
  