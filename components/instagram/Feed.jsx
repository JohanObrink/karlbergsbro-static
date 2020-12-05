import { Col, Container, Image, Row } from 'react-bootstrap'
import { Post } from './Post'
import { useFeed } from './service'

export default function Feed ({ username }) {
  const { state, data } = useFeed(username)

  return (
    <>
      <style jsx>{`
        h6 {
          margin-top: 10px;
        }
        .text {
          font-size: 0.8em;
          height: 75px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
      <Container fluid className="instaFeed">
        <Row>
        { state === 'loading' && <Col>Loading</Col> }
        { state === 'loaded' &&
          <>
            <Col>
              <Image src={data.user.pic} fluid roundedCircle />
              <h6>@{data.user.username}</h6>
              <p className="text">{data.user.biography}</p>
            </Col>
            {data.timeline.slice(0, 3).map((post) => (
              <Col>
                <Post key={post.id} {...post} />
              </Col>
            ))}
          </>
        }
        </Row>
      </Container>
    </>
  )
}
