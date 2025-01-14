import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}

  async findAll(): Promise<Class[]> {
    return this.classRepository.find({ relations: ['students', 'teacher'] });
  }

  async findOne(id: number): Promise<Class> {
    return this.classRepository.findOne({
      where: { id },
      relations: ['students', 'teacher'],
    });
  }

  async create(classData: Partial<Class>): Promise<Class> {
    const newClass = this.classRepository.create(classData);
    return this.classRepository.save(newClass);
  }

  async update(id: number, classData: Partial<Class>): Promise<Class> {
    const existingClass = await this.classRepository.findOneBy({ id });
    if (!existingClass) throw new Error('Class not found');

    Object.assign(existingClass, classData);
    return this.classRepository.save(existingClass);
  }

  async remove(id: number): Promise<void> {
    await this.classRepository.delete(id);
  }
}
