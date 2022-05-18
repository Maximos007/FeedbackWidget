import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4d9859213319c3",
    pass: "aeed497a0f2b0f"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
    from: 'Equipe Feedback <oi@teste.com>',
    to: 'Wasley Araujo <waslleymax@gmail.com>',
    subject,
    html: body,
    })
  }
}