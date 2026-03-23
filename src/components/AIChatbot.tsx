import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Message {
  role: "user" | "model";
  content: string;
}

const AIChatbot = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        i18n.language === "es"
          ? "¡Hola! Soy el asistente IA de Krishna. ¿En qué puedo ayudarte hoy?"
          : "Hi there! I'm Krishna's AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateSystemPrompt = () => {
    const name = "Krishnakanth (Krishna) Kondoju";
    const role = t("hero.role");
    const about = t("about.p1") + " " + t("about.p2");
    const skills = t("skills.description");

    return `You are "Krishna AI", a professional and friendly AI assistant for ${name}'s portfolio website. 
    Your goal is to answer questions about Krishna's professional background, skills, and projects based on the following context:
    
    Context:
    - Role: ${role}
    - About: ${about}
    - Expertise: ${t("about.expertise_list", { returnObjects: true })}
    - Skills: ${skills}
    - Location: ${t("contact.footer")}
    
    Guidelines:
    - Be concise, professional, and helpful.
    - If someone asks for a meeting, suggest using the "Book a Meeting" button in the Hero section.
    - If someone asks for contact info, suggest the contact form at the bottom of the page.
    - Speak in the same language as the user's message (English or Spanish).
    - If you don't know the answer based on the context, politely say you don't have that specific information but suggest they reach out to Krishna directly via the contact form.
    - Do not make up facts.
    - Keep responses brief and conversational.`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Filter history to alternate roles (User, Model)
      const history = messages
        .filter((_, index) => index > 0) // Skip welcome msg
        .map((m) => ({
          role: m.role,
          parts: [{ text: m.content }],
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: history,
          systemInstruction: generateSystemPrompt(),
          language: i18n.language,
        }),
      });

      if (response.status === 404) {
        throw new Error(
          i18n.language === "es"
            ? "Error 404: El backend no está ejecutándose localmente. Por favor, usa 'vercel dev' para probar las funciones de servidor."
            : "Error 404: The backend is not running locally. Please use 'npx vercel dev' to test serverless functions."
        );
      }

      if (!response.ok) {
        const text = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(text);
        } catch {
          errorData = { error: text || "Failed to fetch AI response" };
        }
        throw new Error(errorData.error || "Failed to fetch AI response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "model", content: data.text }]);
    } catch (error: any) {
      console.error("AI Error:", error);
      let errorMessage =
        i18n.language === "es"
          ? "Lo siento, tuve un problema al procesar eso. Por favor, intenta de nuevo."
          : "Sorry, I ran into an issue processing that. Please try again.";

      if (error.message?.includes("404")) {
        errorMessage = error.message;
      } else if (error.message?.includes("API Key")) {
        errorMessage =
          i18n.language === "es"
            ? "⚠️ API Key no configurada en el servidor. Por favor, revisa tus variables de entorno en Vercel."
            : "⚠️ API Key not configured on server. Please check your environment variables in Vercel.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions =
    i18n.language === "es"
      ? [
        "¿Cuales son tus habilidades?",
        "¿Estás disponible para trabajar?",
        "¿Cómo puedo contactarte?",
      ]
      : ["What are your top skills?", "Are you available for hire?", "How can I contact you?"];

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card absolute bottom-16 right-0 flex h-[380px] w-[280px] origin-bottom-right flex-col overflow-hidden shadow-2xl md:w-[320px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/50 bg-primary/5 p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
                  <Sparkles size={14} className="animate-pulse text-primary" />
                </div>
                <div>
                  <h3 className="text-[13px] font-bold leading-tight text-foreground">
                    Krishna AI
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Online
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary/50"
                aria-label="Close AI Assistant"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="scrollbar-hide flex-1 space-y-3 overflow-y-auto p-3">
              {messages.map((m, i) => (
                <motion.div
                  initial={{ opacity: 0, x: m.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[85%] gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${m.role === "user"
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary text-muted-foreground"
                        }`}
                    >
                      {m.role === "user" ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div
                      className={`rounded-2xl p-3 text-sm leading-relaxed ${m.role === "user"
                          ? "rounded-tr-none bg-primary text-white"
                          : "rounded-tl-none border border-border/50 bg-secondary/50 text-foreground"
                        }`}
                    >
                      {m.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[85%] gap-2">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                      <Bot size={12} />
                    </div>
                    <div className="rounded-2xl rounded-tl-none border border-border/50 bg-secondary/50 p-3">
                      <Loader2 size={16} className="animate-spin text-primary" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-2">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] text-primary transition-colors hover:bg-primary/20"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border/50 bg-secondary/20 p-3">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder={i18n.language === "es" ? "Escribe..." : "Type..."}
                  className="w-full rounded-lg border border-border/50 bg-background/50 px-3 py-1.5 pr-10 text-[13px] transition-all focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1 rounded-md bg-primary p-1.5 text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`group flex h-12 w-12 items-center justify-center rounded-full shadow-2xl transition-all duration-500 ${isOpen ? "rotate-90 bg-secondary text-foreground" : "bg-primary text-white"
          }`}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageSquare size={20} />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 -z-10 rounded-full bg-white"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default AIChatbot;
