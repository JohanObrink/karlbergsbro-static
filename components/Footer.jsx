import { Container } from "react-bootstrap";

export default function Footer ({children}) {
  return (
    <footer className="footer text-black-50">
      <Container>
        {children}
      </Container>
    </footer>
  )
}
