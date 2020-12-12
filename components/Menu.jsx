import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

const NavItem = ({ name, path, children = [] }) => {
  if (children.length) {
    return (
      <NavDropdown title={name}>
        <NavDropdown.Item href={path}>{name}</NavDropdown.Item>
        <NavDropdown.Divider />
        {children.map((child) => (
          <NavDropdown.Item href={child.path}>{child.name}</NavDropdown.Item>
        ))}
      </NavDropdown>
    )
  }
  return <Nav.Link href={path}>{name}</Nav.Link>
}

export default function Menu({ menu, path }) {
  const mainPath = path.split('/').slice(0, 2).join('/')

  return (
    <header>
      <Navbar className="bg-light" expand="md" fixed="top">
        <Navbar.Brand>
          <Nav.Link href="/">Karlbergs-Bro</Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="nav-masthead justify-content-center float-md-right"
            activeKey={mainPath}
          >
            {menu.map((node) => (
              <NavItem key={node.path} {...node} />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}
