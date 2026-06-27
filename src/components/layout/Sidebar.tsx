"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  MessageSquare,
  Trash2,
  LogOut,
  X,
  Zap,
  Leaf,
} from "lucide-react";
import { ChatSession } from "@/types";
import { truncate, formatDate, cn } from "@/lib/utils";

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  onLogout: () => void;
  userName: string;
  userEmail: string;
  isOpen: boolean;
  onClose: () => void;
  level: "beginner" | "advanced" | "auto";
  onLevelChange: (level: "beginner" | "advanced" | "auto") => void;
}

export default function Sidebar(props: SidebarProps) {
  const {
    sessions,
    currentSessionId,
    onNewChat,
    onSelectSession,
    onDeleteSession,
    onLogout,
    userName,
    userEmail,
    isOpen,
    onClose,
    level,
    onLevelChange,
  } = props;

  const SidebarContent = () => (
    <>
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

          <button
            onClick={onClose}
            className="lg:hidden text-slate-500 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <button
          onClick={() => {
            onNewChat();
            onClose();
          }}
          className="w-full btn-slime flex items-center justify-center gap-2 py-2.5 text-sm"
        >
          <Plus size={16} />
          New Chat
        </button>
      </div>

      {/* Mode */}
      <div className="px-4 py-3 border-b border-slime-900/30">
        <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">
          Mode
        </p>

        <div className="flex gap-2">
          {(["beginner", "auto", "advanced"] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => onLevelChange(lvl)}
              className={cn(
                "flex-1 rounded-lg py-2 text-xs capitalize transition",
                level === lvl
                  ? "bg-slime-700 text-white"
                  : "bg-obsidian-800 text-slate-400 hover:bg-obsidian-700",
              )}
            >
              {lvl === "beginner" && <Leaf size={10} className="inline mr-1" />}

              {lvl === "advanced" && <Zap size={10} className="inline mr-1" />}

              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <p className="text-xs uppercase tracking-wider text-slate-600 mb-2 px-1">
          Recent Chats
        </p>

        {sessions.length === 0 ? (
          <p className="text-xs text-slate-600 text-center py-8">
            No chats yet.
          </p>
        ) : (
          <AnimatePresence mode="popLayout">
            {sessions.map((session) => (
              <motion.div
                key={session.id}
                layout
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className={cn(
                  "group flex items-center gap-2 rounded-xl px-3 py-2 mb-1 cursor-pointer transition",
                  currentSessionId === session.id
                    ? "bg-slime-900/60 border border-slime-700/30"
                    : "hover:bg-obsidian-800",
                )}
                onClick={() => {
                  onSelectSession(session.id);
                  onClose();
                }}
              >
                <MessageSquare
                  size={14}
                  className="text-slime-600 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-300 truncate">
                    {truncate(session.title, 30)}
                  </p>

                  <p className="text-[10px] text-slate-600">
                    {formatDate(session.updatedAt)}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition"
                >
                  <Trash2 size={13} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* User */}
      <div className="p-4 border-t border-slime-900/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slime-700 flex items-center justify-center text-white font-bold">
            {userName?.[0]?.toUpperCase() || "U"}
          </div>

          <div className="flex-1 min-w-0">
            <p className="truncate text-sm text-slate-200">
              {userName || "Player"}
            </p>

            <p className="truncate text-xs text-slate-500">{userEmail}</p>
          </div>

          <button
            onClick={onLogout}
            className="text-slate-500 hover:text-red-400"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* ================= Desktop ================= */}

      <aside className="hidden lg:flex lg:w-72 lg:h-screen lg:flex-col lg:bg-obsidian-900 lg:border-r lg:border-slime-900/50">
        <SidebarContent />
      </aside>

      {/* ================= Mobile ================= */}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            <motion.aside
              className="fixed left-0 top-0 h-screen w-72 bg-obsidian-900 border-r border-slime-900/50 z-50 flex flex-col lg:hidden"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 30,
              }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
