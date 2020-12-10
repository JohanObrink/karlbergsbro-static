import { Col, Container, Image, Row } from 'react-bootstrap'
import { Post } from './Post'
import { useFeed } from './service'

export default function Feed({ username }) {
  const { state, data } = useFeed(username)

  return (
    <Container fluid className="insta-feed">
      <Row>
        {state === 'loading' && <Col>Loading</Col>}
        {state === 'loaded' && (
          <>
            <Col lg={3} sm={6} xs={6}>
              <a
                href={`https://instagram.com/${data.user.username}`}
                target="_blank"
              >
                <Image src={data.user.pic} fluid roundedCircle />
                <h6>@{data.user.username}</h6>
                <p className="text">{data.user.biography}</p>
              </a>
            </Col>
            {data.timeline.slice(0, 3).map((post) => (
              <Col lg={3} sm={6} xs={6} key={post.id}>
                <Post {...post} />
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  )
}
