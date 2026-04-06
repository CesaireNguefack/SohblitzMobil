import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getPort from 'get-port'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = await getPort({port:[3001,3002]})

   app.useStaticAssets(join(process.cwd(), 'service_data'), {
    prefix: '/service_data/',
  })
  
   app.enableCors({
    origin: [
                'http://localhost:3000',
                'http://51.75.65.254:3000',
                'https://sohblitz-mobil.de'
              ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true
  });
  
  app.setGlobalPrefix('api');
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`)
}

bootstrap();
