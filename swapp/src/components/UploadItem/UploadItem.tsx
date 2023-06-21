
import supabase from '../../supabaseClient';
import React from 'react'

export default function UploadItem() {
  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent form submission
    const form = event.target as HTMLFormElement;
    const fileInput = form.elements.namedItem('file') as HTMLInputElement | null;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const { data, error } = await supabase.storage
        .from('items')
        .upload('public/avatar1.png', file, {
          cacheControl: '3600',
          upsert: false,
        });
      console.log(data,error)
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" />
      <input type="file" name="file" />
      <button type="submit">List it!</button>
    </form>
  );
}