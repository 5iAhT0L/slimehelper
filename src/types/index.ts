export interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  createdAt?: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
  sessionId: string
}

export interface ChatSession {
  id: string
  userId: string
  title: string
  createdAt: string
  updatedAt: string
  messageCount: number
  level: 'beginner' | 'advanced' | 'auto'
}

export interface ChatRequest {
  message: string
  sessionId: string
  userId: string
  level: 'beginner' | 'advanced' | 'auto'
  history: { role: 'user' | 'assistant'; content: string }[]
}

export interface SlimefunCategory {
  id: string
  name: string
  icon: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}
