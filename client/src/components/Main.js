import React from 'react'
import Postcard from './Postcard';

export default function Main({posts}) {
  return (
    <div className='main'>
      {posts.map(post => {
        return <Postcard post = {post} key={post._id}/>
      })}
    </div>
  )
}
