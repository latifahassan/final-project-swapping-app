import HomePage from '../HomePage/HomePage';
// import LandingPage from '../LandingPage/LandingPage';
// import AuthPage from '../AuthPage/AuthPage';
// import MyAccountPage from '../MyAccountPage/MyAccountPage';
import NavBar from '../NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'


export default function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
          <Routes>
            <Route path = "/" element = {<HomePage/>} />
            {/* path should be /home - to be amended */}
            {/* <Route path = "/" element = {<LandingPage/>} /> */}
            {/* <Route path = "/login" element = {<AuthPage/>} /> */}
            {/* <Route path = "/myaccount" element = {<MyAccountPage/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}
