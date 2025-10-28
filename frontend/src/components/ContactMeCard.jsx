import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, SendHorizonal, Mail } from "lucide-react";

export default function ContactMeCard({ data, theme }) {
  const { title, subtitle, channels } = data;

  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fromName,
          email: fromEmail,
          message: msg,
        }),
      });

      const json = await res.json();
      if (json.ok) {
        setStatus("sent");
        setMsg("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border p-6 shadow-xl"
      style={{
        background: theme.cardBg,
        borderColor: theme.cardBorder,
        backdropFilter: `blur(${theme.glassBlur})`,
        boxShadow: `0 30px 80px -10px ${theme.accent}22`,
      }}
    >
      <div className="mb-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h2
            className="text-sm font-semibold uppercase tracking-wide flex w-fit relative"
            style={{ color: theme.textPrimary }}
          >
            {title}
            <span
              className="absolute left-0 -bottom-1 h-[2px] w-full rounded"
              style={{
                background: theme.accent,
                boxShadow: `0 0 12px ${theme.accent}`,
              }}
            />
          </h2>
          <p
            className="text-xs text-slate-400 mt-2"
            style={{ color: theme.textSecondary }}
          >
            {subtitle}
          </p>
        </div>

        <div className="flex gap-2 mt-4 sm:mt-0">
          <a
            href={channels.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] px-3 py-2 rounded-lg border flex items-center gap-1 font-medium transition-all hover:-translate-y-0.5"
            style={{
              color: theme.textPrimary,
              borderColor: theme.accent + "55",
              backgroundColor: theme.accent + "0d",
              boxShadow: `0 20px 40px -8px ${theme.accent}33`,
            }}
          >
            <MessageCircle size={14} />
            {channels.whatsapp.label}
          </a>

          <a
            href={channels.telegram.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] px-3 py-2 rounded-lg border flex items-center gap-1 font-medium transition-all hover:-translate-y-0.5"
            style={{
              color: theme.textPrimary,
              borderColor: theme.accent + "55",
              backgroundColor: theme.accent + "0d",
              boxShadow: `0 20px 40px -8px ${theme.accent}33`,
            }}
          >
            <SendHorizonal size={14} />
            {channels.telegram.label}
          </a>

          <a
            href={`mailto:${channels.email.address}`}
            className="text-[11px] px-3 py-2 rounded-lg border flex items-center gap-1 font-medium transition-all hover:-translate-y-0.5"
            style={{
              color: theme.textPrimary,
              borderColor: "rgba(255,255,255,0.1)",
              backgroundColor: "rgba(255,255,255,0.02)",
            }}
          >
            <Mail size={14} />
            {channels.email.label}
          </a>
        </div>
      </div>

      <div className="h-px w-full bg-slate-700/30 rounded-full mb-4" />

      <form
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-slate-900/40 border border-slate-700/50 rounded-lg px-3 py-2 outline-none text-slate-200 placeholder-slate-500 sm:col-span-1"
          placeholder="Your name"
          value={fromName}
          onChange={(e) => setFromName(e.target.value)}
          style={{
            boxShadow: `0 20px 40px -8px ${theme.accent}11`,
          }}
        />
        <input
          className="bg-slate-900/40 border border-slate-700/50 rounded-lg px-3 py-2 outline-none text-slate-200 placeholder-slate-500 sm:col-span-1"
          placeholder="Your email"
          type="email"
          value={fromEmail}
          onChange={(e) => setFromEmail(e.target.value)}
          style={{
            boxShadow: `0 20px 40px -8px ${theme.accent}11`,
          }}
        />
        <textarea
          className="bg-slate-900/40 border border-slate-700/50 rounded-lg px-3 py-2 outline-none text-slate-200 placeholder-slate-500 resize-none sm:col-span-2 md:col-span-2 min-h-[70px]"
          placeholder="Short message for Divyansh…"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          style={{
            boxShadow: `0 20px 40px -8px ${theme.accent}11`,
          }}
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="sm:col-span-1 flex items-center justify-center gap-2 text-[11px] font-medium rounded-lg border px-3 py-2 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            color: "white",
            borderColor: theme.accent,
            backgroundColor: theme.accent,
            boxShadow: `0 30px 60px -10px ${theme.accent}aa`,
          }}
        >
          <Send size={14} />
          {status === "sent"
            ? "Sent ✔"
            : status === "error"
            ? "Try again"
            : status === "sending"
            ? "Sending…"
            : "Send to my inbox"}
        </button>
      </form>
    </motion.div>
  );
}
