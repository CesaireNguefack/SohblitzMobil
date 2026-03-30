// templates/cancel.template.ts

import { getLang } from "src/getlanguage";
import { baseTemplate } from "./base.template";

export function cancelTemplate(data: any) {
     const t = getLang(data.lang);
  const content = `
    
    <p>Bonjour <strong>${data.name}</strong>,</p>

    <p>
      ${t.callationDetail}
    </p>
     <table width="100%" style="border-collapse:collapse; margin-top:20px;">
      <tr>
        <td style="padding:8px; border:1px solid #ddd;"><strong>Service</strong></td>
        <td style="padding:8px; border:1px solid #ddd;">${data.service.titre}</td>
      </tr>
      <tr>
        <td style="padding:8px; border:1px solid #ddd;"><strong>Adresse</strong></td>
        <td style="padding:8px; border:1px solid #ddd;">${data.street}, ${data.zipcode} ${data.city}</td>
      </tr>
      <tr>
        <td style="padding:8px; border:1px solid #ddd;"><strong>Date</strong></td>
        <td style="padding:8px; border:1px solid #ddd;">${data.date}</td>
      </tr>
    </table>
    <p>
      ${t.callationerror}
    </p>

    <br/>
    <p style="margin-top:20px;">
      ${t.salutation}<br/> <br/>
      <strong>${t.team}</strong>
    </p>
  `;

  return baseTemplate(content,t);
}