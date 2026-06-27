import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'SlimeHelp-per | Minecraft Slimefun AI Assistant',
  description: 'Your AI-powered Slimefun4 guide — from beginner to advanced. Get instant help with crafting, automation, and everything Slimefun!',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'SlimeHelp-per',
    description: 'AI-powered Slimefun4 guide for Minecraft',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-obsidian-950">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0e0e1c',
              color: '#f1f5f9',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '12px',
            },
            success: {
              iconTheme: { primary: '#22c55e', secondary: '#0e0e1c' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#0e0e1c' },
            },
          }}
        />
      </body>
    </html>
  )
}
