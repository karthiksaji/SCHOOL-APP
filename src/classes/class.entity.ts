import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Student } from '../students/student.entity';
import { Teacher } from '../teachers/teacher.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];

  @OneToOne(() => Teacher, (teacher) => teacher.class)
  teacher: Teacher;
}
