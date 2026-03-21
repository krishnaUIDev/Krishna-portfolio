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
            content: i18n.language === "es"
                ? "¡Hola! Soy el asistente IA de Krishna. ¿En qué puedo ayudarte hoy?"
                : "Hi there! I'm Krishna's AI assistant. How can I help you today?"
        }
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
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            // Filter history to alternate roles (User, Model)
            const history = messages
                .filter((_, index) => index > 0) // Skip welcome msg
                .map(m => ({
                    role: m.role,
                    parts: [{ text: m.content }],
                }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: history,
                    systemInstruction: generateSystemPrompt(),
                    language: i18n.language
                })
            });

            if (response.status === 404) {
                throw new Error(i18n.language === "es"
                    ? "Error 404: El backend no está ejecutándose localmente. Por favor, usa 'vercel dev' para probar las funciones de servidor."
                    : "Error 404: The backend is not running locally. Please use 'npx vercel dev' to test serverless functions.");
            }

            if (!response.ok) {
                const text = await response.text();
                let errorData;
                try {
                    errorData = JSON.parse(text);
                } catch {
                    errorData = { error: text || 'Failed to fetch AI response' };
                }
                throw new Error(errorData.error || 'Failed to fetch AI response');
            }

            const data = await response.json();
            setMessages(prev => [...prev, { role: "model", content: data.text }]);
        } catch (error: any) {
            console.error("AI Error:", error);
            let errorMessage = i18n.language === "es"
                ? "Lo siento, tuve un problema al procesar eso. Por favor, intenta de nuevo."
                : "Sorry, I ran into an issue processing that. Please try again.";

            if (error.message?.includes("404")) {
                errorMessage = error.message;
            } else if (error.message?.includes("API Key")) {
                errorMessage = i18n.language === "es"
                    ? "⚠️ API Key no configurada en el servidor. Por favor, revisa tus variables de entorno en Vercel."
                    : "⚠️ API Key not configured on server. Please check your environment variables in Vercel.";
            }

            setMessages(prev => [...prev, {
                role: "model",
                content: errorMessage
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const quickQuestions = i18n.language === "es"
        ? ["¿Cuales son tus habilidades?", "¿Estás disponible para trabajar?", "¿Cómo puedo contactarte?"]
        : ["What are your top skills?", "Are you available for hire?", "How can I contact you?"];

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-16 right-0 w-[280px] md:w-[320px] h-[380px] glass-card flex flex-col overflow-hidden shadow-2xl origin-bottom-right"
                    >
                        {/* Header */}
                        <div className="p-3 border-b border-border/50 flex items-center justify-between bg-primary/5">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Sparkles size={14} className="text-primary animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-[13px] font-bold text-foreground leading-tight">Krishna AI</h3>
                                    <div className="flex items-center gap-1">
                                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-lg hover:bg-secondary/50 text-muted-foreground transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide"
                        >
                            {messages.map((m, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: m.role === "user" ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`flex gap-2 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 ${m.role === "user" ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                                            }`}>
                                            {m.role === "user" ? <User size={12} /> : <Bot size={12} />}
                                        </div>
                                        <div className={`p-3 rounded-2xl text-sm leading-relaxed ${m.role === "user"
                                            ? "bg-primary text-white rounded-tr-none"
                                            : "bg-secondary/50 text-foreground rounded-tl-none border border-border/50"
                                            }`}>
                                            {m.content}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-2 max-w-[85%]">
                                        <div className="w-6 h-6 rounded-full bg-secondary text-muted-foreground flex items-center justify-center shrink-0 mt-1">
                                            <Bot size={12} />
                                        </div>
                                        <div className="bg-secondary/50 p-3 rounded-2xl rounded-tl-none border border-border/50">
                                            <Loader2 size={16} className="animate-spin text-primary" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Replies */}
                        {messages.length === 1 && (
                            <div className="px-4 pb-2 flex flex-wrap gap-2">
                                {quickQuestions.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => setInput(q)}
                                        className="text-[11px] px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-3 border-t border-border/50 bg-secondary/20">
                            <div className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    placeholder={i18n.language === "es" ? "Escribe..." : "Type..."}
                                    className="w-full bg-background/50 border border-border/50 rounded-lg px-3 py-1.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary transition-all pr-10"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-1 p-1.5 rounded-md bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
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
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group ${isOpen ? "bg-secondary text-foreground rotate-90" : "bg-primary text-white"
                    }`}
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
                                className="absolute inset-0 bg-white rounded-full -z-10"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default AIChatbot;
