import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Автоматически преобразует входящие данные в классы DTO
      whitelist: true, // Удаляет свойства, не указанные в DTO
      forbidNonWhitelisted: true, // Возвращает ошибку, если есть лишние свойства
      validateCustomDecorators: true, // Включает валидацию пользовательских декораторов
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API for Flipper')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 5001)
}

bootstrap()
