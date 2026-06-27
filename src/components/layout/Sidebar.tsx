'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MessageSquare, Trash2, LogOut, X, ChevronLeft, Zap, Leaf } from 'lucide-react'
import { ChatSession } from '@/types'
import { truncate, formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface SidebarProps {
  sessions: ChatSession[]
  currentSessionId: string | null
  onNewChat: () => void
  onSelectSession: (id: string) => void
  onDeleteSession: (id: string) => void
  onLogout: () => void
  userName: string
  userEmail: string
  isOpen: boolean
  onClose: () => void
  level: 'beginner' | 'advanced' | 'auto'
  onLevelChange: (level: 'beginner' | 'advanced' | 'auto') => void
}

export default function Sidebar({
  sessions, currentSessionId, onNewChat, onSelectSession,
  onDeleteSession, onLogout, userName, userEmail,
  isOpen, onClose, level, onLevelChange
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed left-0 top-0 h-full w-72 z-40',
          'flex flex-col bg-obsidian-900 border-r border-slime-900/50',
          'lg:relative lg:translate-x-0 lg:z-auto'
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-slime-900/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-float">🟢</span>
              <div>
                <h1 className="pixel-text text-slime-400 text-[9px] leading-relaxed">
                  SlimeHelp-per
                </h1>
                <p className="text-slate-500 text-xs">Slimefun AI Guide</p>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-slate-300">
              <X size={18} />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={onNewChat}
            className="w-full btn-slime flex items-center gap-2 justify-center text-sm py-2.5"
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>

        {/* Level Selector */}
        <div className="px-4 py-3 border-b border-slime-900/30">
          <p className="text-slate-500 text-xs mb-2 font-medium uppercase tracking-wider">Mode</p>
          <div className="flex gap-1.5">
            {(['beginner', 'auto', 'advanced'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => onLevelChange(lvl)}
                className={cn(
                  'flex-1 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 capitalize',
                  level === lvl
                    ? 'bg-slime-700 text-white'
                    : 'bg-obsidian-800 text-slate-400 hover:bg-obsidian-700'
                )}
              >
                {lvl === 'beginner' ? <Leaf size={10} className="inline mr-1" /> : null}
                {lvl === 'advanced' ? <Zap size={10} className="inline mr-1" /> : null}
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <p className="text-slate-600 text-xs px-1 mb-2 uppercase tracking-wider font-medium">
            Recent Chats
          </p>
          <AnimatePresence mode="popLayout">
            {sessions.length === 0 ? (
              <p className="text-slate-600 text-xs text-center py-8 px-2">
                No chats yet. Start by asking SlimeHelp-per something!
              </p>
            ) : (
              sessions.map((session) => (
                <motion.div
                  key={session.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className={cn(
                    'group flex items-center gap-2 rounded-xl px-3 py-2.5 mb-1 cursor-pointer',
                    'transition-all duration-150',
                    currentSessionId === session.id
                      ? 'bg-slime-900/60 border border-slime-700/30'
                      : 'hover:bg-obsidian-800'
                  )}
                  onClick={() => onSelectSession(session.id)}
                >
                  <MessageSquare size={14} className="text-slime-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-300 text-xs font-medium truncate">
                      {truncate(session.title, 30)}
                    </p>
                    <p className="text-slate-600 text-[10px]">
                      {formatDate(session.updatedAt)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDeleteSession(session.id) }}
                    className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={13} />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-slime-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slime-700 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              {userName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-200 text-sm font-medium truncate">{userName || 'Player'}</p>
              <p className="text-slate-500 text-xs truncate">{userEmail}</p>
            </div>
            <button
              onClick={onLogout}
              className="text-slate-500 hover:text-red-400 transition-colors"
              title="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
