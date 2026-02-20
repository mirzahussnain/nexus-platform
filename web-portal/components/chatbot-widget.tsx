"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickReplies = [
  "Show open requests",
  "How many emergency repairs?",
  "Upcoming inspections",
  "Tenant lookup",
]

const botResponses: Record<string, string> = {
  "show open requests":
    "There are currently 4 open maintenance requests:\n\n1. MR-1042 - Boiler Leak (Sarah Mitchell, High)\n2. MR-1037 - Radiator Not Heating (Tom Henderson, Low)\n3. MR-1036 - Electrical Socket Sparking (Mei Lin Chen, High)\n4. MR-1032 - Leaking Roof (Emma Watson, High)\n\nWould you like me to assign a contractor to any of these?",
  "how many emergency repairs?":
    "There are currently 8 emergency repairs flagged across all properties. 3 are unassigned and need immediate attention:\n\n- Electrical Socket Sparking (Mei Lin Chen)\n- Leaking Roof (Emma Watson)\n- Damp Patch on Ceiling (Priya Sharma)\n\nShall I help you prioritise these?",
  "upcoming inspections":
    "3 inspections are scheduled:\n\n1. Oakwood Tower - Legionella (20 Feb 2026)\n2. Birch House - Structural (25 Feb 2026)\n3. Elm Court - Electrical (1 Mar 2026)\n\nNote: Maple Gardens has 1 overdue general inspection. Would you like to reschedule it?",
  "tenant lookup":
    "I can help you find tenant information. Please provide:\n\n- Tenant name\n- Unit number\n- Property name\n\nFor example, try typing: 'Find Sarah Mitchell' or 'Unit 12A'",
}

function getBotResponse(input: string): string {
  const lower = input.toLowerCase().trim()

  for (const [key, response] of Object.entries(botResponses)) {
    if (lower.includes(key) || key.includes(lower)) {
      return response
    }
  }

  if (lower.includes("find") || lower.includes("search")) {
    return "I found the following matches in our system. Please navigate to the Tenants page for full details, or try one of the quick actions below."
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! I'm your Oakwood HA assistant. I can help you with:\n\n- Checking maintenance request status\n- Looking up tenant information\n- Viewing inspection schedules\n- Generating quick reports\n\nWhat would you like to know?"
  }

  return "I can help you with maintenance requests, tenant lookups, inspection schedules, and reports. Try one of the quick actions or ask me something specific about your properties."
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm the Oakwood HA Assistant. How can I help you today? You can ask about maintenance requests, tenants, inspections, or reports.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  function sendMessage(text: string) {
    if (!text.trim()) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const response = getBotResponse(text)
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 800 + Math.random() * 600)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          isOpen
            ? "bg-foreground text-background"
            : "bg-primary text-primary-foreground"
        )}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 bg-primary px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary-foreground">
                Oakwood Assistant
              </p>
              <p className="text-xs text-primary-foreground/70">
                Online &middot; Ready to help
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-2.5",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                      msg.role === "user"
                        ? "bg-primary/10"
                        : "bg-accent/10"
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <Bot className="h-3.5 w-3.5 text-accent" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                      msg.role === "user"
                        ? "rounded-tr-md bg-primary text-primary-foreground"
                        : "rounded-tl-md bg-muted text-foreground"
                    )}
                  >
                    {msg.content.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < msg.content.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Bot className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <div className="rounded-2xl rounded-tl-md bg-muted px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "0ms" }} />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "150ms" }} />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick replies */}
          <div className="flex gap-1.5 overflow-x-auto border-t px-4 py-2.5">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="shrink-0 rounded-full border bg-background px-3 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-muted"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t px-4 py-3">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="h-9 flex-1 border-0 bg-muted/50 text-sm focus-visible:ring-1"
              aria-label="Chat message input"
            />
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 shrink-0"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
