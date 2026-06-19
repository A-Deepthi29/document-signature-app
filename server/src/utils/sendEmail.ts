import sgMail from "@sendgrid/mail";

sgMail.setApiKey(
  process.env.SENDGRID_API_KEY as string
);

export const sendEmail = async (
  to: string,
  subject: string,
  text: string
) => {
  try {

    const msg = {
      to,
      from: "yourverifiedemail@gmail.com",
      subject,
      text,
    };

    const response =
      await sgMail.send(msg);

    console.log(
      "Email Sent Successfully"
    );

    return response;

  } catch (error: any) {

    console.log(
      "SENDGRID ERROR:"
    );

    console.log(error);

    throw error;
  }
};