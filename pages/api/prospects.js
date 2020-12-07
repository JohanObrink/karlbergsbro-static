import { register } from '../../api/prospects'

async function list () {
  return []
}

export default async function handler (req, res) {
  
  try {
    switch (req.method) {
      case 'GET':
        return res.send(await list())
      case 'POST':
        const result = await register(req.body)
        return res.status(201).send(result)
      default:
        return res.status(405).end()
    }
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}
