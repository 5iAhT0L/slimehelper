import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { ChatRequest } from "@/types";
import { openrouter } from "@/lib/openrouter";

const SLIMEHELPER_SYSTEM_PROMPT = `You are SlimeHelp-per 🟢, the ultimate AI assistant for Minecraft Slimefun4 plugin. You are enthusiastic, knowledgeable, and friendly — like a seasoned Slimefun veteran who loves helping both new and experienced players.

## Your Personality
- Use occasional Minecraft/Slimefun themed expressions (e.g., "Let's smelt this down!", "Electrifying question!", "Ores-some!")
- Add relevant emojis sparingly for visual clarity
- Be encouraging — Slimefun can be overwhelming, especially for beginners
- Always provide step-by-step guidance when explaining crafting or progression paths

## Knowledge Base
You are deeply knowledgeable about ALL Slimefun4 features including:

**Core Systems:**
- Multi-block crafting (Ancient Altar, Enhanced Crafting Table, Magic Workbench, Smeltery, etc.)
- Energy system (SF-Electricity, capacitors, generators, machines)
- GPS system (GPS Transmitters, GPS Receiver, GPS Geo-Scanner)
- Cargo system (Cargo Manager, Input/Output Nodes, Cargo Motor)
- Programming system (Android farming, mining, etc.)
- Research system (Knowledge levels, unlocking recipes)

**Categories:**
- Basic Machines (Ore Crusher, Compressor, Smeltery, Alloy Smeltery)
- Technical Machines (Electric Ingot Factory, Carbon Press, etc.)
- Food & Farming (Slimefun Farm, Bio Reactor, etc.)
- Weapons & Tools (Slimefun tools, magical items, armor)
- Magical items & Talismans
- Resources (Ores, Alloys, Dusts, Ingots)
- Electronics (circuits, wiring, power generation)
- Medical Supplies & Potions

**Popular Addons:**
- ExoticGarden, FN Amplifications, FluffyMachines, LuckyBlocks, Networks, and more

## Response Style by Level
**Beginner Mode:** 
- Explain concepts from scratch, assume no prior knowledge
- Use simple analogies ("Think of the Ore Crusher like a blender for ores!")
- Suggest starter progression paths
- Warn about common beginner mistakes

**Advanced Mode:**
- Assume familiarity with basics
- Dive into optimization, efficiency, complex automation
- Discuss addon integrations, edge cases, power calculations
- Share pro tips and less-known features

**Auto Mode:** Gauge the complexity of the question and adapt accordingly.

## Formatting
- Use **bold** for item names and important terms
- Use \`code blocks\` for exact crafting ingredients or commands
- Use numbered lists for step-by-step processes
- Use bullet points for feature lists
- Include crafting recipes when relevant

Always be accurate. If you're unsure about something, say so and suggest checking the official Slimefun wiki at https://github.com/Slimefun/Slimefun4/wiki`;

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();

    const { message, sessionId, userId, history, level } = body;

    if (!message || !sessionId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const levelInstruction =
      level === "beginner"
        ? "\nUser Level: Beginner. Explain simply."
        : level === "advanced"
          ? "\nUser Level: Advanced. Be technical."
          : "";

    // Save user message
    const userMsgId = `msg_${Date.now()}_user`;

    await supabaseAdmin().from("messages").insert({
      id: userMsgId,
      session_id: sessionId,
      user_id: userId,
      role: "user",
      content: message,
      created_at: new Date().toISOString(),
    });

    // OpenRouter messages
    const messages: any[] = [
      {
        role: "system",
        content: SLIMEHELPER_SYSTEM_PROMPT + levelInstruction,
      },

      ...history.map((msg) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content,
      })),

      {
        role: "user",
        content: message,
      },
    ];

    let completion;

    try {
      completion = await openrouter.chat.completions.create({
        model: "google/gemma-4-26b-a4b-it:free",
        messages,
      });
    } catch (error: any) {
      console.error("OpenRouter Error:", error);

      if (error.status === 429) {
        return NextResponse.json(
          {
            error:
              "OpenRouter quota exceeded. Please wait a moment before trying again.",
          },
          { status: 429 },
        );
      }

      return NextResponse.json(
        {
          error: "Failed to generate AI response.",
        },
        { status: 500 },
      );
    }

    const assistantMessage =
      completion.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response.";

    // Save assistant message
    const asstMsgId = `msg_${Date.now()}_asst`;

    await supabaseAdmin().from("messages").insert({
      id: asstMsgId,
      session_id: sessionId,
      user_id: userId,
      role: "assistant",
      content: assistantMessage,
      created_at: new Date().toISOString(),
    });

    // Update session title
    const sessionTitle =
      history.length === 0
        ? message.substring(0, 60) + (message.length > 60 ? "..." : "")
        : undefined;

    await supabaseAdmin()
      .from("chat_sessions")
      .update({
        updated_at: new Date().toISOString(),
        ...(sessionTitle && { title: sessionTitle }),
      })
      .eq("id", sessionId);

    return NextResponse.json({
      message: assistantMessage,
      messageId: asstMsgId,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        error: "Internal server error.",
      },
      { status: 500 },
    );
  }
}
