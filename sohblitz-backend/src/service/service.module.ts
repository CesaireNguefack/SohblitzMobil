import { Module } from '@nestjs/common';
import {  ServicesService } from './service.service';
import { ServicesController } from './service.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ServicesService],
  controllers: [ServicesController],
  imports:[PrismaModule]
})
export class ServiceModule {}
