// utils/sendEmail.js
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('❌ Email server connection error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

export async function sendRegistrationConfirmation(studentData) {
  console.log('📧 Attempting to send email to:', studentData.email);
  
  const { email, fullName, category, level } = studentData;

  // Format category name for display
  const categoryDisplay = {
    web: 'Web Development',
    mobile: 'Mobile Development',
    ai: 'AI & Machine Learning',
    iot: 'IoT & Robotics',
    security: 'Network & Security',
    media: 'Media Team'
  }[category] || category;

  // Determine category-specific message
  const categoryMessage = category === 'iot' 
    ? 'Bring your IoT/Robotics projects to showcase!'
    : 'Bring a project you\'ve built before to showcase your skills!';

  const mailOptions = {
    from: `"InfoBrains Club" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '✅ Registration Confirmed - InfoBrains Competition 2026',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <style>
          /* Reset styles */
          body, p, h1, h2, h3, h4, div, table, td, img {
            margin: 0;
            padding: 0;
            border: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.5;
          }
          
          /* Mobile styles */
          @media screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .inner-container { padding: 15px !important; }
            .header { padding: 30px 15px !important; }
            .content { padding: 25px 20px !important; }
            .grid-2 { display: block !important; }
            .grid-item { width: 100% !important; margin-bottom: 10px !important; }
            h1 { font-size: 28px !important; }
            h2 { font-size: 24px !important; }
            .icon-box { width: 45px !important; height: 45px !important; }
          }
          
          /* Dark mode */
          @media (prefers-color-scheme: dark) {
            body { background-color: #0a1219 !important; }
            .card { background: #1a2632 !important; border-color: #2d3748 !important; }
            .bg-light { background: #1f2a36 !important; }
            .text-primary { color: #60a5fa !important; }
            .text-secondary { color: #9ca3af !important; }
            .border-light { border-color: #2d3748 !important; }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 20px; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        
        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f3f4f6;">
          <tr>
            <td align="center" style="padding: 20px;">
              <table class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                
                <!-- Header with Gradient (No Logo) -->
                <tr>
                  <td style="background: linear-gradient(135deg, #198ACD 0%, #28BBE8 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: white; font-size: 42px; font-weight: 800; margin: 0; letter-spacing: 1px; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">INFOBRAINS</h1>
                    <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 5px 0 0;">Innovation & Technology Club</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;" class="content">
                    
                    <!-- Welcome Message -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding-bottom: 25px;">
                          <div style="display: inline-block; background: rgba(40, 187, 232, 0.1); padding: 8px 20px; border-radius: 50px; border: 1px solid rgba(40, 187, 232, 0.3); margin-bottom: 15px;">
                            <span style="color: #28BBE8; font-weight: 600;">✅ Registration Confirmed</span>
                          </div>
                          <h2 style="color: #121B21; font-size: 32px; font-weight: 700; margin: 0 0 5px;">Hello ${fullName}!</h2>
                          <p style="color: #6B7280; font-size: 18px; margin: 0;">Welcome to the InfoBrains family! 🎉</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Registration Details Card -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, rgba(25,138,205,0.05) 0%, rgba(40,187,232,0.05) 100%); border: 1px solid rgba(40,187,232,0.2); border-radius: 20px; margin-bottom: 25px;">
                      <tr>
                        <td style="padding: 25px;">
                          <h3 style="color: #28BBE8; font-size: 20px; font-weight: 600; margin: 0 0 20px;">📋 Your Registration Details</h3>
                          
                          <!-- 2-column grid -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="48%" style="background: rgba(0,0,0,0.02); padding: 15px; border-radius: 12px; vertical-align: top;">
                                <p style="color: #6B7280; font-size: 13px; margin: 0 0 5px;">Category</p>
                                <p style="color: #121B21; font-size: 18px; font-weight: 600; margin: 0;">${categoryDisplay}</p>
                              </td>
                              <td width="4%"></td>
                              <td width="48%" style="background: rgba(0,0,0,0.02); padding: 15px; border-radius: 12px; vertical-align: top;">
                                <p style="color: #6B7280; font-size: 13px; margin: 0 0 5px;">Level</p>
                                <p style="color: #121B21; font-size: 18px; font-weight: 600; margin: 0;">${level}</p>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- Registration Date -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px;">
                            <tr>
                              <td style="background: rgba(0,0,0,0.02); padding: 15px; border-radius: 12px;">
                                <p style="color: #6B7280; font-size: 13px; margin: 0 0 5px;">Registration Date</p>
                                <p style="color: #121B21; font-size: 18px; font-weight: 600; margin: 0;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Competition Details Card -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, rgba(25,138,205,0.05) 0%, rgba(40,187,232,0.05) 100%); border: 1px solid rgba(40,187,232,0.2); border-radius: 20px; margin-bottom: 25px;">
                      <tr>
                        <td style="padding: 25px;">
                          <h3 style="color: #28BBE8; font-size: 20px; font-weight: 600; margin: 0 0 20px;">🗓️ Competition Day Details</h3>
                          
                          <!-- Date -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: rgba(0,0,0,0.02); border-radius: 12px; margin-bottom: 12px;">
                            <tr>
                              <td style="padding: 15px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td width="50" style="vertical-align: middle;">
                                        <span style="color: white; font-size: 22px;">📅</span>
                                    </td>
                                    <td style="padding-left: 15px; vertical-align: middle;">
                                      <p style="color: #6B7280; font-size: 13px; margin: 0 0 3px;">Date</p>
                                      <p style="color: #121B21; font-size: 18px; font-weight: 600; margin: 0;">February 24, 2026</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- Time -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: rgba(0,0,0,0.02); border-radius: 12px; margin-bottom: 12px;">
                            <tr>
                              <td style="padding: 15px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td width="50" style="vertical-align: middle;">
                                        <span style="color: white; font-size: 22px;">⏰</span>
                                    </td>
                                    <td style="padding-left: 15px; vertical-align: middle;">
                                      <p style="color: #6B7280; font-size: 13px; margin: 0 0 3px;">Time</p>
                                      <p style="color: #121B21; font-size: 18px; font-weight: 600; margin: 0;">8:30 AM - 5:00 PM</p>
                                      <p style="color: #28BBE8; font-size: 13px; margin: 3px 0 0;">Please arrive at 8:30 AM for check-in</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- Location -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: rgba(0,0,0,0.02); border-radius: 12px;">
                            <tr>
                              <td style="padding: 15px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td width="50" style="vertical-align: middle;">
                                        <span style="color: white; font-size: 22px;">📍</span>
                                    </td>
                                    <td style="padding-left: 15px; vertical-align: middle;">
                                      <p style="color: #6B7280; font-size: 13px; margin: 0 0 3px;">Location</p>
                                      <p style="color: #121B21; font-size: 18px; font-weight: 600; margin: 0;">University HASSIBA BENBOUALI</p>
                                      <p style="color: #28BBE8; font-size: 14px; margin: 3px 0 0;">Department MI</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- What to Bring Card -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, rgba(25,138,205,0.05) 0%, rgba(38,81,131,0.05) 100%); border: 1px solid rgba(25,138,205,0.2); border-radius: 20px; margin-bottom: 25px;">
                      <tr>
                        <td style="padding: 25px;">
                          <h3 style="color: #198ACD; font-size: 20px; font-weight: 600; margin: 0 0 20px;">🎒 What to Bring</h3>
                          
                          <!-- Laptop -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: rgba(0,0,0,0.02); border-radius: 12px; margin-bottom: 10px;">
                            <tr>
                              <td style="padding: 12px 15px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td width="40" style="vertical-align: middle;">
                                        <span style="color: #198ACD; font-size: 18px;">💻</span>
                                    </td>
                                    <td style="padding-left: 12px; vertical-align: middle;">
                                      <p style="color: #121B21; font-size: 15px; margin: 0;">Your laptop and charger</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- Project -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: rgba(0,0,0,0.02); border-radius: 12px; margin-bottom: 10px;">
                            <tr>
                              <td style="padding: 12px 15px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td width="40" style="vertical-align: middle;">
                                        <span style="color: #28BBE8; font-size: 18px;">🚀</span>
                                    </td>
                                    <td style="padding-left: 12px; vertical-align: middle;">
                                      <p style="color: #121B21; font-size: 15px; margin: 0;">${categoryMessage}</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- Student ID -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: rgba(0,0,0,0.02); border-radius: 12px; margin-bottom: 10px;">
                            <tr>
                              <td style="padding: 12px 15px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td width="40" style="vertical-align: middle;">
                                        <span style="color: #265183; font-size: 18px;">🪪</span>
                                    </td>
                                    <td style="padding-left: 12px; vertical-align: middle;">
                                      <p style="color: #121B21; font-size: 15px; margin: 0;">Your student ID (Carte Étudiant)</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- Enthusiasm -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: rgba(0,0,0,0.02); border-radius: 12px;">
                            <tr>
                              <td style="padding: 12px 15px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td width="40" style="vertical-align: middle;">
                                        <span style="color: #28BBE8; font-size: 18px;">✨</span>
                                    </td>
                                    <td style="padding-left: 12px; vertical-align: middle;">
                                      <p style="color: #121B21; font-size: 15px; margin: 0;">Enthusiasm and creativity!</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- IoT Special Alert (only for IoT category) -->
                    ${category === 'iot' ? `
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: rgba(133,77,14,0.1); border: 1px solid #854d0e; border-radius: 16px; margin-bottom: 25px;">
                        <tr>
                          <td style="padding: 20px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td width="40" style="vertical-align: top;">
                                  <div style="background: #854d0e; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <span style="color: white; font-size: 18px; font-weight: bold;">!</span>
                                  </div>
                                </td>
                                <td style="padding-left: 15px;">
                                  <h4 style="color: #fbbf24; font-size: 18px; font-weight: 600; margin: 0 0 8px;">IoT & Robotics Participants</h4>
                                  <p style="color: #fef3c7; font-size: 15px; margin: 0; line-height: 1.5;">Please bring your IoT/Robotics projects to demonstrate during the competition!</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    ` : ''}
                    
                    <!-- Important Check-in Note - FIXED: Text color and alignment -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: rgba(133,77,14,0.1); border: 1px solid #854d0e; border-radius: 16px; margin-bottom: 30px;">
                      <tr>
                        <td style="padding: 20px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="40" style="vertical-align: top;">
                              </td>
                              <td style="padding-left: 15px; vertical-align: top;">
                                <h4 style="color: #fbbf24; font-size: 18px; font-weight: 600; margin: 0 0 8px;">Important Check-in Information</h4>
                                <p style="color: #B09425; font-size: 15px; margin: 0; line-height: 1.6;">
                                  ⏰ <strong style="color: #B09425;">Please arrive at 8:30 AM for check-in.</strong><br>
                                  <span style="color: #B09425;">We'll verify your name, student ID, and team assignment.</span><br>
                                  <span style="color: #B09425; font-weight: 500;">Don't forget to bring your project to showcase your skills!</span>
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Call to Action -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding: 20px 0 30px;">
                          <div style="display: inline-block; background: linear-gradient(135deg, #198ACD, #28BBE8); padding: 15px 30px; border-radius: 50px; box-shadow: 0 10px 20px rgba(25,138,205,0.3);">
                            <span style="color: white; font-size: 18px; font-weight: 600;">🎯 GET READY TO INNOVATE! 🎯</span>
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Footer Message -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="border-top: 1px solid #e5e7eb; padding-top: 25px;">
                          <p style="color: #6B7280; font-size: 16px; margin: 0 0 10px;">We can't wait to see what you'll create! 🚀</p>
                          <p style="color: #9CA3AF; font-size: 14px; margin: 0;">Best regards,<br><span style="color: #28BBE8; font-weight: 600;">The InfoBrains Team</span></p>
                        </td>
                      </tr>
                    </table>
                    
                  </td>
                </tr>
                
                <!-- Footer (No Logo) -->
                <tr>
                  <td style="background: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="color: #6B7280; font-size: 12px; margin: 0 0 5px;">© 2026 InfoBrains Club. All rights reserved.</p>
                    <p style="color: #9CA3AF; font-size: 11px; margin: 0;">University HASSIBA BENBOUALI - Department MI<br>This is an automated message, please do not reply.</p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
        
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to:', email);
    console.log('📨 Message ID:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
}