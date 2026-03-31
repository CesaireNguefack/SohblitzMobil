import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getPort from 'get-port'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = await getPort({port:[3001,3002]})

   app.enableCors({
    origin: [
                'http://localhost:3000',
                'http://51.75.65.254:3000'
              ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true
  });
  
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`)
}

bootstrap();  
