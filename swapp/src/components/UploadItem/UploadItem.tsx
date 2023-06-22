
import supabase from '../../supabaseClient';
import React from 'react'
import {v4 as uuid} from 'uuid'
import { useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';

export default function UploadItem() {


const user = useUser();
// we need to come back to this and change <any[]> to <FileObject[]> with a more robust type definition
const [images, setImages] = useState<any[]>([])
const [isUserLoaded, setIsUserLoaded] = useState(false);

useEffect(() => {
  if (user) {
    setIsUserLoaded(true);
  }
}, [user]);  


async function getImages() {
  const { data, error } = await supabase
  .storage
  .from('images')
  .list(user?.id + '/' , { limit:100, offset: 0, sortBy: { column: 'name', order: 'asc' } });
  if (data) {
    console.log(data)
    setImages(data)
  }
  else {
    console.log(error)
    alert('Error loading images.')
  }
}

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>| React.FormEvent<HTMLFormElement>) {
    let file = (e.target as HTMLInputElement).files?.[0];
    if (user && file) {
    const { data, error } = await supabase
    .storage
    .from('images')
    .upload(user?.id + '/' + uuid(), file);
     if (data) {
      getImages()
     }
      else {
        console.log(error)
      }
  }
    else if (!user) {
      alert('You must be logged in to upload an image.')
    }
}

return (
  <form onSubmit={uploadImage}>
    <input type="text" />
    <input type="file" name="file" accept = 'image/png,image/jpeg' onChange={(e)=> uploadImage(e)} />
    <button type="submit" disabled={!isUserLoaded}>List it!</button>
    {!isUserLoaded && <p>Loading user session...</p>}
  </form>
);

}