import React from "react";
import { motion } from "framer-motion";
import data from "./data/resumeData.json";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import SectionCard from "./components/SectionCard.jsx";
import ContactMeCard from "./components/ContactMeCard.jsx";

export default function App() {
  const { hero, about, sections, theme, effects, contact_me } = data;

  return (
    <div
      className="min-h-screen text-slate-100 flex flex-col items-center py-10 px-4"
      style={{
        backgroundColor: "#0f172a",
        backgroundImage: theme.bgGradient,
      }}
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        {/* LEFT SIDEBAR */}
        <aside className="md:sticky md:top-8 self-start">
          <div
            className="relative rounded-2xl p-6 border shadow-xl flex flex-col gap-4"
            style={{
              background: theme.cardBg,
              borderColor: theme.cardBorder,
              backdropFilter: `blur(${theme.glassBlur})`,
            }}
          >
            {/* Avatar */}
            <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-600 shadow-lg">
              <img
                src={hero.photo}
                alt={hero.name}
                className="w-full h-full object-cover"
              />
              {effects.avatarGlow && (
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    boxShadow: `0 0 30px 6px ${theme.accent}55`,
                  }}
                />
              )}
            </div>

            <div>
              <h1
                className="text-xl font-semibold text-white leading-tight"
                style={{ color: theme.textPrimary }}
              >
                {hero.name}
              </h1>
              <p
                className="text-sm font-medium"
                style={{ color: theme.accent }}
              >
                {hero.tagline}
              </p>
              <p
                className="text-xs mt-1 flex items-center gap-1 text-slate-400"
                style={{ color: theme.textSecondary }}
              >
                <MapPin size={14} />
                <span>{hero.location}</span>
              </p>
            </div>

            <div className="text-xs text-slate-300 flex flex-col gap-2">
              <ContactRow icon={<Phone size={14} />} text={hero.contact.phone} />
              <ContactRow icon={<Mail size={14} />} text={hero.contact.email} />
              <ContactRow
                icon={<Linkedin size={14} />}
                text={hero.contact.linkedin}
              />
              <ContactRow text={hero.contact.portfolio} />
            </div>

            <div className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-700/50">
              {about.blurb}
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex flex-col gap-6">
          {sections.map((section, idx) => (
            <motion.section
              key={section.id}
              initial={
                effects.entryMotion === "slide-up-fade"
                  ? { y: 20, opacity: 0 }
                  : { opacity: 0 }
              }
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <SectionCard
                title={section.title}
                items={section.items}
                layout={section.layout}
                accent={theme.accent}
                textPrimary={theme.textPrimary}
                textSecondary={theme.textSecondary}
                cardBg={theme.cardBg}
                cardBorder={theme.cardBorder}
                glassBlur={theme.glassBlur}
                hoverCard={effects.hoverCard}
                accentUnderline={effects.accentUnderline}
              />
            </motion.section>
          ))}

          {/* Contact / message card */}
          <ContactMeCard data={contact_me} theme={theme} />
        </main>
      </div>

      <footer className="mt-10 text-[10px] text-slate-600">
        Built with React · Framer Motion · Tailwind
      </footer>
    </div>
  );
}

function ContactRow({ icon, text }) {
  const isUrl = text && (text.startsWith('http://') || text.startsWith('https://'));
  
  return (
    <div className="flex items-start gap-2 leading-snug break-all">
      {icon && <span className="text-slate-400">{icon}</span>}
      {isUrl ? (
        <a 
          href={text} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors underline"
        >
          {text}
        </a>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}
