import { NextResponse } from "next/server";
import {
  getDemoPortfolioAnswer,
  isPortfolioAssistantQuestion,
  portfolioKnowledge
} from "@/lib/portfolioAssistant";

type GeminiApiPayload = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
      text?: string;
      }>;
    };
  }>;
};

function getResponseText(payload: GeminiApiPayload) {
  return payload.candidates
    ?.flatMap((candidate) => candidate.content?.parts ?? [])
    .map((part) => part.text?.trim())
    .filter((text): text is string => Boolean(text))
    .join("\n");
}

export async function POST(request: Request) {
  let message = "";

  try {
    const body: unknown = await request.json();
    message = typeof body === "object" && body !== null && "message" in body && typeof body.message === "string"
      ? body.message.trim()
      : "";
  } catch {
    return NextResponse.json({ error: "Please send a valid question." }, { status: 400 });
  }

  if (!message || message.length > 700) {
    return NextResponse.json({ error: "Please ask a question of up to 700 characters." }, { status: 400 });
  }

  if (!isPortfolioAssistantQuestion(message)) {
    return NextResponse.json({
      answer: getDemoPortfolioAnswer(message),
      mode: "demo"
    });
  }

  const demoAnswer = getDemoPortfolioAnswer(message);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ answer: demoAnswer, mode: "demo" });
  }

  try {
    const model = process.env.GEMINI_MODEL || "gemini-3.7-flash";
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: `You are the optional portfolio assistant for Joydip Ghosh. Answer only questions about Joydip, skills, experience, projects, technology, portfolio, or contact. Use only the portfolio knowledge below. Never invent, infer, or embellish experience. If the answer is not present, say that it is not listed in the portfolio. Be concise and helpful.\n\n${portfolioKnowledge}`
            }
          ]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: message }]
          }
        ]
      }),
      signal: AbortSignal.timeout(12_000)
    });

    if (!response.ok) {
      return NextResponse.json({ answer: demoAnswer, mode: "demo" });
    }

    const responsePayload = (await response.json()) as GeminiApiPayload;
    const answer = getResponseText(responsePayload);

    return NextResponse.json({
      answer: answer || demoAnswer,
      mode: answer ? "ai" : "demo"
    });
  } catch {
    return NextResponse.json({ answer: demoAnswer, mode: "demo" });
  }
}
