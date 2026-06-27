import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 })

  const { data, error } = await supabaseAdmin()
    .from('chat_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ sessions: data })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { userId, level } = body

  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`

  const { data, error } = await supabaseAdmin()
    .from('chat_sessions')
    .insert({
      id: sessionId,
      user_id: userId,
      title: 'New Chat',
      level: level || 'auto',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ session: data })
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('sessionId')
  if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })

  await supabaseAdmin().from('messages').delete().eq('session_id', sessionId)
  const { error } = await supabaseAdmin().from('chat_sessions').delete().eq('id', sessionId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
