import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters';
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //file
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  app.useGlobalFilters(new HttpExceptionFilter());

    // Swagger Configuration
    const config = new DocumentBuilder()
    .setTitle('School App API')
    .setDescription('API documentation for the School Management application')
    .setVersion('1.0')
    .addTag('students')
    .addServer("http://localhost:3000")
    .addTag('classes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
