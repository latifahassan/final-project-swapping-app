import HomePage from '../HomePage/HomePage';
import LandingPage from '../LandingPage/LandingPage';
import AuthPage from '../AuthPage/AuthPage';
// import MyAccountPage from '../MyAccountPage/MyAccountPage';
import NavBar from '../NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css'
import supabase from '../../supabaseClient';

type ItemsTableResults = {
  item_id: string;
  created_at: string;
  title: string;
  image: string;
  user_id: string;
}


export default function App() {
  const [items, setItems] = useState<ItemsTableResults[]>([]);

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    let { data, error } = await supabase
    .from('items')
    .select('*');

    if (data) {
      setItems(data as ItemsTableResults[]);
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
            <Route path = "/home" element = {<HomePage/>} />
            <Route path = "/" element = {<LandingPage/>} />
            <Route path = "/login" element = {<AuthPage/>} />
            {/* <Route path = "/myaccount" element = {<MyAccountPage/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}