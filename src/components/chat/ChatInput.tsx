'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface ChatInputProps {
  onSend: (message: string) => void
  loading: boolean
  disabled?: boolean
}

const QUICK_PROMPTS_BEGINNER = [
  "How do I start Slimefun?",
  "What's the first machine to craft?",
  "How does the Ore Crusher work?",
]

const QUICK_PROMPTS_ADVANCED = [
  "How do I optimize cargo networks?",
  "Best power generation setup?",
  "Explain the GPS system",
]

export default function ChatInput({ onSend, loading, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`
    }
  }, [input])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed || loading || disabled) return
    onSend(trimmed)
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="space-y-3">
      {/* Input area */}
      <motion.div
        className="flex items-end gap-3 glass-card rounded-2xl p-2 pl-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask SlimeHelp-per anything about Slimefun... (Shift+Enter for new line)"
          disabled={loading || disabled}
          rows={1}
          className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 text-sm resize-none 
                     focus:outline-none py-2 leading-relaxed min-h-[40px] max-h-[160px]"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading || disabled}
          className="w-10 h-10 rounded-xl bg-slime-600 hover:bg-slime-500 disabled:opacity-40 
                     disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0
                     transition-all duration-200 active:scale-90 mb-1"
        >
          {loading
            ? <Loader2 size={18} className="text-white animate-spin" />
            : <Send size={18} className="text-white" />
          }
        </button>
      </motion.div>

      <p className="text-slate-600 text-xs text-center">
        SlimeHelp-per can make mistakes. Always verify with the{' '}
        <a
          href="https://github.com/Slimefun/Slimefun4/wiki"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slime-600 hover:text-slime-500"
        >
          Slimefun Wiki
        </a>.
      </p>
    </div>
  )
}
