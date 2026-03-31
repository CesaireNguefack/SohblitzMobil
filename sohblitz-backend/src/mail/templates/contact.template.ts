import { baseTemplate } from "./base.template";
import { getLang } from 'src/getlanguage';

export function contactTemplate(data: any) {
  const t = getLang(data.lang);

  const content = `
    <h2>${t.contactformsubject}</h2>

    <p>${t.greeting} <strong>${data.name}</strong>,</p>
    <p>${t.contactsubjectbody}</p><br/>
     <p>${t.review}</p>
    <br/>
    <p style="margin-top:20px;">
      ${t.thanks}<br/><br/>
      <strong>${t.team}</strong>
    </p>
  `;

  return baseTemplate(content, t); // 👈 on passe aussi t au layout
}
 
export function contactAdminTemplate(data: any) {
      const t = getLang(data.lang);
      const baseUrl = process.env.FRONTEND_URL;
  const content = `
    <h2>${t.newContact}</h2>

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
        <td style="padding:8px; border:1px solid #ddd;"><strong>Message</strong></td>
        <td style="padding:8px; border:1px solid #ddd;">${data.message}</td>
      </tr>
    </table>
    <br/>
  `;

  return baseTemplate(content,t);
}