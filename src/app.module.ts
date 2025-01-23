import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { ClassesModule } from './classes/classes.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

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
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Serve the "uploads" folder
      serveRoot: '/uploads', // URL prefix for accessing uploaded files
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: '3kingsofficial29@gmail.com',
          pass: 'jscg qgii zycs uqug',
        },
      },
      defaults: {
        from: '"School App" <3kingsofficial29@gmail.com>', // Default "from" address
      },
      template: {
        dir: join(__dirname, '..', 'src', 'templates'), // Ensure the path to templates is correct
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
    StudentsModule,
    TeachersModule,
    ClassesModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
