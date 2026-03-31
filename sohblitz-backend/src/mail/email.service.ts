import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as nodemailer from "nodemailer";
import { cancelTemplate } from './templates/cancel.template.js';
import { adminTemplate } from './templates/admin.template.js';
import { confirmTemplate, reservationTemplate } from './templates/confirm.template.js';
import { getLang } from 'src/getlanguage';
import { contactAdminTemplate, contactTemplate } from './templates/contact.template.js';

@Injectable()
export class EmailService {
    private transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });
    constructor(private readonly mailer: MailerService) { }


    async send(to: string, subject: string, html: string) {
        if (!to) throw new Error("No recipient");

        return this.transporter.sendMail({
            from: `"Sohblitz Mobil" <${process.env.MAIL_USER}>`,
            to,
            subject,
            html,
        });
    }

    // 📩 CONFIRMED RECEIVE RESERVATION
    async sendUserConfirmedEmail(reservation: any) {
        return this.send(
            reservation.email,
            getLang(reservation.lang).userSubject,
            reservationTemplate(reservation)
        );
    }

    // 📩 NOTIFY ADMIN NEW RESERVATION
    async notifyAdmin(reservation: any) {
        return this.send(
            process.env.ADMIN_EMAIL!,
            getLang(reservation.lang).adminSubject,
            adminTemplate(reservation)
        );
    }

    // 📩 CONFIRMED
    async sendConfirmedEmail(reservation: any) {
        return this.send(
            reservation.email,
            getLang(reservation.lang).confirmed,
            confirmTemplate(reservation)
        );
    }

      // 📩 CONFIRMED
    async sendContactConfirmedEmail(contact: any) {
        return this.send(
            contact.email,
            getLang(contact.lang).contactformsubject,
            contactTemplate(contact)
        );
    }

    // 📩 CANCELLED
    async sendCancelledNotification(reservation: any) {
        return this.send(
            reservation.email,
            getLang(reservation.lang).cancelled,
            cancelTemplate(reservation)
        );
    }

      // 📩 ADMIN EMAIL
    async sendAdminNotification(contact: any) {
         return this.send(
            process.env.ADMIN_EMAIL!,
            getLang(contact.lang).newContact,
            contactAdminTemplate(contact)
        );
    }
}