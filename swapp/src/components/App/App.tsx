import HomePage from '../HomePage/HomePage';
import LandingPage from '../LandingPage/LandingPage';
import AuthPage from '../AuthPage/AuthPage';
import MyAccountPage from '../MyAccountPage/MyAccountPage';
import NavBar from '../NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css'
import supabase from '../../supabaseClient';


 export type TableResults = {
  item_id: string;
  created_at: string;
  title: string;
  image: string;
  user_id: string;
  username: string;
  token_count?: number;
}


export default function App() {
  const [items, setItems] = useState<TableResults[]>([]);
  const [filteredItems, setFilteredItems] = useState<TableResults[]>(items);
  

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  async function getItems() {
    let { data: itemsData, error: itemsError } = await supabase
      .from('items')
      .select('item_id, created_at, title, image, user_id');

    let { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('user_id, username, token_count');

  

      if (itemsError) console.error('Items Error: ', itemsError);
      if (usersError) console.error('Users Error: ', usersError);
      
      if (!itemsError && !usersError && itemsData && usersData) {
        const transformedData = itemsData.map(item => {
          const user = usersData?.find(user => user.user_id === item.user_id);
          return {
            ...item,
            username: user ? user.username : null,
          };
        });
      
        console.log('Transformed Data: ', transformedData);
        setItems(transformedData);
        console.log("see items below...")
        console.log(items)
      }
  }


  return (
    <Router>
      <div className="App">
        <NavBar />
          <Routes>
            <Route path = "/home" element = {<HomePage
              items={items}
              setItems={setItems}
              setFilteredItems={setFilteredItems}
              filteredItems={filteredItems}/>} />
            <Route path = "/" element = {<LandingPage
              items={items}
              setItems={setItems}
              setFilteredItems={setFilteredItems}
              filteredItems={filteredItems}/>} />
            <Route path = "/login" element = {<AuthPage/>} />
            <Route path = "/myaccount" element = {<MyAccountPage
              items={items}
              setFilteredItems={setFilteredItems}
              filteredItems={filteredItems}
              />} />
        </Routes>
      </div>
    </Router>
  );
}