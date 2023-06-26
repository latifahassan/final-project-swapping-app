import supabase from "../../supabaseClient";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

export default function UploadItem() {
  const [user, setUser] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [uploadedFilePath, setUploadedFilePath] = useState("");

  useEffect(() => {
    console.log("setUploadedFilePath:", uploadedFilePath);
  }, [uploadedFilePath]);


  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsUserLoaded(true);
    }
    fetchUser();
  }, []);

  console.log(images);

  async function getImages() {
    const { data, error } = await supabase.storage
      .from("images")
      .list(user?.id + "/", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
    if (data) {
      console.log("getImages function got data:", data);
      setImages(data);
    } else {
      console.log(error);
      alert("Error loading images.");
    }
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let file = e.target.files?.[0];
    if (user && file) {
      // Create a unique filename for the uploaded file, and make the path the same as the current user's ID
      const filePath = user?.id + "/" + uuid();
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file);
      console.log("uploadImage function sent data to storage:", data);
      if (data) {
        setUploadedFilePath(filePath);
        getImages();
        console.log("getImages function got images:", images);
      } else {
        console.log(error);
      }
    } else if (!user) {
      alert("You must be logged in to upload an image.");
    }
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      console.log("handleFormSubmit function has been called on form submission.");
      e.preventDefault();
      if (user && title && uploadedFilePath) {
        console.log(
          "user:",
          user?.id,
          "title:",
          title,
          "uploadedFilePath:",
          uploadedFilePath
        );
        const { data: insertData, error: insertError } = await supabase
          .from("items")
          .insert([{ title: title, user_id: user?.id, image: `https://utocnplrsihspihnbpne.supabase.co/storage/v1/object/public/images/${uploadedFilePath}` }]);
          console.log("insertData variable from handleFormSubmit:", insertData);
        if (insertError) {
          console.error(insertError);
          alert("Error inserting new item.");
        }
        // Reset text input to empty string ready for next item that the user wants to list
        setTitle("");
        // Reset uploadedFilePath to empty string ready for next item that the user wants to list
        setUploadedFilePath("");
        getImages();
      } else if (!user) {
        alert("You must be logged in to list an item.");
      }
    }
    catch (error) {
      console.error("Error in handleFormSubmit:", error);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>Item name</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        name="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={uploadImage}
      />
      <button type="submit" disabled={!isUserLoaded || !uploadedFilePath}>
        List it!
      </button>
      {!isUserLoaded && <p>Loading user session...</p>}
    </form>
  );
}
