import React from 'react'

type DisplayCardProps = {
  image: string
  title: string
  username: string
  key: number
}

export default function DisplayCard({image, title, username, key}: DisplayCardProps) {
  return (
    <>
      <img src={image} alt={`img of ${title}`} />
      <h3>{title}</h3>
      <p>{username}</p>
      <button type="button">GET IT NOW</button>
    </>
  )
}