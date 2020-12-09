import { useState, useEffect } from 'react'

const INSTAGRAM = 'https://instagram.com'

export function parse({ graphql: { user } }) {
  const {
    biography,
    edge_followed_by: { count: followedBy },
    edge_follow: { count: following },
    username,
    full_name: name,
    profile_pic_url_hd: pic,
    edge_owner_to_timeline_media: { edges: posts },
  } = user
  const timeline = posts.map(({ node }) => ({
    id: node.id,
    text: node.edge_media_to_caption.edges[0]?.node?.text,
    likes: node.edge_liked_by.count,
    href: `${INSTAGRAM}/p/${node.shortcode}`,
    media: [
      {
        thumbnail: node.thumbnail_src,
      },
    ],
  }))
  return {
    user: {
      href: `${INSTAGRAM}/${username}`,
      biography,
      followedBy,
      following,
      name,
      username,
      pic,
    },
    timeline,
  }
}

export async function read(username) {
  const response = await fetch(`https://www.instagram.com/${username}/?__a=1`)
  const feed = await response.json()
  return feed
}

export function useFeed(username) {
  const [state, setState] = useState('idle')
  const [data, setData] = useState({})

  useEffect(() => {
    setState('loading')
    read(username)
      .then((feed) => {
        setData(parse(feed))
        setState('loaded')
      })
      .catch((error) => {
        setData(error)
        setState('error')
      })
  }, [username])

  return { state, data }
}
