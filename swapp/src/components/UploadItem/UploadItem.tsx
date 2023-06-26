import supabase from '../../supabaseClient';
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';


export default function UploadItem() {
  const [user, setUser] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsUserLoaded(true);
    }
    fetchUser();
  }, []);
console.log(images)
  async function getImages() {
    const { data, error } = await supabase
      .storage
      .from('images')
      .list(user?.id + '/', { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } });
    if (data) {
      console.log(data);
      setImages(data);
    } else {
      console.log(error);
      alert('Error loading images.');
    }
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    if (e.currentTarget instanceof HTMLFormElement) {

    let fileInput = (e.currentTarget.elements.namedItem("file") as HTMLInputElement);

    let titleInput = (e.currentTarget.elements.namedItem("title") as HTMLInputElement);

    let file = fileInput.files?.[0];

    let title = titleInput.value;

    if (user && file && title) {
      const filePath = user?.id + '/' + uuid()
      const { data, error } = await supabase
        .storage
        .from('images')
        .upload(filePath, file);
      if (data) {
       const {data: insertData, error: insertError} = await supabase
       .from("items")
       .insert([{title: title, user_id: user?.id, image: filePath}]);
       console.log("See insertData below...", insertData)
       if(insertError) {
        console.error(insertError)
        alert("Error inserting new item.");
       }
       setTitle("")
       getImages();
      } else {
        console.log(error)
      }
    } else if (!user) {
      alert('You must be logged in to upload an image.');
    }
  }
  };

  return (
    <form onSubmit={uploadImage}>
      <input type="text" name="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="file" name="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={(e) => uploadImage(e)} />
      <button type="submit" disabled={!isUserLoaded}>List it!</button>
      {!isUserLoaded && <p>Loading user session...</p>}
    </form>
  );
}
