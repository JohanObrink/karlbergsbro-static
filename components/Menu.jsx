import Link from 'next/link'

export default function Menu ({menu}) {
  return (
    <ul>
      {menu.map(({path, name}) => (
        <li key={path}>
          <Link href={path}><a>{name}</a></Link>
        </li>
      ))}
    </ul>
  )
}
