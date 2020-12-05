import { Post } from './Post'
import { useFeed } from './service'

export default function Feed ({ username }) {
  const { state, data } = useFeed(username)

  return (
    <>
      { state === 'loading' && <div>Loading</div> }
      { state === 'loaded' && <div>
        <h2>{data.user.username}</h2>
        <div><img src={data.user.pic} /></div>
        <p>{data.user.biography}</p>
        <div className="row">
          {data.timeline.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
    </div>}</>
  )
}
