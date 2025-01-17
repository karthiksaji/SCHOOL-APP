import { IsNotEmpty, IsNumber } from "class-validator";
import { ClassesService } from "../classes.service";

export class CreateClassDto {
      
    @IsNotEmpty()
    @IsNumber()
    id:number;

    @IsNotEmpty()
    name: string;

    }
  