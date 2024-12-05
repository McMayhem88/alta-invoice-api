import {ValidationPipe} from "@nestjs/common";
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
  });
  
  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
