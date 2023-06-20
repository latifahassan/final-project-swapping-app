import HomePage from '../HomePage/HomePage';
import LandingPage from '../LandingPage/LandingPage';
import AuthPage from '../AuthPage/AuthPage';
// import MyAccountPage from '../MyAccountPage/MyAccountPage';
import NavBar from '../NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css'
import supabase from '../../supabaseClient';

 export type ItemsTableResults = {
  item_id: string;
  created_at: string;
  title: string;
  image: string;
  user_id: string;
  username: string;
}


export default function App() {
  const [items, setItems] = useState<ItemsTableResults[]>([]);

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    let { data, error } = await supabase
    .from('items') 
    .select('item_id, created_at, title, image, user_id, users:user_id(username)');

    if (data) {
      const transformedData: ItemsTableResults[] = data.map(x => ({
        item_id: x.item_id,
        created_at: x.created_at,
        title: x.title,
        image: x.image,
        user_id: x.user_id,
        username: x.users[0]?.username
       }))
      setItems(transformedData);
    } else {
      console.error(error);
  }
}

// this is to check that the items are being pulled from the database
console.log("see items below...")
console.log(items)


  return (
    <Router>
      <div className="App">
        <NavBar />
          <Routes>
            <Route path = "/home" element = {<HomePage items={items}/>} />
            <Route path = "/" element = {<LandingPage items={items}/>} />
            <Route path = "/login" element = {<AuthPage/>} />
            {/* <Route path = "/myaccount" element = {<MyAccountPage/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}