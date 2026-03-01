import nodemailer from 'nodemailer';

// Create a transporter using Gmail (credentials from .env)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send an email with the provided options
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content (optional)
 * @returns {Promise} - Resolves with the result of sending the email
 */
export const sendEmail = async (options) => {
  const mailOptions = {
    from: 'Geniral KPRIET <geniral.kpriet@gmail.com>',
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

/**
 * Send an OTP verification email for registration
 * @param {string} email - Recipient email
 * @param {string} otp - One-time password
 * @returns {Promise} - Resolves with the result of sending the email
 */
export const sendWelcomeOTPEmail = async (email, otp) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
        <h1 style="color: #7c3aed; margin: 0; font-size: 28px;">Welcome to Kai Campus!</h1>
        <p style="color: #666; margin-top: 10px;">The campus community hub</p>
      </div>
      <div style="padding: 20px; background-color: #f8f7ff; border-radius: 8px;">
        <p style="font-size: 16px; color: #333;">Hello,</p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">Thank you for joining Kai Campus Hub. To complete your registration and verify your email, please use the following One-Time Password (OTP):</p>
        <div style="padding: 25px; text-align: center; margin: 25px 0; background-color: #ffffff; border-radius: 12px; border: 2px dashed #7c3aed;">
          <span style="font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #7c3aed;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #777; text-align: center;">This OTP is valid for <strong>10 minutes</strong>. Please do not share this code with anyone.</p>
        <p style="font-size: 16px; color: #333; margin-top: 25px;">Regards,<br/><strong>The Kai Campus Team</strong></p>
      </div>
      <div style="text-align: center; margin-top: 25px; font-size: 12px; color: #999;">
        <p>If you didn't sign up for an account, you can safely ignore this email.</p>
        <p>&copy; 2024 Kai Campus. All rights reserved.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Welcome to Kai Campus - Verify your email',
    text: `Welcome to Kai Campus! Your verification OTP is: ${otp}. Valid for 10 minutes.`,
    html: htmlContent
  });
};

/**
 * Send an OTP verification email for password reset
 * @param {string} email - Recipient email
 * @param {string} otp - One-time password
 * @returns {Promise} - Resolves with the result of sending the email
 */
export const sendOTPEmail = async (email, otp) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
        <h2 style="color: #333; margin: 0;">Password Reset Request</h2>
      </div>
      <div style="padding: 20px; background-color: #fff9f9; border-radius: 8px;">
        <p style="font-size: 16px; color: #333;">Hello,</p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">We received a request to reset your password. Use the following OTP to verify your request:</p>
        <div style="padding: 25px; text-align: center; margin: 25px 0; background-color: #ffffff; border-radius: 12px; border: 2px dashed #ff4444;">
          <span style="font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #ff4444;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #777; text-align: center;">This OTP is valid for <strong>10 minutes</strong>.</p>
        <p style="font-size: 16px; color: #333; margin-top: 25px;">If you did not request a password reset, please ignore this email or contact support.</p>
        <p style="font-size: 16px; color: #333; margin-top: 10px;">Regards,<br/><strong>Kai Campus Team</strong></p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Password Reset Verification OTP',
    text: `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`,
    html: htmlContent
  });
};

export const notifyAdminOnEventCreation = async (adminEmail, eventData, studentEmail) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
      <h2 style="color: #333;">New Event Created</h2>
      <p>A new event has been created by <strong>${studentEmail}</strong>.</p>
      <div style="padding: 15px; background-color: #f4f4f4; border-radius: 5px;">
        <p><strong>Event Name:</strong> ${eventData.title}</p>
        <p><strong>Department:</strong> ${eventData.department}</p>
        <p><strong>Venue:</strong> ${eventData.venue}</p>
        <p><strong>Time:</strong> ${eventData.startTime} - ${eventData.endTime}</p>
        <p><strong>Registration Link:</strong> <a href="${eventData.registrationLink}">${eventData.registrationLink}</a></p>
      </div>
      <p>You can manage this event from the admin dashboard.</p>
    </div>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `New Event: ${eventData.title}`,
    text: `A new event "${eventData.title}" was created by ${studentEmail}.`,
    html: htmlContent
  });
};

export const sendRegistrationEmailToAdmin = async ({ eventTitle, studentName, studentEmail, department }) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'ramjib2311@gmail.com';
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #ddd;border-radius:8px;">
      <h2 style="color:#7c3aed;">📋 New Event Registration</h2>
      <p>A student just registered for an event on <strong>Kai Campus Hub</strong>.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;">
        <tr><td style="padding:8px;background:#f4f0ff;font-weight:bold;">Event</td><td style="padding:8px;">${eventTitle}</td></tr>
        <tr><td style="padding:8px;background:#f4f0ff;font-weight:bold;">Student Name</td><td style="padding:8px;">${studentName}</td></tr>
        <tr><td style="padding:8px;background:#f4f0ff;font-weight:bold;">Email</td><td style="padding:8px;">${studentEmail}</td></tr>
        <tr><td style="padding:8px;background:#f4f0ff;font-weight:bold;">Department</td><td style="padding:8px;">${department}</td></tr>
      </table>
      <p style="margin-top:16px;color:#555;">View all registrations in the Admin Dashboard.</p>
    </div>
  `;
  return sendEmail({
    to: adminEmail,
    subject: `New Registration: ${eventTitle}`,
    text: `${studentName} (${studentEmail}, ${department}) registered for "${eventTitle}".`,
    html
  });
};

export const sendStudentCredentialsEmail = async (email, name, password) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
        <h1 style="color: #000000; margin: 0; font-size: 28px;">Welcome to Kai Campus, ${name}!</h1>
        <p style="color: #666; margin-top: 10px;">Your account has been created by the Admin.</p>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <p style="font-size: 16px; color: #333;">Hello ${name},</p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">You can now log in to the Kai Campus platform using the following credentials:</p>
        <div style="padding: 20px; background-color: #ffffff; border-radius: 8px; border: 1px solid #eee; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 5px 0;"><strong>Password:</strong> ${password}</p>
        </div>
        <p style="font-size: 16px; color: #333;">We recommend changing your password after your first login.</p>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" style="display: block; width: 200px; margin: 25px auto; padding: 12px; background-color: #000000; color: #ffffff; text-align: center; text-decoration: none; font-weight: bold; border-radius: 6px;">Login Now</a>
        <p style="font-size: 16px; color: #333; margin-top: 25px;">Regards,<br/><strong>The Kai Campus Team</strong></p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Welcome to Kai Campus - Your Account Credentials',
    text: `Welcome to Kai Campus! Your login email is: ${email} and password is: ${password}`,
    html: htmlContent
  });
};

export default {
  sendEmail,
  sendOTPEmail,
  sendWelcomeOTPEmail,
  notifyAdminOnEventCreation,
  sendRegistrationEmailToAdmin,
  sendStudentCredentialsEmail
};

