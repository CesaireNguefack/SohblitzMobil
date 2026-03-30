import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('mail')
export class MailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('test')
  async send(@Query('to') to: string) {
    if (!to) {
      return { error: 'Missing ?to=email' };
    }

    return this.emailService.sendTestEmail(to);
  }
}