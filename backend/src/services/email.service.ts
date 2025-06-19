import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT), 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

interface PatientEmailDetails {
  email: string;
  name: string;
}

export const sendRegistrationConfirmationEmail = async ({
  email,
  name,
}: PatientEmailDetails) => {
  const mailOptions = {
    from: `Patient Registration App <${process.env.MAIL_FROM}>`,
    to: email,
    subject: 'Welcome! Your registration was successful.',
    text: `Hello ${name},\n\nThank you for registering. Your patient profile has been created successfully.\n\nBest regards,\nThe Patient Registration Team`,
    html: `<p>Hello <strong>${name}</strong>,</p><p>Thank you for registering. Your patient profile has been created successfully.</p><p>Best regards,<br/>The Patient Registration Team</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent successfully to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }
};