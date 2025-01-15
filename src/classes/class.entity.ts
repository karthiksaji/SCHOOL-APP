import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany,JoinTable } from 'typeorm';
import { Student } from '../students/student.entity';
import { Teacher } from '../teachers/teacher.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Teacher, (teacher) => teacher.class)
  teacher: Teacher;

  @ManyToMany(() => Teacher, (teacher) => teacher.classes)
  @JoinTable() 
  teachers: Teacher[];

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];
}
