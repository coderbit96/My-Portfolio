"use client";

import { useEffect, useRef, useState } from "react";
import { FaCheck, FaCopy, FaEnvelope } from "react-icons/fa";

interface CopyEmailButtonProps {
  email: string;
}

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

export default function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await copyToClipboard(email);
      setCopied(true);

      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" className="copy-email-button" onClick={handleCopy} aria-label={`Copy ${email} to clipboard`}>
      <FaEnvelope aria-hidden="true" />
      <span className="copy-email-button__address">{email}</span>
      <span className={`copy-email-button__status${copied ? " copy-email-button__status--copied" : ""}`} aria-live="polite">
        {copied ? <FaCheck aria-hidden="true" /> : <FaCopy aria-hidden="true" />}
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
