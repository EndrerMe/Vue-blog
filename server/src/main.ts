import { NestFactory } from '@nestjs/core';
import {INestApplication} from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { join } from 'path';
import * as fmp from 'fastify-multipart';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    http2: true,
    logger: true,
    https: {
      allowHTTP1: true, // fallback support for HTTP1
    },
  });

  fastifyAdapter.register(fmp, {
    limits: {
      fieldNameSize: 1000, // Max field name size in bytes
      fieldSize: 10000000, // Max field value size in bytes
      fields: 100,         // Max number of non-file fields
      fileSize: 1000,      // For multipart forms, the max file size
      files: 10,           // Max number of file fields
      headerPairs: 20000,   // Max number of header key=>value pairs
    },
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  app.enableCors();
  app.useStaticAssets({
    root: join(__dirname, '..', './public'),
    prefix: '/public/',
  });
  await app.listen(3000);
}
bootstrap();
