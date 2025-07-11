import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import chalk from 'chalk';

async function start() {
  try {
    const PORT = process.env.PORT ?? 3000;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    app.enableCors({
      origin: (origin, callback) => {
        const allowOrigins = [
          'http://localhost:8000',
          'http://localhost:3000',
          'http://myticket.uz',
          'http://api.myticket.uz',
          'http://myticket.vercel.app',
        ];
        if (!origin || allowOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('Not allowed by CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, //cookie of header
    });

    const config = new DocumentBuilder()
      .setTitle('my_ticket')
      .setDescription('myTicket API')
      .setVersion('1.0')
      .addTag(
        'mongoDb, swagger, validation, accessToken, refreshToken cookie , smm, guards',
      )
      .addBearerAuth()
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, documentFactory);

    await app.listen(PORT, () => {
      console.log(`
    ${chalk.magentaBright.magentaBright('🎟️  Ticket System Online! ')}
    🔗 URL: ${chalk.cyan.underline(`http://localhost:${PORT}`)}
    🕓 Time: ${chalk.gray(new Date().toLocaleTimeString())}
    `);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
