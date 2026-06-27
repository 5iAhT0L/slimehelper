"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "@/types";
import { formatDate } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface ChatMessageProps {
  message: Message;
  userName?: string;
}

export default function ChatMessage({ message, userName }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  console.log("MESSAGE:", message);
  console.log("createdAt:", message.createdAt);
  console.log("typeof:", typeof message.createdAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-start gap-3 group ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 font-semibold
        ${
          isUser
            ? "bg-slime-700 text-white"
            : "bg-slime-900 border border-slime-700/50 animate-slime-pulse"
        }`}
      >
        {isUser ? userName?.[0]?.toUpperCase() || "U" : "🟢"}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[78%] relative ${isUser ? "items-end" : "items-start"} flex flex-col`}
      >
        <div
          className={`px-4 py-3 relative ${isUser ? "chat-bubble-user" : "chat-bubble-ai"}`}
        >
          {isUser ? (
            <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          ) : (
            <div className="prose-slime text-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Actions & timestamp */}
        <div
          className={`flex items-center gap-2 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity ${isUser ? "flex-row-reverse" : ""}`}
        >
          <span className="text-slate-600 text-xs">
            {formatDate(message.createdAt)}
          </span>
          {!isUser && (
            <button
              onClick={handleCopy}
              className="text-slate-600 hover:text-slime-400 transition-colors"
              title="Copy message"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
