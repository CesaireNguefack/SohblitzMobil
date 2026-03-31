import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailService } from 'src/mail/email.service';

@Module({
  providers: [ContactService,EmailService],
  controllers: [ContactController],
  imports:[PrismaModule]
})
export class ContactModule {}
