import { getTree } from '../../services/content'

export default function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET': {
        res.send(getTree())
        break
      }
      default: {
        res.status(405)
        break
      }
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}
