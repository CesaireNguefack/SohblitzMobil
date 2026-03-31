import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('mail')
export class MailController {
  constructor(private readonly emailService: EmailService) {}

   
}