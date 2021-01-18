import { createTransport } from 'nodemailer'

export async function sendMail({ from, replyTo, to, subject, text }) {
  const user = process.env.MAILER_USER
  const pass = process.env.MAILER_PWD

  const config = {
    host: 'send.one.com',
    port: 465,
    secure: true, // use TLS
    auth: {
      user,
      pass,
    },
  }

  if (['test', 'development'].includes(process.env.NODE_ENV)) {
    config.jsonTransport = true
  }

  const transport = createTransport(config)

  return transport.sendMail({
    from: `${from} <${user}>`,
    replyTo,
    to,
    subject,
    text,
  })
}
