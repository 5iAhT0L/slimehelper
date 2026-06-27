'use client'

import { motion } from 'framer-motion'

const STARTER_PROMPTS = [
  { icon: '🌱', label: 'Getting Started', prompt: 'How do I start playing Slimefun for the first time?' },
  { icon: '⚗️', label: 'Ore Crusher', prompt: 'How does the Ore Crusher work and how do I build one?' },
  { icon: '⚡', label: 'Power Grid', prompt: 'How do I set up my first electricity network in Slimefun?' },
  { icon: '📦', label: 'Cargo Network', prompt: 'Can you explain how Cargo Networks work in Slimefun?' },
  { icon: '🗺️', label: 'GPS System', prompt: 'What is the GPS system and how do I use GPS Transmitters?' },
  { icon: '🤖', label: 'Android Bots', prompt: 'How do I set up a Slimefun Android for automated farming?' },
]

interface WelcomeScreenProps {
  onPrompt: (prompt: string) => void
  userName: string
}

export default function WelcomeScreen({ onPrompt, userName }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-7xl mb-6 animate-float"
      >
        🟢
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h2 className="pixel-text text-slime-400 text-sm mb-2">SlimeHelp-per</h2>
        <p className="text-slate-300 text-lg font-medium mb-2">
          Hey {userName?.split(' ')[0] || 'Explorer'}! 👋
        </p>
        <p className="text-slate-500 text-sm max-w-md mb-10 leading-relaxed">
          I&apos;m your Slimefun AI guide! Ask me anything — from basic crafting recipes to advanced
          cargo automation. Let&apos;s get you mastering Slimefun!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-xl"
      >
        {STARTER_PROMPTS.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.06 }}
            onClick={() => onPrompt(item.prompt)}
            className="glass-card rounded-xl p-3 text-left hover:border-slime-500/40
                       transition-all duration-200 hover:shadow-slime group"
          >
            <span className="text-xl mb-2 block">{item.icon}</span>
            <p className="text-slate-300 text-xs font-semibold group-hover:text-slime-400 transition-colors">
              {item.label}
            </p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
