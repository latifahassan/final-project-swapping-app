import React from 'react'
import DisplayCard from '../DisplayCard/DisplayCard'


// ListDisplay should receive a prop, numItems (from App), of the number of DisplayCard items to display
type ListDisplayProps = {
  numItems: number
  items: {title: string, image: string, username: string, id: string}[]
}

export default function ListDisplay({numItems, items}: ListDisplayProps) {
  // the return statement should return a list of DisplayCard items based on the numItems and items props
  const slicedItems = items.slice(0, numItems)

  return (
    <>
      {slicedItems.map((item, index) => {
        return (
          <DisplayCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            username={item.username}
          />
        )
      }
      )}
    </>
  )
}