'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Zap, BookOpen, Bot, Shield, Leaf, Star } from 'lucide-react'
import ParticleBackground from '@/components/ui/ParticleBackground'

const FEATURES = [
  {
    icon: <Bot className="text-slime-400" size={22} />,
    title: 'AI-Powered Answers',
    desc: 'SlimeHelp-per knows everything about Slimefun4 — from basic recipes to complex automation setups.',
  },
  {
    icon: <Leaf className="text-emerald-400" size={22} />,
    title: 'Beginner Friendly',
    desc: 'Never played Slimefun before? No problem. SlimeHelp-per walks you through everything from scratch.',
  },
  {
    icon: <Zap className="text-yellow-400" size={22} />,
    title: 'Advanced Mode',
    desc: 'For veteran players — dive deep into power networks, cargo optimization, and efficiency tips.',
  },
  {
    icon: <BookOpen className="text-blue-400" size={22} />,
    title: 'Chat History',
    desc: 'All your questions are saved. Pick up right where you left off, anytime.',
  },
  {
    icon: <Shield className="text-purple-400" size={22} />,
    title: 'Always Up to Date',
    desc: 'Powered by the latest AI with Slimefun4 knowledge including popular addons.',
  },
  {
    icon: <Star className="text-gold-400" size={22} />,
    title: 'Free to Use',
    desc: 'SlimeHelp-per is completely free. Sign up and start getting answers instantly.',
  },
]

const SAMPLE_QA = [
  { q: 'How do I set up my first electricity network?', tag: 'beginner' },
  { q: 'What\'s the most efficient cargo sorter layout?', tag: 'advanced' },
  { q: 'How do I craft an Enhanced Crafting Table?', tag: 'beginner' },
  { q: 'Explain the Android farming system', tag: 'advanced' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-float">🟢</span>
          <span className="pixel-text text-slime-400 text-[9px]">SlimeHelp-per</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-ghost text-sm py-2 px-4">
            Sign In
          </Link>
          <Link href="/signup" className="btn-slime text-sm py-2 px-4">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center px-6 pt-16 pb-24 max-w-4xl mx-auto">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-slime-radial opacity-20 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 150, damping: 12 }}
          className="text-8xl mb-6 inline-block animate-float"
        >
          🟢
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-slime-900/50 border border-slime-700/40 
                          rounded-full px-4 py-1.5 text-slime-400 text-xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-slime-400 animate-pulse" />
            AI-Powered Slimefun4 Guide
          </div>

          <h1 className="pixel-text text-slime-400 text-base sm:text-xl mb-4 leading-loose">
            SlimeHelp-per
          </h1>
          <p className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4 leading-tight">
            Your Ultimate{' '}
            <span className="text-slime-400">Slimefun</span>{' '}
            AI Companion
          </p>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Ask anything about Slimefun4 — crafting recipes, machine setups, power grids, cargo
            automation, and more. Built for beginners and advanced players alike.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-slime flex items-center gap-2 text-base px-8 py-4 animate-glow"
              >
                Start for Free
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="btn-ghost text-base px-8 py-4"
              >
                Sign In
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Sample Questions Preview */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          {/* Fake chat header */}
          <div className="px-4 py-3 border-b border-slime-900/40 flex items-center gap-2">
            <span className="text-lg animate-slime-pulse">🟢</span>
            <span className="pixel-text text-slime-400 text-[8px]">SlimeHelp-per</span>
            <span className="ml-auto flex items-center gap-1 text-xs text-slime-500">
              <span className="w-1.5 h-1.5 rounded-full bg-slime-500 animate-pulse" />
              Online
            </span>
          </div>

          {/* Sample messages */}
          <div className="p-4 space-y-3">
            {SAMPLE_QA.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="chat-bubble-user px-3 py-2 text-sm text-white max-w-xs">
                  {item.q}
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 
                  ${item.tag === 'beginner'
                    ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-700/30'
                    : 'bg-purple-900/50 text-purple-400 border border-purple-700/30'
                  }`}
                >
                  {item.tag}
                </span>
              </motion.div>
            ))}
            <div className="flex items-center gap-3">
              <div className="chat-bubble-ai px-3 py-2 text-sm text-slate-300 max-w-xs">
                <div className="flex gap-1">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3">
            Everything you need to master Slimefun
          </h2>
          <p className="text-slate-400">From your first ore crusher to the most complex automation rigs</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-5 hover:border-slime-500/30 transition-all duration-200"
            >
              <div className="mb-3">{f.icon}</div>
              <h3 className="text-slate-100 font-semibold mb-1.5">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 text-center px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl max-w-2xl mx-auto p-12"
        >
          <div className="text-5xl mb-4 animate-float">🟢</div>
          <h2 className="text-2xl font-bold text-slate-100 mb-3">
            Ready to level up your Slimefun game?
          </h2>
          <p className="text-slate-400 mb-8">
            Join thousands of players getting instant Slimefun help. Free, always.
          </p>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-slime text-base px-10 py-4 animate-glow"
            >
              Get Started Free →
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center px-6 pb-8">
        <p className="text-slate-600 text-sm">
          SlimeHelp-per — An AI guide for Slimefun4 Minecraft Plugin.
          Not affiliated with the official Slimefun project.
        </p>
        <p className="text-slate-600 text-sm mt-1">
          This is a fan-made project and is not affiliated with the official Slimefun project.
          Happy made ❤️ by <a href="https://www.instagram.com/zahwan_off/" className="text-slime-400 hover:underline">Zahwan :D or AKA Diqyyyy</a>.
        </p>
               <p className="text-slate-600 text-sm mt-1">
          © {new Date().getFullYear()} SlimeHelp-per. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
