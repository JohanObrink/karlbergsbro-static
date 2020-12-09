import { sendMail } from './mailer'

function compose(form) {
  return `Intresseanmälan
----------------
${form.name}
${form.address}
${form.postal_address}

📧 ${form.email}
☎️ ${form.phone}

Yrke: ${form.occupation}
Födelseår: ${form.year_of_birth}

Antal barn: ${form.number_of_kids}
Barnens födelseår: ${form.kids_years_of_birth}

Har sommarstuga: ${form.has_summer_home}

Motivering:
----------------
${form.motivation}
`
}

export async function register(form) {
  const mail = {
    from: 'Karlbergs-Bro Intresseanmälan',
    subject: 'Intresseanmälan',
    to: process.env.MAILER_TO_PROSPECTS,
    replyTo: `${form.name} <${form.email}>`,
    text: compose(form),
  }
  return await sendMail(mail)
}
