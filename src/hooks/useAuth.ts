'use client'

import { useEffect } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signInWithPopup,
  signOut, updateProfile } from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'
import { useAuthStore } from './useAuthStore'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const { user, loading, setUser, setLoading } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)

      // Sync user to Supabase on login
      if (firebaseUser) {
        await supabase.from('users').upsert({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          display_name: firebaseUser.displayName,
          photo_url: firebaseUser.photoURL,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' })
      }
    })
    return () => unsubscribe()
  }, [setUser, setLoading])

  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signup = async (email: string, password: string, displayName: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName })
    return result
  }

  const loginWithGoogle = async () => {
    return signInWithPopup(auth, googleProvider)
  }

  const logout = async () => {
    await signOut(auth)
  }

  return { user, loading, login, signup, loginWithGoogle, logout }
}
