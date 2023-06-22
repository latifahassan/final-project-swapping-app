
import supabase from '../../supabaseClient';
import React from 'react'
import {uuid} from 'uuidv4'
import { useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { FileObject } from '@supabase/supabase-js';

export default function UploadItem() {
  // async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault(); // Prevent form submission
  //   const form = event.target as HTMLFormElement;
  //   const fileInput = form.elements.namedItem('file') as HTMLInputElement | null;
  //   if (fileInput && fileInput.files && fileInput.files.length > 0) {
  //     const file = fileInput.files[0];
  //     const { data, error } = await supabase.storage
  //       .from('items')
  //       .upload('public/avatar1.png', file, {
  //         cacheControl: '3600',
  //         upsert: false,
  //       });
  //     console.log(data,error, 'not working')
  //   }
  // }

const user = useUser() 
// we need to come back to this and change <any[]> to <FileObject[]> with a more robust type definition
const [images, setImages] = useState<any[]>([])

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

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    let file = e.target.files[0];
    const { data, error } = await supabase
    .storage
    .from('images')
    .upload(user.id + '/' + uuid(), file);
     if (data) {
      getImages()
     }
      else {
        console.log(error)
      }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" />
      <input type="file" name="file" accept = 'image/png,image/jpeg' onChange={(e)=> uploadImage(e)} />
      <button type="submit">List it!</button>
    </form>
  );

}