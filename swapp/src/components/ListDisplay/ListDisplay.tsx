import React from 'react'
import DisplayCard from '../DisplayCard/DisplayCard'


// ListDisplay should receive a prop (from App) of the number of DisplayCard items to display
type ListDisplayProps = {
  numItems: number
  itemsArray: {title: string, image: string, username: string, id: string}[]
}

export default function ListDisplay({numItems, itemsArray}: ListDisplayProps) {
  // the return statement should return a list of DisplayCard items based on the numItems and itemsArray props
  const slicedItemsArray = itemsArray.slice(0, numItems)

  return (
    <>
      {slicedItemsArray.map((item, index) => {
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