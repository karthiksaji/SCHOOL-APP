import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { ClassesModule } from './classes/classes.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'school-app',
    autoLoadEntities: true, 
    synchronize: true, 
  }), ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'), // Serve the "uploads" folder
    serveRoot: '/uploads', // URL prefix for accessing uploaded files
  }),
    StudentsModule,
    TeachersModule,
    ClassesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
