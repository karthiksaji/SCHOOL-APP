import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Class } from 'src/classes/class.entity';
import { join } from 'path';
import { name } from 'ejs';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  age: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ default: false }) // Default is false for unverified students
  verified: boolean;

  @ManyToOne(() => Class, (classEntity) => classEntity.students, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'class' })
  class: Class;

  @Column({ nullable: true })
  profilePicture: string; // dp file path/pic store cheyum
}
