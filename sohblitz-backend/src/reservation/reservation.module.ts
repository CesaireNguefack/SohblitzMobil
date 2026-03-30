import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailService } from 'src/mail/email.service';

@Module({
  providers: [ReservationService,EmailService],
  controllers: [ReservationController],
  imports:[PrismaModule]
})
export class ReservationModule {}
