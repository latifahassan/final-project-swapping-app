import supabase from '../../supabaseClient';
import React from 'react'


export default function MyAccountPage() {
  async function handleFormSubmit(event){
    const imageFile = event.target.files[0]
    const { data, error } = await supabase
      .storage
      .from('items')
      .upload('public/avatar1.png', imageFile, {
        cacheControl: '3600',
        upsert: false
      })
    
  }
  return (
    <form onSubmit = {handleFormSubmit}>
      <input type="text"/>
      <input type="file"/>
      <button type="submit">List it!</button>
    </form>
  )
}

/*
- Create a form with a
  - text input field for title 
  - file input field for image
  - submit button underneath
  - onSubmit = handleFormSubmit
    - take the title and link it to the username of the item to store in database
    - take the image and store it in the bucket with link to user & item
    - update items with the latest data 
- Render form in MyAccountPage 
*/