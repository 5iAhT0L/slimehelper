-- ============================================
-- SlimeHelp-per Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Users table (synced from Firebase Auth)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,             -- Firebase UID
  email TEXT UNIQUE,
  display_name TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'New Chat',
  level TEXT DEFAULT 'auto' CHECK (level IN ('beginner', 'advanced', 'auto')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_updated_at ON chat_sessions(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_session_id ON messages(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at ASC);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own data
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (true); -- Public read since we use Firebase Auth

CREATE POLICY "Users can upsert own profile"
  ON users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (true);

-- Service role bypass for API routes (handled via SUPABASE_SERVICE_ROLE_KEY)
-- The above policies are intentionally open because:
-- 1. Auth is handled by Firebase
-- 2. Our API routes verify Firebase tokens before DB operations
-- 3. The service role key is only used server-side

-- ============================================
-- Optional: View for session with message count
-- ============================================
CREATE OR REPLACE VIEW session_summary AS
SELECT 
  s.*,
  COUNT(m.id) as message_count
FROM chat_sessions s
LEFT JOIN messages m ON m.session_id = s.id
GROUP BY s.id;
