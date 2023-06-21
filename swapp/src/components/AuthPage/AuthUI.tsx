import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';

type Props = {
    user: string;
    session: string;
  }
  
export default function AuthUI() {
const navigate = useNavigate();
const [activeTab, setActiveTab] = useState('login');
const [loginEmail, setLoginEmail] = useState('');
const [loginPassword, setLoginPassword] = useState('');
const [signupEmail, setSignupEmail] = useState('');
const [signupPassword, setSignupPassword] = useState('');

    // const handleTabChange= (tab: string) => {
    //     setActiveTab(tab);
    // }

    // const handleLogin = async () => {
    //     const { user, session, error } = await supabase.auth.signInWithPassword({
    //         email: loginEmail,
    //         password: loginPassword
    //     })
    //     if (error) {
    //         console.log(error)
    //     } else {
    //         console.log(user, session)
    //         navigate('/home')
    //     }   
    // }

    return (
        <div className="authUiContainer">
            <div className="navigation">
                <button className="loginButton" onClick={() => setActiveTab('login')}>Login</button>
                <button className="signupButton" onClick={() => setActiveTab('signup')}>Signup</button>
            </div>
            <div className="loginSection">
                <form>
                    <label htmlFor="loginEmail">Email</label>
                    <input type="email" id="loginEmail" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    <label htmlFor="loginPassword">Password</label>
                    <input type="password" id="loginPassword" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                </form>
            </div>
        </div>
    )

}