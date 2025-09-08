import nodemailer from 'nodemailer';

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'geniral.kpriet@gmail.com',
    pass: 'bvaz uibo ljcz blfr' // App password, not your regular password
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
 * Send an OTP verification email
 * @param {string} email - Recipient email
 * @param {string} otp - One-time password
 * @returns {Promise} - Resolves with the result of sending the email
 */
export const sendOTPEmail = async (email, otp) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #333;">Password Reset Verification</h2>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
        <p>Hello,</p>
        <p>You have requested to reset your password. Please use the following OTP to verify your request:</p>
        <div style="padding: 10px; text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; padding: 10px 20px; background-color: #333; color: #fff; border-radius: 5px;">${otp}</span>
        </div>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you did not request a password reset, please ignore this email or contact support if you have any concerns.</p>
        <p>Regards,<br/>Geniral Team</p>
      </div>
      <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
        <p>This is an automated email. Please do not reply to this message.</p>
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

export default {
  sendEmail,
  sendOTPEmail
};
