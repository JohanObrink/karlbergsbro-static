import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

const NavItem = ({ name, path, mainPath, children = [] }) => {
  if (children.length) {
    return (
      <NavDropdown title={name} className={mainPath === path ? 'active' : ''}>
        <NavDropdown.Item href={path}>{name}</NavDropdown.Item>
        <NavDropdown.Divider />
        {children.map((child) => (
          <NavDropdown.Item key={child.path} href={child.path}>
            {child.name}
          </NavDropdown.Item>
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
        <Navbar.Brand className="float-md-left">
          <Nav.Link href="/">Karlbergs-Bro</Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="nav-masthead justify-content-end"
        >
          <Nav activeKey={path}>
            {menu.map((node) => (
              <NavItem key={node.path} {...{ ...node, mainPath }} />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}
