import { getTree } from '../../services/content'

export default function handler(req, res) {
  try {
    if (req.method === 'GET') {
      res.status(200).send(getTree())
    } else {
      res.status(405).send('Method Not Allowed')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}
