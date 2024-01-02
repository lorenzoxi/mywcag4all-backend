import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log("Server running on port: ", process.env.PORT || 3015)
  await app.listen(process.env.PORT || 3015);
}
bootstrap();