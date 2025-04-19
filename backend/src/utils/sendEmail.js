import nodemailer from 'nodemailer';
const sendEmail = async (to, messageContent, subject = "Project Sponsorship Notification") => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'vamshi2002kirankumar2005@gmail.com',
        pass: 'nyihewcatvwyoiej', // App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
      logger: true,
      debug: true,
    });

    const message = {
      from: 'vamshi2002kirankumar2005@gmail.com',
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif;">
          ${messageContent}
        </div>
      `,
    };

    const info = await transporter.sendMail(message);
    console.log('✅ Email sent:', info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
