import nodemailer from 'nodemailer';

const sendEmail = async (to, messageContent, subject = "Project Notification") => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const message = {
      from: `"TechBridge Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif;">
          ${messageContent}
        </div>
      `,
    };

    const info = await transporter.sendMail(message);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error(" Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
