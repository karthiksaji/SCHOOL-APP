import { PartialType } from "@nestjs/mapped-types";
import { CreateStudentDto } from "./create-student.dto";
import { IsNotEmpty } from "class-validator";

export class CreateStudentsGroupDto extends PartialType(CreateStudentDto) {
    @IsNotEmpty()
    students: CreateStudentDto[];
  }