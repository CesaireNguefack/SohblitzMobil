import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { EmailService } from 'src/mail/email.service';

@Controller('contact')
export class ContactController {
    constructor(private contactService: ContactService, private emailService:EmailService) { }

    @Post()
    async createContact(@Body() data: any) {
        const result=  this.contactService.createContact(data)
         await this.emailService.sendContactConfirmedEmail(data);
         await this.emailService.sendAdminNotification(data);
         return result
    }

    @Get()
    getContacts() {
        return this.contactService.getContacts()
    }

    // ❌ DELETE
    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.contactService.deleteContact(Number(id))
    }
}