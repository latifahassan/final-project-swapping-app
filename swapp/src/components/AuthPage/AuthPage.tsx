import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import supabase from '../../supabaseClient';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Footer from '../Footer/Footer';
interface Props {
  supabaseClient: any;
  appearance: any;
}

interface Session {
  data: {
    email: string;
  };
}
// just for the commit
export default function AuthPage({ supabaseClient, appearance }: Props) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupAddress, setSignupAddress] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        console.error('Login error:', error);
        return;
      }

      if (data && data.email) {
        const authenticatedSession: Session = {
          data: {
            email: data.email,
          },
        };
        console.log('Authenticated session:', authenticatedSession);
      } else {
        console.error('Invalid data object:', error);
      }

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
      const { data, error } = await supabaseClient.auth.signUp({
        email: signupEmail,
        password: signupPassword,
      });

      if (error) {
        console.error('Sign-up error:', error);
        return;
      }
const userData=  {
  email: signupEmail,
  username: signupUsername,
  password: signupPassword,
  user_id: data.user.id,
  address: signupAddress
}

const { data:insertData, error:insertError } = await supabase
  .from('users')
  .insert([
    userData,
  ])
  if(insertError) {
    console.log('User insertion error', insertError)
    return;
  }
  console.log('User Data:', insertData)

      const authenticatedSession: Session = {
        data: {
          email: data.email,
        },
      };
      console.log(authenticatedSession);
      navigate('/home');
      setSignupEmail('');
      setSignupPassword('');
      setSignupUsername('');
      setSignupAddress('');

    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };

  return (
  <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: isMobile? '30vh' : '65vh',
    pb: '12.3vh',
    pr: '2vw',
    pl: '2vw',
    pt: '10vh',
    backgroundColor: '#f5f5f5',
  }}
>
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '-1px',
      mt: isMobile? '-7vh' : '0px',
      paddingLeft: '-50px',
      overflow: 'hidden',

    }}
  >
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        zIndex: 1,
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
 <Button
  variant="text"
  onClick={() => handleTabChange('login')}
  sx={{
    flex: 1,
    backgroundColor: activeTab === 'login' ? '#f5f5f5' : 'transparent',
    color: activeTab === 'login' ? 'black' : '#808080',
    fontSize: '1.2rem',
    padding: '0.5rem 2rem',
    borderLeft: '1px solid #e0e0e0',
    borderRight: 'none',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  }}
>
  Login
</Button>

<Button
  variant="text"
  onClick={() => handleTabChange('signup')}
  sx={{
    flex: 1,
    width: '150%',
    backgroundColor: activeTab === 'signup' ? '#f5f5f5' : 'transparent',
    color: activeTab === 'signup' ? 'black' : '#808080',
    fontSize: '1.2rem',
    padding: '0.5rem 2rem',
    borderTop: activeTab === 'signup' ? '2px solid black' : '1px solid #e0e0e0',
    borderBottom: activeTab === 'signup' ? '1px solid black' : '1px solid #e0e0e0',
    borderLeft: '1px solid #e0e0e0',
    borderRight: 'none',
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  }}
>
  Sign Up
</Button>

    </Box>
  </Box>

  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      backgroundColor: 'white',
      width: '360px',
      paddingTop: '2rem',
      paddingBottom: '2rem',
      marginTop: '-1px', 
    }}
  >
    {activeTab === 'login' && (
      <Box sx={{ marginBottom: '2rem' }}>
        <Typography variant="h5" sx={{ marginBottom: '2rem', fontSize: '2rem' }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              type="email"
              label="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              sx={{ marginBottom: '2rem', fontSize: '1.5rem' }}
            />
            <TextField
              type="password"
              label="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              sx={{ marginBottom: '2rem', fontSize: '1.5rem' }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'black',
                color: 'white',
                padding: '1rem 2rem',
                fontSize: '1.2rem',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: 'black',
                }
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    )}

    {activeTab === 'signup' && (
      <Box sx={{ marginBottom: '2rem' }}>
        <Typography variant="h5" sx={{ marginBottom: '2rem', fontSize: '2rem' }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              type="email"
              label="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              sx={{ marginBottom: '2rem', fontSize: '1.5rem' }}
            />
            <TextField
              type="password"
              label="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              sx={{ marginBottom: '2rem', fontSize: '1.5rem' }}
            />
            <TextField
              type="username"
              label="Username"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              sx={{ marginBottom: '2rem', fontSize: '1.5rem' }}
            />
            <TextField
              type="address"
              label="Address"
              value={signupAddress}
              onChange={(e) => setSignupAddress(e.target.value)}
              sx={{ marginBottom: '2rem', fontSize: '1.5rem' }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'black',
                color: 'white',
                padding: '1rem 2rem',
                fontSize: '1.2rem',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: 'black',
                }
              }}
            >
              Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    )}
  </Box>
  <Footer />
</Box>
);
};