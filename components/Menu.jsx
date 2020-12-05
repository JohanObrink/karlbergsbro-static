import Link from 'next/link'
import { Nav } from 'react-bootstrap'
import {usePath} from 'hookrouter'

export default function Menu ({menu}) {
  const path = usePath()
  return (
    <header className="text-center px-5 py-4">
      <div>
        <h3 className="float-md-left mb-0">Karlbergs-Bro</h3>
        <Nav
          className="nav-masthead justify-content-center float-md-right"
          activeKey={path}>
          {menu.map(({path, name}) => (
            <Nav.Item key={path}>
              <Nav.Link href={path}>
                {name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </header>
  )
}
