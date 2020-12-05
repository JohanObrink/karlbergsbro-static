import { parse } from './service'
import data from './service.test.data.json'

describe('App - components/instagram/service', () => {
  describe('parse', () => {
    let feed
    beforeEach(() => {
      feed = parse(data)
    })
    it('parses user corectly', () => {
      expect(feed.user).toEqual({
        biography: 'Kolonilott in the making',
        following: 466,
        followedBy: 161,
        name: 'whatwouldmontydo',
        username: 'whatwouldmontydo',
        href: 'https://instagram.com/whatwouldmontydo',
        pic: 'https://scontent-arn2-1.cdninstagram.com/v/t51.2885-19/s320x320/23099224_1831428613834135_4844277081829277696_n.jpg?_nc_ht=scontent-arn2-1.cdninstagram.com&_nc_ohc=Jgy7_ik697kAX_UsWWG&oh=592bf0f40dd772a36f7c92ff064514ea&oe=5F9E144A',
      })
    })
    it('parses timeline correctly', () => {
      expect(feed.timeline).toHaveLength(12)
      expect(feed.timeline[1]).toEqual({
        id: '2406284816638339785',
        text: 'Kålen verkar må toppen just nu. Kronärtskockorna lika så. Tomaterna sjunger på sista versen men jag lyckades trots det plocka med mig 2,5 kg hem. Tror de ska bli ketchup. Sen. Inte idag, för den här veckan har känts tung. Nu behöver vi helg och lite vila. \n.\n.\n.\n#kolonilott #allotment #koloniträdgård #allotmentgarden #potager',
        likes: 40,
        href: 'https://instagram.com/p/CFk10qsJOrJ',
        media: [
          {
            thumbnail: 'https://scontent-arn2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.180.1440.1440a/s640x640/120098853_333506938099587_49080806762893934_n.jpg?_nc_ht=scontent-arn2-1.cdninstagram.com&_nc_cat=103&_nc_ohc=Qg5ddUTOiVQAX_7Ue3T&oh=292b9a1606e58710f304e461c7abca22&oe=5F9F08D3'
          }
        ]
      })
    })
  })
})
