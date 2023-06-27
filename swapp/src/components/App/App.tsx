import HomePage from '../HomePage/HomePage';
import LandingPage from '../LandingPage/LandingPage';
import AuthPage from '../AuthPage/AuthPage';
import MyAccountPage from '../MyAccountPage/MyAccountPage';
import NavBar from '../NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css'
import supabase from '../../supabaseClient';

//removed nav
interface Session {
  user?: {
    email?: string;
  };
}

 

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
  const [tokenCount, setTokenCount]= useState<number>(0);
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<Session | null>(null)
  console.log(user);
  useEffect(() => {
    console.log('useEffect running')
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session)
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) {
      console.log("Session exists")
    }
  }, [session])

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
      }
  }
  useEffect(() => {
    const fetchUserTokenCount = async () => {
      console.log('Fetching user token count');
      try {
        // Get the user object
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          console.log('User not found');
          return;
        }
        setUser(user);
        // Query the users table using the user_id
        const { data, error } = await supabase
          .from('users')
          .select('token_count')
          .eq('user_id', user.id);
    
        if (error) {
          
          console.error('Error retrieving user token count:', error);
        } else {
          if (data.length > 0) {
            const { token_count } = data[0]
            setTokenCount(token_count); 
          } else {
            
            console.log('Token count not found for the user.');
          }
        }
      } catch (error) {
        
        console.error('Error retrieving user token count:', error);
      }
    };
  
    fetchUserTokenCount();
  }, [session]);



  return (
      <div className="App">
        <NavBar tokenCount={tokenCount} />
          <Routes>
            <Route path = "/home" element = {<HomePage
              items={items}
              setItems={setItems}
              setFilteredItems={setFilteredItems}
              filteredItems={filteredItems}
              tokenCount={tokenCount}
              setTokenCount={setTokenCount}/>} />
            <Route path = "/" element = {<LandingPage
              items={items}
              setItems={setItems}
              setFilteredItems={setFilteredItems}
              filteredItems={filteredItems}/>} />

            <Route path = "/login" element = {<AuthPage supabaseClient={supabase} appearance='card'/>} />
            <Route path = "/myaccount" element = {<MyAccountPage
              items={items}
              setFilteredItems={setFilteredItems}
              filteredItems={filteredItems}
              />} />
        </Routes>
      </div>
  );
}