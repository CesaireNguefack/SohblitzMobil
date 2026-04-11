import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // ✅ IMPORTANT
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
})
export class AvailabilityModule {}