import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Class } from 'src/classes/class.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
   age: number;

  @ManyToOne(() => Class, (classEntity) => classEntity.students,{ onDelete: 'CASCADE' })
  class: Class;

  @Column({ nullable: true })
  profilePicture: string; // dp file path/pic store cheyum
}


