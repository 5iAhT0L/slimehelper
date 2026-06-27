# 🟢 SlimeHelp-per

> Your AI-powered Minecraft Slimefun4 guide — from absolute beginner to automation master.

![SlimeHelp-per Banner](./public/preview.png)

## ✨ Features

- **AI Chat** — Ask SlimeHelp-per anything about Slimefun4 (crafting, machines, power, cargo, GPS, Androids, addons...)
- **Beginner / Advanced / Auto modes** — Adapts explanation depth to your level
- **Full Auth** — Email/Password + Google Sign-In via Firebase
- **Chat History** — All conversations stored in Supabase, synced across devices
- **Beautiful UI** — Dark Slimefun-themed design with particle effects, smooth Framer Motion animations
- **Markdown responses** — Code blocks, bold terms, numbered steps rendered beautifully

---

## 🚀 MVP Setup Guide

### Prerequisites
- Node.js 18+
- A Firebase project
- A Supabase project
- An Anthropic API key

---

### Step 1 — Clone & Install

```bash
git clone <your-repo>
cd slimehelper
npm install
```

---

### Step 2 — Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable **Authentication** → Sign-in method:
   - ✅ Email/Password
   - ✅ Google
4. Go to **Project Settings** → Your apps → Add Web App
5. Copy your config values

---

### Step 3 — Supabase Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. Open **SQL Editor** and paste + run the contents of `supabase-schema.sql`
3. Go to **Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` key → `SUPABASE_SERVICE_ROLE_KEY`

---

### Step 4 — Environment Variables

Copy `.env.local.example` to `.env.local` and fill in all values:

```bash
cp .env.local.example .env.local
```

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Anthropic
ANTHROPIC_API_KEY=...
```

---

### Step 5 — Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎮

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing homepage
│   ├── login/page.tsx        # Login with Firebase Auth
│   ├── signup/page.tsx       # Sign up
│   ├── dashboard/page.tsx    # Main chat interface
│   └── api/
│       ├── chat/route.ts     # SlimeHelp-per AI endpoint
│       └── auth/
│           ├── sessions/route.ts   # CRUD for chat sessions
│           └── messages/route.ts   # Fetch messages
├── components/
│   ├── chat/
│   │   ├── ChatMessage.tsx   # Individual message bubble
│   │   ├── ChatInput.tsx     # Input bar with send button
│   │   ├── WelcomeScreen.tsx # First-chat prompt cards
│   │   └── TypingIndicator.tsx
│   ├── layout/
│   │   └── Sidebar.tsx       # Chat history sidebar
│   └── ui/
│       └── ParticleBackground.tsx
├── hooks/
│   ├── useAuth.ts            # Firebase auth actions
│   └── useAuthStore.ts       # Zustand state
├── lib/
│   ├── firebase.ts           # Firebase init
│   ├── supabase.ts           # Supabase client
│   └── utils.ts              # Helpers
└── types/index.ts            # TypeScript types
```

---

## 🗺️ Roadmap (Phase 2+)

- [ ] **Slimefun Recipe Search** — Browse item recipes directly in the sidebar
- [ ] **Image uploads** — Show screenshots for visual debugging
- [ ] **Rate limiting** — Fair usage per user
- [ ] **Addon-specific modes** — Toggle ExoticGarden, FluffyMachines, etc.
- [ ] **Share Chat** — Public shareable chat links
- [ ] **Dark/Light mode toggle**
- [ ] **Keyboard shortcuts** — Power user navigation

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Auth | Firebase Auth |
| Database | Supabase (PostgreSQL) |
| AI | Anthropic Claude (claude-sonnet-4-6) |
| State | Zustand |
| Markdown | react-markdown + remark-gfm |

---

## 📄 License

MIT — free to use and modify.

Not affiliated with the official Slimefun4 project or Staartvin / TheBusyBiscuit.
