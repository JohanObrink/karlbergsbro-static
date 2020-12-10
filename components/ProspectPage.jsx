import { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from 'react-bootstrap'
import Markdown from './Markdown'

export default function DefaultPage({ content, headline }) {
  const [validated, setValidated] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState({})

  useEffect(() => {
    setDisabled(submitting || submitted)
  }, [submitting, submitted])

  const submitForm = async () => {
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/prospects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.status >= 400) {
        const error = await response.json()
        console.log(error)
        throw error
      }
      setSubmitted(true)
    } catch (err) {
      setValidated(false)
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() !== false) {
      submitForm()
    }

    event.preventDefault()
    event.stopPropagation()
    setValidated(true)
  }

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value })
    setError('')
  }

  return (
    <Container>
      <h1>{headline}</h1>
      <Markdown>{content}</Markdown>
      <hr />
      <Form
        validated={validated}
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        {submitted && <Alert variant="success">Tack för din ansökan!</Alert>}
        {error && <Alert variant="danger">Ett fel inträffade ({error})</Alert>}
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group>
              <Form.Label>Namn</Form.Label>
              <Form.Control
                disabled={disabled}
                type="text"
                name="name"
                required
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group>
              <Form.Label>Födelseår</Form.Label>
              <Form.Control
                disabled={disabled}
                type="text"
                name="year_of_birth"
                required
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group>
              <Form.Label>Gatuadress</Form.Label>
              <Form.Control
                disabled={disabled}
                type="text"
                name="address"
                required
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group>
              <Form.Label>Postadress</Form.Label>
              <Form.Control
                disabled={disabled}
                type="text"
                name="postal_address"
                required
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group>
              <Form.Label>E-postadress</Form.Label>
              <Form.Control
                disabled={disabled}
                type="email"
                name="email"
                required
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group>
              <Form.Label>Telefonnummer</Form.Label>
              <Form.Control
                disabled={disabled}
                type="text"
                name="phone"
                required
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group>
              <Form.Label>Antal barn</Form.Label>
              <Form.Control
                disabled={disabled}
                type="number"
                name="number_of_kids"
                defaultValue={0}
                min={0}
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group>
              <Form.Label>Barnens födelseår</Form.Label>
              <Form.Control
                disabled={disabled}
                type="text"
                name="kids_years_of_birth"
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group>
              <Form.Label>Yrke</Form.Label>
              <Form.Control
                disabled={disabled}
                type="text"
                name="occupation"
                required
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group>
              <Form.Label>Har du sommarstuga?</Form.Label>
              <Form.Control
                disabled={disabled}
                type="text"
                name="has_summer_home"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>
                Motivering till varför Du vill ha en kolonilott
              </Form.Label>
              <Form.Control
                disabled={disabled}
                as="textarea"
                rows={5}
                name="motivation"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            {error && (
              <Alert variant="danger">Ett fel inträffade ({error})</Alert>
            )}
            {submitted && (
              <Alert variant="success">Tack för din ansökan!</Alert>
            )}
            {!submitted &&
              (submitting ? (
                <Button disabled>
                  <Spinner animation="border" variant="light" size="sm" />
                </Button>
              ) : (
                <Button type="submit">Skicka</Button>
              ))}
          </Col>
        </Row>
      </Form>
    </Container>
  )
}
