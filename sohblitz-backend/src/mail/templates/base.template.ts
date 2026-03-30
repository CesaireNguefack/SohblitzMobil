// templates/base.template.ts


export function baseTemplate(content:any, t?: any) {
  return `
  <html>
  <body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" bgcolor="#5f7fa3" style="border-radius:8px; overflow:hidden;">

            <!-- HEADER -->
            <tr>
              <td style="padding:20px; text-align:center; color:white; font-size:22px; font-weight:bold;">
                SOHBLITZ Mobil
              </td>
            </tr>

            <!-- CONTENT -->
            <tr>
              <td style="background:#ffffff; padding:30px; color:#1f2d3d;">
                ${content}
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:15px; text-align:center; color:white; font-size:12px;">
               ${t.thanks}
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
}