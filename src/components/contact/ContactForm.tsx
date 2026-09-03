"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";
import MagneticButton from "@/components/ui/MagneticButton";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation/contact";

const recipientEmail = "joydip.work.mail@gmail.com";

type FormStatus = {
  type: "idle" | "success" | "error";
  message: string;
};

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });
  const [toastVisible, setToastVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" }
  });

  // Auto-dismiss the toast a few seconds after each new result; the inline
  // status text near the button stays until the next submit.
  useEffect(() => {
    if (status.type === "idle" || !status.message) return undefined;

    setToastVisible(true);
    const dismissTimer = window.setTimeout(() => setToastVisible(false), 4500);
    return () => window.clearTimeout(dismissTimer);
  }, [status]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = handleSubmit((values) => {
    setStatus({ type: "idle", message: "" });

    if (values.company) {
      // Honeypot tripped — pretend success without sending anything.
      reset();
      setStatus({ type: "success", message: "Message sent — thanks for reaching out. I'll reply soon." });
      return;
    }

    const subject = encodeURIComponent(values.subject);
    const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`);

    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    reset();
    setStatus({ type: "success", message: "Your email app has opened with the message ready to send." });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          Name
          <input
            {...register("name")}
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className="w-full rounded-[8px] border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition focus:border-cyanGlow/70 focus:bg-white/[0.09]"
          />
          {errors.name ? (
            <span id="contact-name-error" role="alert" className="text-xs font-medium text-roseGlow">
              {errors.name.message}
            </span>
          ) : null}
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          Email
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className="w-full rounded-[8px] border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition focus:border-cyanGlow/70 focus:bg-white/[0.09]"
          />
          {errors.email ? (
            <span id="contact-email-error" role="alert" className="text-xs font-medium text-roseGlow">
              {errors.email.message}
            </span>
          ) : null}
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-slate-200">
        Subject
        <input
          {...register("subject")}
          type="text"
          aria-invalid={errors.subject ? "true" : "false"}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          className="w-full rounded-[8px] border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition focus:border-cyanGlow/70 focus:bg-white/[0.09]"
        />
        {errors.subject ? (
          <span id="contact-subject-error" role="alert" className="text-xs font-medium text-roseGlow">
            {errors.subject.message}
          </span>
        ) : null}
      </label>

      <label className="grid gap-2 text-sm font-semibold text-slate-200">
        Message
        <textarea
          {...register("message")}
          rows={6}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="w-full resize-none rounded-[8px] border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition focus:border-cyanGlow/70 focus:bg-white/[0.09]"
        />
        {errors.message ? (
          <span id="contact-message-error" role="alert" className="text-xs font-medium text-roseGlow">
            {errors.message.message}
          </span>
        ) : null}
      </label>

      {/* Honeypot: hidden from sighted and screen-reader users, but present
          in the DOM/tab order for simple bots that fill every field. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input {...register("company")} type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <MagneticButton magnetic type="submit" disabled={isSubmitting} className="!min-h-10 !w-40 !gap-0 !bg-cyanGlow/15 !px-4 !py-2 sm:!px-4">
          {isSubmitting ? "Sending" : "Send message"}
        </MagneticButton>
        {status.message ? (
          <p
            className={`text-sm ${status.type === "success" ? "text-mintGlow" : "text-cyanGlow"}`}
            role="status"
          >
            {status.message}
          </p>
        ) : null}
      </div>

      {mounted ? createPortal(
        <AnimatePresence>
          {toastVisible ? (
            <motion.div
              key={status.message}
              role="status"
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`dark-surface fixed left-4 right-4 top-24 z-[60] flex items-start gap-3 rounded-[12px] border p-4 pr-4 shadow-card backdrop-blur-xl sm:left-auto sm:right-6 sm:max-w-sm ${
                status.type === "success"
                  ? "border-mintGlow/40 bg-ink/95"
                  : "border-cyanGlow/40 bg-ink/95"
              }`}
            >
              <span className={`mt-0.5 shrink-0 text-lg ${status.type === "success" ? "text-mintGlow" : "text-cyanGlow"}`}>
                {status.type === "success" ? <FaCheckCircle aria-hidden="true" /> : <FaExclamationCircle aria-hidden="true" />}
              </span>
              <p className="text-sm font-semibold leading-6 text-slate-100">{status.message}</p>
              <button
                type="button"
                onClick={() => setToastVisible(false)}
                className="ml-auto shrink-0 text-slate-400 transition hover:text-white"
                aria-label="Dismiss notification"
              >
                <FaTimes />
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body
      ) : null}
    </form>
  );
}
