import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { sessionMiddleware } from './session.middleware';
// import { WsAdapter } from './WsAdapter';

const PORT = process.env.PORT;

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

  // app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(PORT);
}
bootstrap();
