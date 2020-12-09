import { createTransport } from 'nodemailer'
import { sendMail } from './mailer'

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockName('createTransport'),
}))

describe('services/mailer', () => {
  describe('#sendMail', () => {
    let transport
    beforeEach(() => {
      process.env.MAILER_USER = 'user'
      process.env.MAILER_PWD = 'pwd'

      transport = {
        sendMail: jest.fn().mockName('sendMail').mockResolvedValue(),
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
      })
    })
    it('sends mail correctly', async () => {
      const from = 'from'
      const replyTo = 'replyTo'
      const to = 'to'
      const subject = 'subject'
      const text = 'text'

      await sendMail({ from, replyTo, to, subject, text })

      expect(transport.sendMail).toHaveBeenCalledWith({
        from: 'from <user>',
        replyTo,
        to,
        subject,
        text,
      })
    })
  })
})
