import { createTransport } from 'nodemailer'
import { vi } from 'vitest'
import { sendMail } from './mailer'

vi.mock('nodemailer', () => ({
  createTransport: vi.fn(),
}))

describe('services/mailer', () => {
  describe('#sendMail', () => {
    let transport
    beforeEach(() => {
      process.env.MAILER_USER = 'user'
      process.env.MAILER_PWD = 'pwd'

      transport = {
        sendMail: vi.fn().mockResolvedValue(),
      }
      createTransport.mockReturnValue(transport)
    })
    it('creates a transport', async () => {
      await sendMail({})
      expect(createTransport).toHaveBeenCalled()
    })
    it('creates a correctly configured transport', async () => {
      await sendMail({})
      expect(createTransport).toHaveBeenCalledWith({
        host: 'send.one.com',
        port: 465,
        secure: true,
        auth: {
          user: 'user',
          pass: 'pwd',
        },
        jsonTransport: true,
      })
    })
    it('sends mail correctly', async () => {
      const from = 'from'
      const replyTo = 'replyTo <foo@bar.se>'
      const to = 'to <bar@foo.se>'
      const subject = 'subject'
      const text = 'text'
      const nodemailer = await vi.importActual('nodemailer')
      const jsonTransport = nodemailer.createTransport({
        jsonTransport: true,
      })
      createTransport.mockReturnValueOnce(jsonTransport)

      const mail = await sendMail({ from, replyTo, to, subject, text })

      expect(JSON.parse(mail.message)).toEqual({
        from: {
          address: 'user',
          name: from,
        },
        to: [
          {
            address: 'bar@foo.se',
            name: 'to',
          },
        ],
        replyTo: [
          {
            address: 'foo@bar.se',
            name: 'replyTo',
          },
        ],
        subject,
        text,
        headers: {},
        messageId: expect.any(String),
      })
    })
  })
})
