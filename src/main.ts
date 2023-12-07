/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
// import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      
      const allowedOrigins = ['http://localhost:4200'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  await app.listen(3000)
}
bootstrap();
