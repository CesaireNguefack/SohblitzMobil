// templates/admin.template.ts

import { baseTemplate } from "./base.template";
import { getLang } from 'src/getlanguage';

export function adminTemplate(data: any) {
    const t = getLang(data.lang);
      const baseUrl = process.env.FRONTEND_URL;
  const content = `
    <h2>${t.newReservation}</h2>

    <table width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:8px; border:1px solid #ddd;"><strong>Nom</strong></td>
        <td style="padding:8px; border:1px solid #ddd;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding:8px; border:1px solid #ddd;"><strong>Email</strong></td>
        <td style="padding:8px; border:1px solid #ddd;">${data.email}</td>
      </tr>
       <tr>
        <td style="padding:8px; border:1px solid #ddd;"><strong>Tel</strong></td>
        <td style="padding:8px; border:1px solid #ddd;">${data.phone}</td>
      </tr>
      <tr>
        <td style="padding:8px; border:1px solid #ddd;"><strong>Service</strong></td>
        <td style="padding:8px; border:1px solid #ddd;">${data.service.titre}</td>
      </tr> 
       <tr>
        <td style="padding:8px; border:1px solid #ddd;"><strong>Adresse</strong></td>
        <td style="padding:8px; border:1px solid #ddd;">${data.street}, ${data.zipcode} ${data.city}</td>
      </tr>
       <tr>
        <td style="padding:8px; border:1px solid #ddd;"><strong>Message</strong></td>
        <td style="padding:8px; border:1px solid #ddd;">${data.message}</td>
      </tr>
    </table>
    <br/>
       <a href="${baseUrl}/de/reservation/confirm/${data.id}" 
           style="background:#28a745;color:white;padding:12px 20px;text-decoration:none;border-radius:5px;margin-right:10px;">
           ${t.confirmBtn}
        </a>

        <a href="${baseUrl}/de/reservation/cancel/${data.id}" 
           style="background:#dc3545;color:white;padding:12px 20px;text-decoration:none;border-radius:5px;">
           ${t.cancelBtn}
        </a>
  `;

  return baseTemplate(content,t);
} 