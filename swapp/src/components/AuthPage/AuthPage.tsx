import supabase from '../../supabaseClient'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useNavigate } from 'react-router-dom'

interface Session {
  user?: {
    email?: string;
  };
}
export default function AuthPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null)
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
      navigate('/home');
    }
  }, [session, navigate])
  
  if (!session) {
    console.log("Rendering auth component")
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  } else {
    return null
  }
}