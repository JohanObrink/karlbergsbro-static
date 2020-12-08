import { createTransport } from 'nodemailer'

const user = process.env.MAILER_USER
const pass = process.env.MAILER_PWD

export async function sendMail({from, replyTo, to, subject, text}) {
  const transport = createTransport({
    host: 'send.one.com',
    port: 465,
    secure: true, // use TLS
    auth: {
      user,
      pass
    }
  })
  return transport.sendMail({ from: `${from} <${user}>`, replyTo, to, subject, text })
}
