// THIS IS THE APP

import HomePage from '../HomePage/HomePage';
import LandingPage from '../LandingPage/LandingPage';
import AuthPage from '../AuthPage/AuthPage';
import MyAccountPage from '../MyAccountPage/MyAccountPage';
import NavBar from '../NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

export default function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
        <Routes>
          <Route path = "/home" element = {<HomePage/>} />
          <Route path = "/" element = {<LandingPage/>} />
          <Route path = "/login" element = {<AuthPage/>} />
          <Route path = "/myaccount" element = {<MyAccountPage/>} />
      </Routes>
    </div>
    </Router>
  );
}
