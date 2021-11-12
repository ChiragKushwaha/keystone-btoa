import { createTransport, getTestMessageUrl } from "nodemailer";
import { Envelope } from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "andreane.kuhn85@ethereal.email",
    pass: "17WtF1z1nn89VWCZsE",
  },
});

function makeANiceEmail(text: string): string {
  return `
    <div style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size:20px;
    ">
    <h2>Hello There!</h2>
    <p>${text}</p>
    <p>From, Chirag</p>
    </div>
    `;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // email the user a token
  const info: SMTPTransport.SentMessageInfo = await transporter.sendMail({
    to,
    from: "chirag@eka.care",
    subject: "Your password reset token",
    html: makeANiceEmail(`Your password Reset Token is here!
    <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
    `),
  });

  if (process.env.MAIL_USER?.includes("ethereal.email")) {
    console.log(`Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
