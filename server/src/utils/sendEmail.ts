import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  text: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(
      mailOptions
    );

    console.log(
      "Email Sent:",
      info.response
    );

    return info;

  } catch (error: any) {
  console.log("EMAIL ERROR:");
  console.log(error);
  console.log(error.message);
  throw error;
}
};