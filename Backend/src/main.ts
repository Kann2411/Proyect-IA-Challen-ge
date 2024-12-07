import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rutasMiddleware } from './middleware/middleware.rutas';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(rutasMiddleware);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Gimnasio')
    .setDescription('API para el gimnasio')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
