import { useState, useRef, useEffect } from "react";
import { MessageSquareText, X, Send, Sparkles, ExternalLink } from "lucide-react";
import { resolve, SUGGESTED_QUESTIONS, type AssistantResponse } from "@/lib/smartAssistant";
import { whatsappLink } from "@/lib/whatsapp";
import { track, trackConversion } from "@/lib/analytics";
import { addSignal } from "@/lib/leadScore";

interface Message {
  role: "user" | "assistant";
  content: string;
  response?: AssistantResponse;
  ts: number;
}

/**
 * SmartAssistant — mini-chat que responde dúvidas comuns antes de mandar ao WhatsApp.
 *
 * Como aumenta matrículas: reduz atrito da dúvida inicial e qualifica intenção.
 * Como reduz abandono: entrega resposta imediata 24/7 sem esperar humano.
 * Como melhora SEO: aumenta tempo de página e engajamento (sinal de qualidade).
 * Como é medida: eventos smart_assistant_open, smart_assistant_query, smart_assistant_handoff.
 */
const SmartAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      track("smart_assistant_open", {});
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const ask = (raw: string) => {
    const question = raw.trim();
    if (!question) return;
    const response = resolve(question);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question, ts: Date.now() },
      { role: "assistant", content: response.answer, response, ts: Date.now() + 1 },
    ]);
    setInput("");
    track("smart_assistant_query", {
      question: question.slice(0, 120),
      intent: response.intent,
      confidence: response.confidence,
    });
    addSignal({ type: "pages_viewed", count: 0 }); // apenas pra atualizar lastSeen
  };

  const handoff = (context?: string) => {
    const historyText = messages
      .filter((m) => m.role === "user")
      .map((m) => `- ${m.content}`)
      .join("\n");
    const message = context
      ? `Olá! Vim pelo site. Minha dúvida: ${context}`
      : `Olá! Vim pelo site. Já conversei com o assistente sobre:\n${historyText || "(sem histórico)"}\n\nPode me ajudar a fechar minha matrícula?`;
    trackConversion("smart_assistant_handoff", {
      messages_count: messages.length,
      utm_medium: "whatsapp_direto",
    });
    window.open(whatsappLink(message, "direto"), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Botão flutuante — canto inferior esquerdo (não conflita com WhatsApp à direita) */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir assistente inteligente"
          data-component="smart-assistant-trigger"
          className="fixed bottom-24 left-4 md:bottom-6 md:left-6 z-40 flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-3 min-h-11 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline text-sm font-semibold">Tire dúvidas</span>
          <span className="sm:hidden text-sm font-semibold">IA</span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-labelledby="smart-assistant-title"
          className="fixed inset-x-4 bottom-24 md:inset-auto md:bottom-6 md:left-6 md:w-[380px] z-50 bg-background rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[70vh]"
        >
          <header className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <h2 id="smart-assistant-title" className="font-semibold text-sm">
                Assistente APTOS
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar assistente"
              className="p-1 rounded hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
            {messages.length === 0 ? (
              <div className="space-y-3">
                <div className="bg-background rounded-lg p-3 text-sm shadow-sm">
                  <p className="text-foreground">
                    Oi! Sou o assistente da APTOS 🚗
                    <br />
                    Posso responder as principais dúvidas na hora. Toque em uma das opções ou pergunte à vontade:
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => ask(q)}
                      className="text-xs bg-background border border-border rounded-full px-3 py-1.5 hover:border-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-background border border-border rounded-bl-sm shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.content}</p>
                    {m.response && m.response.confidence !== "high" && (
                      <button
                        type="button"
                        onClick={() => handoff(m.content)}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                      >
                        Falar com humano no WhatsApp
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-border bg-background p-3 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua dúvida..."
                aria-label="Sua pergunta"
                maxLength={200}
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Enviar pergunta"
                className="min-h-11 min-w-11 flex items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
            <button
              type="button"
              onClick={() => handoff()}
              className="w-full text-xs text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1"
            >
              <MessageSquareText className="w-3 h-3" aria-hidden="true" />
              Prefiro falar direto no WhatsApp
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SmartAssistant;
