export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-slide-up">
      {/* AI Avatar */}
      <div className="w-8 h-8 rounded-lg bg-slime-900 border border-slime-700/50 flex items-center justify-center text-sm flex-shrink-0 animate-slime-pulse">
        🟢
      </div>
      <div className="chat-bubble-ai px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      </div>
    </div>
  )
}
