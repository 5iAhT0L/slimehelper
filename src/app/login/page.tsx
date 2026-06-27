'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2, Chrome } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import ParticleBackground from '@/components/ui/ParticleBackground'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const { login, loginWithGoogle } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back, Slimefun Explorer! 🟢')
      router.push('/dashboard')
    } catch (err: any) {
      const msg = err.code === 'auth/invalid-credential'
        ? 'Invalid email or password'
        : 'Login failed. Please try again.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    try {
      await loginWithGoogle()
      toast.success('Welcome to SlimeHelp-per! 🟢')
      router.push('/dashboard')
    } catch {
      toast.error('Google sign-in failed')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <ParticleBackground />

      {/* Background glow */}
      <div className="absolute inset-0 bg-slime-radial opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl mb-4 inline-block"
          >
            🟢
          </motion.div>
          <h1 className="pixel-text text-slime-400 text-sm mb-2">SlimeHelp-per</h1>
          <p className="text-slate-400 text-sm">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8">
          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 border border-slate-700 
                       hover:border-slate-500 rounded-xl py-3 text-sm font-medium text-slate-300
                       hover:bg-slate-800/50 transition-all duration-200 mb-6 disabled:opacity-50"
          >
            {googleLoading
              ? <Loader2 size={18} className="animate-spin" />
              : <Chrome size={18} className="text-blue-400" />
            }
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-slate-600 text-xs">or</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-xs mb-1.5 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="input-slime w-full text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs mb-1.5 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-slime w-full text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading || googleLoading || !email || !password}
              whileTap={{ scale: 0.98 }}
              className="btn-slime w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              Sign In
            </motion.button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            No account?{' '}
            <Link href="/signup" className="text-slime-400 hover:text-slime-300 font-medium">
              Sign up free
            </Link>
          </p>
        </div>

        <p className="text-center text-slate-600 text-xs mt-4">
          Your AI-powered Slimefun guide awaits
        </p>
      </motion.div>
    </div>
  )
}
