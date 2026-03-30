import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceModule } from './service/service.module';
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';
import { MailModule } from './mail/email.module';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      PrismaModule,
      ServiceModule,
      ReservationModule,
      UserModule,
      MailModule
  ],
 // providers: [PrismaService],
  
})

export class AppModule {}
