import React from 'react'

type DisplayCardProps = {
  image: string
  title: string
  username: string
  id: string
}

export default function DisplayCard({id, image, title, username}: DisplayCardProps) {
  return (
    <>
      <img src={image} alt={`img of ${title}`} />
      <h3>{title}</h3>
      <p>{username}</p>
      <button type="button">GET IT NOW</button>
      <p>The ID is {id}</p>
    </>
  )
}