const logoUrl = "https://snehshilp.org/wp-content/uploads/2024/02/email-logo.png"; // 👈 change this to actual URL

exports.adminTemplate = ({ name, email, mobile, Subject, message }) => `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#f5f7fa; padding:30px;">
    <div style="max-width:650px; margin:0 auto; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 4px 25px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background:linear-gradient(90deg, #4CAF50, #73BE5F); padding:25px; text-align:center;">
        <img src="${logoUrl}" alt="Snehshilp" style="width:130px; margin-bottom:10px;" />
        <h2 style="color:#fff; margin:0; font-size:22px; letter-spacing:0.6px;">New Inquiry Received</h2>
      </div>
      
      <!-- Body -->
      <div style="padding:30px;">
        <p style="font-size:16px; color:#333; margin-bottom:20px;">
          You’ve received a new form submission from <b>Snehshilp</b>. Please find the details below:
        </p>
        
        <table style="width:100%; border-collapse:collapse; font-size:15px;">
          ${[
            ["Full Name", name],
            ["Email", email],
            ["Mobile", mobile],
            ["Subject", Subject],
            ["Message", message],
          ]
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding:12px; border:1px solid #e1e1e1; background:#f9fafc; font-weight:600; color:#4CAF50; width:35%;">${label}</td>
                  <td style="padding:12px; border:1px solid #e1e1e1; color:#333;">${value}</td>
                </tr>
              `
            )
            .join("")}
        </table>
      </div>

      <!-- Divider -->
      <div style="border-top:1px solid #e1e4ec; margin:0 30px;"></div>

      <!-- Footer -->
      <div style="background:#f5f7fb; text-align:center; padding:15px;">
        <p style="margin:0; font-size:14px; color:#666;">
          © ${new Date().getFullYear()} <b>Snehshilp</b> | All Rights Reserved
        </p>
      </div>
    </div>
  </div>
`;

exports.userTemplate = ({ name }) => `
  <div style="font-family:'Segoe UI', Arial, sans-serif; background:#f5f7fa; padding:30px;">
    <div style="max-width:650px; margin:0 auto; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 4px 25px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background:linear-gradient(90deg, #4CAF50, #73BE5F); padding:25px; text-align:center;">
        <img src="${logoUrl}" alt="Snehshilp" style="width:130px; margin-bottom:10px;" />
        <h2 style="color:#fff; margin:0; font-size:22px;">Thank You, ${name}!</h2>
      </div>
      
      <!-- Body -->
      <div style="padding:30px; color:#333; text-align:center;">
        <p style="font-size:17px; margin-bottom:10px;">We’ve received your inquiry successfully.</p>
        <p style="font-size:15px; margin-bottom:20px;">Our team will review your request and get back to you soon.</p>

        <div style="margin:25px auto; padding:20px; border:1px solid #e2e6ef; border-radius:10px; background:#f9fdf9; width:80%;">
          <p style="margin:0; font-size:16px; color:#4CAF50; font-weight:bold;">Snehshilp Team</p>
          <p style="margin:6px 0 0; font-size:13px; color:#666;">Delivering Digital Excellence</p>
        </div>

        <p style="margin-top:25px; font-size:14px; line-height:1.7; color:#444;">
          We truly appreciate your interest in <b>Snehshilp</b>.  
          A representative will connect with you very soon.
        </p>
      </div>

      <!-- Divider -->
      <div style="border-top:1px solid #e1e4ec; margin:0 30px;"></div>

      <!-- Footer -->
      <div style="background:#f5f7fb; text-align:center; padding:15px;">
        <p style="margin:0; font-size:14px; color:#666;">
          © ${new Date().getFullYear()} <b>Snehshilp</b> | Powered by Snehshilp Technologies
        </p>
      </div>
    </div>
  </div>
`;
