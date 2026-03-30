import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as nodemailer from "nodemailer";
import { cancelTemplate } from './templates/cancel.template.js';
import { adminTemplate } from './templates/admin.template.js';
import { confirmTemplate, reservationTemplate } from './templates/confirm.template.js';
import { getLang } from 'src/getlanguage';

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

    // 📩 CANCELLED
    async sendCancelledNotification(reservation: any) {
        return this.send(
            reservation.email,
            getLang(reservation.lang).cancelled,
            cancelTemplate(reservation)
        );
    }





















    // 📩 USER EMAIL
    async sendUserConfirmation(reservation: any) {
        const t = getLang(reservation.lang);

        return this.mailer.sendMail({
            to: reservation.email,
            subject: t.userSubject,
            html: `
      <div style="font-family:Arial;background:#f4f6f8;padding:30px">
        <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:10px">
          
          <h2 style="color:#2b6cb0">Sohblitz Mobile</h2>

          <p>${t.greeting} <b>${reservation.name}</b>,</p>

          <p>${t.received}</p>

          <div style="margin:20px 0;padding:15px;background:#edf2f7;border-radius:8px">
            <p><b>Service:</b> ${reservation.service}</p>
          </div>

          <p>${t.review}</p>

          <hr/>
          <p style="font-size:12px;color:gray">© Sohblitz-Mobile</p>
        </div>
      </div>
      `,
        });
    }

    // 📩 ADMIN EMAIL
    async sendAdminNotification(reservation: any) {
        const t = getLang(reservation.lang);
        const baseUrl = process.env.APP_URL;

        return this.mailer.sendMail({
            // to: 'contact@sublimeprod.com',
            to: process.env.ADMIN_EMAIL,
            subject: t.adminSubject,
            html: `
      <div style="font-family:Arial;padding:20px">
        <h2>${t.adminSubject}</h2>

        <p><b>Client:</b> ${reservation.name}</p>
        <p><b>Email:</b> ${reservation.email}</p>
        <p><b>Service:</b> ${reservation.service}</p>
        <br/>

        <a href="${baseUrl}/reservation/besteatigen/${reservation.id}" 
           style="background:#28a745;color:white;padding:12px 20px;text-decoration:none;border-radius:5px;margin-right:10px;">
           ${t.confirmBtn}
        </a>

        <a href="${baseUrl}/reservation/stonieren/${reservation.id}" 
           style="background:#dc3545;color:white;padding:12px 20px;text-decoration:none;border-radius:5px;">
           ${t.cancelBtn}
        </a>
      </div>
      `,
        });
    }


    async sendTestEmail(to: string) {
        try {
            const result = await this.mailer.sendMail({
                to,
                subject: 'Bienvenue chez Sohblitz Mobile',
                text: 'Bonjour, ceci est un email de test professionnel.',
                html: `
    <div>
      <h1>Bienvenue chez Sohblitz Mobile</h1>
      <p>Ceci est un email de test professionnel.</p>
      <p>Merci.</p>
    </div>
  `,
            });

            console.log('EMAIL SENT:', result);
            return { success: true, result };
        } catch (error) {
            console.error('EMAIL ERROR:', error);
            throw error;
        }
    }
}
