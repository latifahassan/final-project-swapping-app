import supabase from '../../supabaseClient'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

type Session = {
  user: {
    email: string
    id: string
  }
}

export default function Authpage() {
  const [session, setSession] = useState<Session | null | undefined>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: session }) => {
      setSession(session)
    })
  
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  
    return () => {
      if (subscription) {
        subscription.data?.unsubscribe()
      }
    }
  }, [])

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
  } else {
    return <div>Logged in!</div>
  }
}