import { sendMail } from './mailer'

const reply = `Tack för din intresseanmälan.

Din anmälan registreras först när du betalt 200:- i administrationsavgift till vårt plusgirokonto 3 27 69 – 2 (Karlbergs-Bro Koloniförening). Detta är en engångsavgift och du behöver inte betala någon fortlöpande köavgift.

Med vänlig hälsning
Karlbergs-Bro Koloniförening`

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
  const application = {
    from: 'Karlbergs-Bro Intresseanmälan',
    subject: 'Intresseanmälan',
    to: process.env.MAILER_TO_PROSPECTS,
    replyTo: `${form.name} <${form.email}>`,
    text: compose(form),
  }
  const information = {
    from: 'Karlbergs-Bro Koloniförening',
    subject: 'Tack för din intresseanmälan',
    to: `${form.name} <${form.email}>`,
    replyTo: process.env.MAILER_TO_PROSPECTS,
    text: reply,
  }
  return Promise.all([sendMail(application), sendMail(information)])
}
