"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { FaPaperPlane, FaRobot, FaSpinner, FaTimes } from "react-icons/fa";

type Message = {
  role: "assistant" | "user";
  text: string;
};

const starterQuestions = [
  "What backend technologies does Joydip use?",
  "Show me Joydip's MERN projects.",
  "What experience does Joydip have with Next.js?",
  "How can I contact Joydip?"
];

export default function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openAssistant = () => {
    setOpen(true);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  const askQuestion = async (rawQuestion: string) => {
    const trimmedQuestion = rawQuestion.trim();
    if (!trimmedQuestion || isLoading) return;

    setQuestion("");
    setMessages((current) => [...current, { role: "user", text: trimmedQuestion }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/portfolio-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedQuestion })
      });
      const payload = (await response.json()) as { answer?: string; error?: string };
      const answer = payload.answer || payload.error || "I couldn't answer that right now. Please try again.";

      setMessages((current) => [...current, { role: "assistant", text: answer }]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", text: "I couldn't answer that right now. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void askQuestion(question);
  };

  return (
    <aside className="portfolio-assistant" aria-label="Ask Joydip portfolio assistant">
      <AnimatePresence>
        {open ? (
          <motion.section
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            id="portfolio-assistant-panel"
            className="portfolio-assistant__panel"
            aria-live="polite"
          >
            <div className="portfolio-assistant__header">
              <span className="portfolio-assistant__avatar" aria-hidden="true"><FaRobot /></span>
              <div>
                <strong>Ask Joydip</strong>
                <p>Portfolio assistant</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant">
                <FaTimes aria-hidden="true" />
              </button>
            </div>

            <div className="portfolio-assistant__body">
              {messages.length === 0 ? (
                <>
                  <p className="portfolio-assistant__intro">Ask about Joydip&apos;s skills, experience, projects, or contact details.</p>
                  <div className="portfolio-assistant__suggestions">
                    {starterQuestions.map((starterQuestion) => (
                      <button key={starterQuestion} type="button" onClick={() => void askQuestion(starterQuestion)}>
                        {starterQuestion}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="portfolio-assistant__messages">
                  {messages.map((message, index) => (
                    <p key={`${message.role}-${index}`} data-role={message.role}>{message.text}</p>
                  ))}
                  {isLoading ? <p data-role="assistant"><FaSpinner className="animate-spin" aria-label="Thinking" /></p> : null}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="portfolio-assistant__form">
              <input
                ref={inputRef}
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                maxLength={700}
                placeholder="Ask about Joydip..."
                aria-label="Question for Joydip's portfolio assistant"
              />
              <button type="submit" disabled={!question.trim() || isLoading} aria-label="Send question">
                <FaPaperPlane aria-hidden="true" />
              </button>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={open ? () => setOpen(false) : openAssistant}
        className="portfolio-assistant__trigger"
        aria-expanded={open}
        aria-controls="portfolio-assistant-panel"
      >
        <FaRobot aria-hidden="true" />
        Ask Joydip <span aria-hidden="true">✨</span>
      </button>
    </aside>
  );
}
