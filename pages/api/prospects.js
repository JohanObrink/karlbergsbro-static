import { register } from '../../services/prospects'

async function list() {
  return []
}

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET': {
        res.send(await list())
        break
      }
      case 'POST': {
        await register(req.body)
        res.status(201).end()
        break
      }
      default: {
        res.status(405).end()
        break
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}
