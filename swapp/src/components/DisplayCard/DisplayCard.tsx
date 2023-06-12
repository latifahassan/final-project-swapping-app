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
             {/*
             The GET IT NOW button should bring up a PopUp asking you to confirm your address
             It will do this by calling a function from App.tsx that will set the state of the PopUp to true
             If loggedIn is false, the button should take you to the sign up/log in page        
             */}
      <p>The ID is {id}</p>
    </>
  )
}