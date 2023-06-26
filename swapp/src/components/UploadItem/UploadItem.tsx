import supabase from '../../supabaseClient';
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';


export default function UploadItem() {
  const [user, setUser] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [uploadedFilePath, setUploadedFilePath] = useState("");

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

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {

    e.preventDefault();
    let file = e.target.files?.[0];
    if (user && file) {
        const filePath = user?.id + '/' + uuid();
        const { data, error } = await supabase
            .storage
            .from('images')
            .upload(filePath, file);
        if (data) {
            setUploadedFilePath(filePath);
            getImages();
        } else {
            console.log(error);
        }
    } else if (!user) {
        alert('You must be logged in to upload an image.');
    }
  }
  
  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user && title && uploadedFilePath) {
        const {data: insertData, error: insertError} = await supabase
        .from("items")
        .insert([{title: title, user_id: user?.id, image: uploadedFilePath}]);
        if(insertError) {
            console.error(insertError)
            alert("Error inserting new item.");
        }
        setTitle("");
        getImages();
    } else if (!user) {
        alert('You must be logged in to list an item.');
    }
}


return (
  <form onSubmit={handleFormSubmit}>
    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
    <input type="file" name="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={uploadImage} />
    <button type="submit" disabled={!isUserLoaded || !uploadedFilePath}>List it!</button>
    {!isUserLoaded && <p>Loading user session...</p>}
  </form>
);
}
