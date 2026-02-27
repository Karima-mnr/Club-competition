import { transporter } from "./mailTransporter.js";
import 'dotenv/config';

export async function sendEvaluationAnnouncement(email) {
  const mailOptions = {
    from: `"InfoBrains Club" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "📢 InfoBrains Club – New Evaluation Date | Tuesday, March 3rd",
    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 15px 40px rgba(0,0,0,0.08);">

<!-- HEADER -->
<tr>
<td style="background:linear-gradient(135deg,#198ACD,#28BBE8);padding:40px 30px;text-align:center;">
<h1 style="color:#ffffff;margin:0;font-size:32px;font-weight:800;">
INFOBRAINS CLUB
</h1>
<p style="color:rgba(255,255,255,0.9);margin-top:8px;">
Scientific Club – Computer Science Department 🎓
</p>
</td>
</tr>

<!-- CONTENT -->
<tr>
<td style="padding:40px 30px;color:#333;line-height:1.6;">

<h2 style="margin-top:0;">Dear future InfoBrains member 🧠💻,</h2>

<p>
We have received your registration and we are truly grateful for your interest! 🎉
</p>

<p>
We are pleased to inform you that the membership evaluations will take place on:
</p>

<div style="background:#f9fafb;padding:20px;border-radius:12px;margin:20px 0;">
<p style="margin:8px 0;"><strong>📅 Date:</strong> Tuesday, March 3rd</p>
<p style="margin:8px 0;"><strong>📍 Venue:</strong> Department of Computer Science (Library Room, Rooms 6 & 7, 2nd floor)</p>
</div>

<h3>🎯 What To Bring</h3>
<ul style="padding-left:20px;">
<li>✅ Your enthusiasm</li>
<li>✅ Your curiosity</li>
<li>✅ Your willingness to learn</li>
<li>✅ Your laptop 💻</li>
</ul>

<p>
That's all you need! 🚀<br/>
Don't forget to bring your project to showcase your skills!
</p>

<hr style="margin:30px 0;border:none;border-top:1px solid #eee;"/>

<h3>💬 A Message For You</h3>

<p style="font-style:italic;background:#f3f4f6;padding:20px;border-radius:12px;">
"The expert in anything was once a beginner. You don't have to be great to start, but you have to start to be great. This is your moment — show up, give your best, and let your passion speak louder than your doubts."
</p>

<p>
We believe in you. 💪🔥
</p>

<p style="margin-top:30px;">
See you on Tuesday! 😊<br/><br/>
<strong>The InfoBrains Team</strong>
</p>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#888;">
© 2026 InfoBrains Club. All rights reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Evaluation email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Error sending evaluation email:", error);
    throw error;
  }
}