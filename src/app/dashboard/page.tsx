"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Zap, Leaf, Bot } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { ChatSession, Message } from "@/types";
import { generateId } from "@/lib/utils";
import Sidebar from "@/components/layout/Sidebar";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import WelcomeScreen from "@/components/chat/WelcomeScreen";
import TypingIndicator from "@/components/chat/TypingIndicator";
import ParticleBackground from "@/components/ui/ParticleBackground";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [level, setLevel] = useState<"beginner" | "advanced" | "auto">("auto");

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (user) fetchSessions();
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiLoading]);

  const fetchSessions = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/auth/sessions?userId=${user.uid}`);
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch {
      console.error("Failed to fetch sessions");
    }
  };

  const fetchMessages = async (sessionId: string) => {
    try {
      const res = await fetch(`/api/auth/messages?sessionId=${sessionId}`);
      const data = await res.json();
      const mapped = (data.messages || []).map((m: any) => ({
        ...m,
        createdAt: m.created_at,
        sessionId: m.session_id,
      }));

      console.log(mapped);

      setMessages(mapped);
    } catch {
      console.error("Failed to fetch messages");
    }
  };

  const handleNewChat = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/auth/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid, level }),
      });
      const data = await res.json();
      const session = data.session;
      setSessions((prev) => [session, ...prev]);
      setCurrentSessionId(session.id);
      setMessages([]);
      setSidebarOpen(false);
    } catch {
      toast.error("Failed to create new chat");
    }
  };

  const handleSelectSession = async (id: string) => {
    setCurrentSessionId(id);
    setMessages([]);
    await fetchMessages(id);
    setSidebarOpen(false);
  };

  const handleDeleteSession = async (id: string) => {
    try {
      await fetch(`/api/auth/sessions?sessionId=${id}`, { method: "DELETE" });
      setSessions((prev) => prev.filter((s) => s.id !== id));
      if (currentSessionId === id) {
        setCurrentSessionId(null);
        setMessages([]);
      }
      toast.success("Chat deleted");
    } catch {
      toast.error("Failed to delete chat");
    }
  };

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!user || aiLoading) return;

      let sessionId = currentSessionId;
      if (!sessionId) {
        // Auto-create session
        const res = await fetch("/api/auth/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.uid, level }),
        });
        const data = await res.json();
        sessionId = data.session.id;
        setSessions((prev) => [data.session, ...prev]);
        setCurrentSessionId(sessionId);
      }

      const userMsg: Message = {
        id: generateId(),
        role: "user",
        content,
        createdAt: new Date().toISOString(),
        sessionId: sessionId!,
      };
      setMessages((prev) => [...prev, userMsg]);
      setAiLoading(true);

      try {
        const history = messages.slice(-10).map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: content,
            sessionId,
            userId: user.uid,
            level,
            history,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong.");
        }

        const aiMsg: Message = {
          id: data.messageId || generateId(),
          role: "assistant",
          content: data.message,
          createdAt: new Date().toISOString(),
          sessionId: sessionId!,
        };

        setMessages((prev) => [...prev, aiMsg]);

        // Update session title in sidebar after first message
        if (messages.length === 0) {
          setSessions((prev) =>
            prev.map((s) =>
              s.id === sessionId
                ? {
                    ...s,
                    title: content.substring(0, 60),
                    updatedAt: new Date().toISOString(),
                  }
                : s,
            ),
          );
        }
      } catch (err: any) {
        console.error(err);

        const errorMessage: Message = {
          id: generateId(),
          role: "assistant",
          content:
            err.message || "⚠️ SlimeHelp-per encountered an unexpected error.",
          createdAt: new Date().toISOString(),
          sessionId: sessionId!,
        };

        setMessages((prev) => [...prev, errorMessage]);

        toast.error(err.message);
      } finally {
        setAiLoading(false);
      }
    },
    [user, aiLoading, currentSessionId, messages, level],
  );

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2 border-slime-600 border-t-transparent"
        />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-obsidian-950">
      <ParticleBackground />

      {/* Sidebar */}
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        onLogout={handleLogout}
        userName={user.displayName || "Player"}
        userEmail={user.email || ""}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        level={level}
        onLevelChange={setLevel}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Bar */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-slime-900/40 bg-obsidian-950/80 backdrop-blur-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2">
            <Bot size={18} className="text-slime-500" />
            <span className="pixel-text text-slime-400 text-[9px]">
              SlimeHelp-per
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span
              className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full
              ${
                level === "beginner"
                  ? "bg-emerald-900/50 text-emerald-400 border border-emerald-700/30"
                  : level === "advanced"
                    ? "bg-purple-900/50 text-purple-400 border border-purple-700/30"
                    : "bg-slime-900/50 text-slime-400 border border-slime-700/30"
              }`}
            >
              {level === "beginner" && <Leaf size={10} />}
              {level === "advanced" && <Zap size={10} />}
              {level === "auto" && <Bot size={10} />}
              {level} mode
            </span>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <WelcomeScreen
                onPrompt={handleSendMessage}
                userName={user.displayName || "Explorer"}
              />
            ) : (
              <>
                <AnimatePresence mode="popLayout">
                  {messages.map((msg) => (
                    <ChatMessage
                      key={msg.id}
                      message={msg}
                      userName={user.displayName || "U"}
                    />
                  ))}
                </AnimatePresence>
                {aiLoading && <TypingIndicator />}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="px-4 pb-6 pt-2 border-t border-slime-900/30 bg-obsidian-950/60 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto">
            <ChatInput onSend={handleSendMessage} loading={aiLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
