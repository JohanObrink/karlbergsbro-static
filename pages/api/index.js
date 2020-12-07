import { getTree } from '../../services/content'

export default function handler (req, res) {
  try {
    switch (req.method) {
      case 'GET':
        return res.send(getTree())
      default:
        return res.status(405)
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}
