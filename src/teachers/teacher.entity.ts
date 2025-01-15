import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,JoinTable, ManyToMany } from 'typeorm';
import { Class } from 'src/classes/class.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @OneToOne(() => Class, (classEntity) => classEntity.teacher, { cascade: true })
  @JoinColumn()
  class: Class;

  @ManyToMany(() => Class, (classEntity) => classEntity.teachers)
  @JoinTable()
  classes: Class[];

  @Column({ nullable: true })
  subject: string;

  @Column({ type: 'int', default: 0 })
  experience: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
