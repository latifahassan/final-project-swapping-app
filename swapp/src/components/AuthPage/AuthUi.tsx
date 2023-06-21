import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  supabaseClient: any; // Adjust the type of supabaseClient according to your Supabase client implementation
  appearance: any; // Adjust the type of appearance according to your specific UI appearance configuration
}

interface Session {
  user: {
    email: string;
  };
}

export default function AuthUi({ supabaseClient, appearance }: Props) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      const { user, error } = await supabaseClient.auth.signIn({
        email: loginEmail,
        password: loginPassword,
      });
  
      if (error) {
        console.error('Login error:', error);
        return;
      }
  
      const authenticatedSession: Session = {
        user: {
          email: user.email,
        },
      };
  
      console.log(authenticatedSession);
      navigate('/home');
  
      setLoginEmail('');
      setLoginPassword('');
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      const { user, error } = await supabaseClient.auth.signUp({
        email: signupEmail,
        password: signupPassword,
      });
  
      if (error) {
        console.error('Sign-up error:', error);
        return;
      }
  
      const authenticatedSession: Session = {
        user: {
          email: user.email,
        },
      };
  
      console.log(authenticatedSession);
      navigate('/home');
  
      setSignupEmail('');
      setSignupPassword('');
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };
  

  return (
    <div>
      <div className="tab-navigation">
        <button
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => handleTabChange('login')}
        >
          Login
        </button>
        <button
          className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => handleTabChange('signup')}
        >
          Sign Up
        </button>
      </div>
      {activeTab === 'login' && (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
      {activeTab === 'signup' && (
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}
    </div>
  );
}
