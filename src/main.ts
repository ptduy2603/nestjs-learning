import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import {
  VersioningType,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';
import { config } from 'dotenv';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            [error.property]: error.constraints
              ? Object.values(error.constraints)[0]
              : 'validation failed',
          })),
        );
      },
    }),
  );

  // set up dotenv
  config({ path: join(__dirname, '../.env') });

  console.log('CLOUDINARY_URL:', process.env.CLOUDINARY_URL);
  console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);

  // enable versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
