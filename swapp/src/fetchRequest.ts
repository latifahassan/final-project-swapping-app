// this file will handle the fetch request to Supabase

// import { useState, useEffect } from "react";

// type ResultProps = {
//     title: string;
//     username: string;
//     image: string;
//     id: string;
//     // we might need to add extra fields here such as claimed (boolean), sent (boolean), etc.
// }
// export default function SearchResultsFetchRequest() {
//     const [result, setResult] = useState<ResultProps[]>([]);

//     useEffect(() => {
//         const api = async () => {
//         const data = await fetch(process.env.REACT_APP_SUPABASE_URL as string, {
//             method: "GET"
//         });
//         const jsonData = await data.json();
//         setResult(jsonData.results);
//         };

//         api();
//     }, []);

// }



const [items, setItems] = useState([]);

export default async function getItems() {
    const { data } = await supabase.from("items").select();
    setItems(data);
  }