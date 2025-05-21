import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

import { loadEnvConfig } from '@next/env';
const projectDir = process.cwd();
loadEnvConfig(join(projectDir, '..'));

import { NestExpressApplication } from '@nestjs/platform-express';

import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { sessionMiddleware } from './session.middleware';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.use(cookieParser());
  app.use(sessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT);
}
bootstrap();
