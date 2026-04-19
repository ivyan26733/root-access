import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import data from "./data/resumeData.json";
import {
  Mail, Phone, MapPin, Linkedin, Github, Code2,
  ExternalLink, Globe, Download, MessageCircle,
  Send, SendHorizonal, Trophy, ArrowDown, CheckCircle2,
} from "lucide-react";

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  purple:      "#7C3AED",
  purpleLight: "#EDE9FE",
  purpleDim:   "#F5F3FF",
  purpleMid:   "#8B5CF6",
  green:       "#16A34A",
  greenLight:  "#DCFCE7",
  white:       "#FFFFFF",
  bg:          "#FAFAF8",
  text:        "#111827",
  textMid:     "#374151",
  muted:       "#6B7280",
  mutedLight:  "#9CA3AF",
  border:      "#E5E7EB",
  borderLight: "#F3F4F6",
};

// ── Project impact statements ─────────────────────────────────────────────────
const IMPACT = {
  "NexFlow — AI Workflow Automation Platform":
    "NexFlow can replace an entire sprint of custom integration code with a 10-minute visual build. Any team — sales, ops, engineering — can automate repetitive workflows without writing a line of code, while still getting full execution transparency at every step. It's the difference between a black-box tool and one you can actually trust in production.",
  "LearnSphere (Microservices EdTech Platform)":
    "The same architecture that powers Udemy and Coursera — built from scratch. Any business building an EdTech platform on top of these patterns gets true fault isolation, async scale, and independent deployability. It proves the ability to ship enterprise-grade distributed systems solo, not just read about them.",
  "Namaste College":
    "Brought a 4,000+ student institution fully online — placement tracking, alumni mentorship, and note sharing in one platform. 95% user satisfaction with zero dedicated IT staff. Any college replicating this model gets a full digital student services layer without needing a dedicated engineering team.",
};

const { hero, about, sections, contact_me } = data;
const experience = sections.find(s => s.id === "experience");
const projects   = sections.find(s => s.id === "projects");
const skills     = sections.find(s => s.id === "skills");
const education  = sections.find(s => s.id === "education");
const coding     = sections.find(s => s.id === "coding_profile");

// ── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: C.bg, color: C.text }}>
      <Navbar />
      <Hero />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationAndCoding />
      <ContactSection />
      <Footer />
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(250,250,248,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ fontWeight: 900, fontSize: 17, color: C.text, textDecoration: "none", letterSpacing: "-0.5px" }}>
          Divyansh<span style={{ color: C.purple }}>.</span>
        </a>
        <div style={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
          {["Experience", "Projects", "Skills", "Contact"].map(label => (
            <a key={label} href={`#${label.toLowerCase()}`}
              style={{ fontSize: 13, fontWeight: 500, color: C.muted, textDecoration: "none", padding: "6px 11px", borderRadius: 8, transition: "color 0.15s, background 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.color = C.purple; e.currentTarget.style.background = C.purpleLight; }}
              onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.background = "transparent"; }}
            >{label}</a>
          ))}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: C.green, background: C.greenLight, borderRadius: 999, padding: "4px 12px", marginLeft: 6, border: `1px solid #BBF7D0` }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, boxShadow: `0 0 6px ${C.green}` }} />
            Available
          </span>
        </div>
      </div>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ minHeight: "100vh", background: C.white, paddingTop: 58, display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px 64px", width: "100%" }}>

        {/* Top row: text + avatar */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center", justifyContent: "space-between" }}>

          {/* Left: text */}
          <div style={{ flex: "1 1 360px", minWidth: 0 }}>
            {/* Available badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.greenLight, border: `1px solid #BBF7D0`, borderRadius: 999, padding: "6px 16px", marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, boxShadow: `0 0 8px ${C.green}` }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: C.green }}>Open to opportunities · Available now</span>
            </div>

            <h1 style={{ fontSize: "clamp(42px, 6vw, 78px)", fontWeight: 900, lineHeight: 1.04, letterSpacing: "-2.5px", color: C.text, marginBottom: 14 }}>
              {hero.name.split(" ")[0]}<br />
              <span style={{ color: C.purple }}>{hero.name.split(" ")[1]}.</span>
            </h1>

            <p style={{ fontSize: "clamp(14px, 1.8vw, 18px)", fontWeight: 600, color: C.purpleMid, marginBottom: 16, letterSpacing: "-0.2px" }}>
              {hero.tagline}
            </p>

            <p style={{ fontSize: 15, lineHeight: 1.8, color: C.muted, maxWidth: 560, marginBottom: 36 }}>
              {about.blurb}
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
              <a href="#projects"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", borderRadius: 10, fontWeight: 700, fontSize: 14, background: C.purple, color: "#fff", textDecoration: "none", boxShadow: `0 4px 18px ${C.purple}44`, transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >View my projects</a>
              <a href={contact_me.channels.resume.url} download
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", borderRadius: 10, fontWeight: 600, fontSize: 14, background: "transparent", color: C.text, textDecoration: "none", border: `1.5px solid ${C.border}`, transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.purple; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}
              ><Download size={14} /> Download Resume</a>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
              <SocialLink href={`mailto:${hero.contact.email}`}   icon={<Mail size={14} />}    label={hero.contact.email} />
              <SocialLink href={hero.contact.linkedin}             icon={<Linkedin size={14} />} label="LinkedIn" external />
              <SocialLink href={`https://${hero.contact.github}`} icon={<Github size={14} />}   label="GitHub" external />
              <SocialLink href={`https://${hero.contact.leetcode}`} icon={<Code2 size={14} />}  label="LeetCode" external />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 18, color: C.mutedLight, fontSize: 13 }}>
              <MapPin size={13} />
              <span>{hero.location} · {hero.dob}</span>
            </div>
          </div>

          {/* Right: avatar */}
          <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Avatar3D src={hero.photo} name={hero.name} />
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginTop: 60, opacity: 0.35 }}>
          <span style={{ fontSize: 10, letterSpacing: "2.5px", textTransform: "uppercase", color: C.muted }}>scroll</span>
          <ArrowDown size={13} color={C.muted} />
        </div>
      </div>
    </section>
  );
}

function Avatar3D({ src, name }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov, setHov]   = useState(false);
  const ref = React.useRef(null);

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 14, y: dx * 14 });
  }

  function onLeave() { setTilt({ x: 0, y: 0 }); setHov(false); }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      style={{ perspective: 900, cursor: "none", userSelect: "none" }}
    >
      <div style={{
        position: "relative",
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hov ? "scale(1.04)" : "scale(1)"}`,
        transformStyle: "preserve-3d",
        transition: hov ? "transform 0.08s linear" : "transform 0.55s cubic-bezier(.23,1,.32,1)",
        willChange: "transform",
      }}>
        {/* Layered glow rings */}
        <div style={{
          position: "absolute", inset: -30,
          background: `radial-gradient(ellipse at 50% 60%, ${C.purple}30 0%, ${C.purpleLight}50 45%, transparent 72%)`,
          borderRadius: "50%",
          filter: "blur(10px)",
          zIndex: 0,
          transform: "translateZ(-40px)",
        }} />
        <div style={{
          position: "absolute", inset: -10,
          borderRadius: 36,
          background: `linear-gradient(135deg, ${C.purple}22 0%, transparent 60%)`,
          border: `1.5px solid ${C.purple}44`,
          transform: "translateZ(-20px)",
          zIndex: 0,
        }} />

        {/* Image */}
        <img
          src={src}
          alt={name}
          draggable={false}
          style={{
            position: "relative",
            zIndex: 1,
            display: "block",
            width: 340,
            height: 380,
            borderRadius: 28,
            objectFit: "cover",
            objectPosition: "top center",
            border: `2px solid ${C.purple}55`,
            boxShadow: `
              0 4px 0   ${C.purple}dd,
              0 10px 0  ${C.purple}99,
              0 18px 0  ${C.purple}55,
              0 28px 0  ${C.purple}22,
              0 40px 60px ${C.purple}44,
              0 2px 20px rgba(0,0,0,0.12)
            `,
            transform: "translateZ(20px)",
          }}
        />

        {/* Shine overlay on hover */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: 28,
          background: `linear-gradient(135deg, rgba(255,255,255,${hov ? 0.14 : 0}) 0%, transparent 55%)`,
          zIndex: 2,
          transition: "background 0.3s",
          transform: "translateZ(22px)",
          pointerEvents: "none",
        }} />

        {/* Bottom shadow plane */}
        <div style={{
          position: "absolute",
          bottom: -22,
          left: "10%",
          right: "10%",
          height: 24,
          background: `${C.purple}33`,
          borderRadius: "50%",
          filter: "blur(12px)",
          zIndex: 0,
          transform: `translateZ(-30px) scaleX(${hov ? 1.1 : 1})`,
          transition: "transform 0.4s ease",
        }} />
      </div>
    </div>
  );
}

function SocialLink({ href, icon, label, external }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
      style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 500, color: hov ? C.purple : C.muted, textDecoration: "none", transition: "color 0.15s" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      {icon} {label} {external && hov && <ExternalLink size={10} />}
    </a>
  );
}

// ── Section shell ─────────────────────────────────────────────────────────────
function Section({ id, bg, children }) {
  return (
    <section id={id} style={{ background: bg || C.bg, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        {children}
      </div>
    </section>
  );
}

function SectionHeader({ tag, title }) {
  return (
    <div style={{ marginBottom: 52 }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.purple, marginBottom: 8 }}>{tag}</p>
      <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-1px", color: C.text, lineHeight: 1.1 }}>{title}</h2>
      <div style={{ width: 44, height: 3, background: C.purple, borderRadius: 99, marginTop: 14 }} />
    </div>
  );
}

// ── Experience ────────────────────────────────────────────────────────────────
function ExperienceSection() {
  return (
    <Section id="experience" bg={C.white}>
      <SectionHeader tag="Work Experience" title="Where I've worked" />
      {experience.items.map((item, i) => (
        <motion.div key={i}
          initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45 }}
          style={{ display: "flex", gap: 28, paddingBottom: 44 }}
        >
          {/* Spine */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 16, flexShrink: 0 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: C.purple, border: `3px solid ${C.purpleLight}`, flexShrink: 0, marginTop: 5 }} />
            {i < experience.items.length - 1 && <div style={{ flex: 1, width: 2, background: `linear-gradient(to bottom, ${C.purple}55, ${C.border})`, marginTop: 6 }} />}
          </div>
          {/* Content */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8, marginBottom: 12 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{item.role}</h3>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.purple, marginTop: 3 }}>{item.company}</p>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.muted, background: C.borderLight, padding: "4px 12px", borderRadius: 999, height: "fit-content" }}>{item.duration}</span>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {item.points.map((p, idx) => (
                <li key={idx} style={{ display: "flex", gap: 10, fontSize: 14, lineHeight: 1.7, color: C.textMid }}>
                  <CheckCircle2 size={15} color={C.purple} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            {item.tech_stack && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                {item.tech_stack.map(t => <span key={t} className="chip">{t}</span>)}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </Section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
function ProjectsSection() {
  return (
    <Section id="projects" bg={C.purpleDim}>
      <SectionHeader tag="Projects" title="Things I've built" />
      <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>
        {projects.items.map((item, i) => {
          const impact   = IMPACT[item.company];
          const liveLink = item.links?.find(l => l.icon === "globe");
          const ghLink   = item.links?.find(l => l.icon === "github");

          return (
            <motion.div key={i}
              initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.mutedLight, fontFamily: "JetBrains Mono, monospace" }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 800, color: C.text, letterSpacing: "-0.4px" }}>{item.company}</h3>
                  {liveLink && (
                    <a href={liveLink.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, color: C.purple, background: C.purpleLight, border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "4px 10px", textDecoration: "none" }}
                    ><Globe size={13} /> Live ↗</a>
                  )}
                  {ghLink && (
                    <a href={ghLink.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: C.muted, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 10px", textDecoration: "none" }}
                    ><Github size={13} /> GitHub</a>
                  )}
                </div>
                <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>{item.role} · {item.duration}</span>
              </div>

              {/* Purple rule */}
              <div style={{ height: 2, background: `linear-gradient(90deg, ${C.purple}, transparent)`, marginBottom: 28, borderRadius: 2 }} />

              {/* Bullets + impact — stack on mobile */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 32 }}>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14 }}>What I built</p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {item.points.map((p, idx) => (
                      <li key={idx} style={{ display: "flex", gap: 10, fontSize: 13.5, lineHeight: 1.65, color: C.textMid }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.purple, flexShrink: 0, marginTop: 8 }} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {impact && (
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, color: C.green, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14 }}>💥 Why it matters</p>
                    <div style={{ background: "linear-gradient(135deg, #F0FDF4, #DCFCE7)", borderLeft: `3px solid ${C.green}`, borderRadius: "0 12px 12px 0", padding: "18px 20px" }}>
                      <p style={{ fontSize: 14, lineHeight: 1.8, color: "#166534" }}>{impact}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tech chips */}
              {item.tech_stack && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 22 }}>
                  {item.tech_stack.map(t => <span key={t} className="chip">{t}</span>)}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
function SkillsSection() {
  return (
    <Section id="skills" bg={C.white}>
      <SectionHeader tag="Technical Skills" title="What I work with" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 36 }}>
        {skills.items.map((group, i) => (
          <motion.div key={i}
            initial={{ y: 14, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <p style={{ fontSize: 10, fontWeight: 700, color: C.purple, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>{group.group}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {group.list.map(skill => <span key={skill} className="chip-gray">{skill}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ── Education + Coding ────────────────────────────────────────────────────────
function EducationAndCoding() {
  return (
    <Section id="education" bg={C.bg}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))", gap: 64 }}>

        {/* Education */}
        <div>
          <SectionHeader tag="Education" title="Academic background" />
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {education.items.map((item, i) => (
              <motion.div key={i}
                initial={{ x: -16, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{ paddingLeft: 16, borderLeft: `3px solid ${i === 0 ? C.purple : C.border}` }}
              >
                <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{item.degree}</h3>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.purple, marginTop: 3 }}>{item.company}</p>
                <p style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{item.duration}</p>
                {item.highlights && (
                  <ul style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                    {item.highlights.map((h, idx) => (
                      <li key={idx} style={{ fontSize: 13, color: C.textMid, display: "flex", gap: 6 }}>
                        <span style={{ color: C.purple }}>·</span> {h}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Coding */}
        <div>
          <SectionHeader tag="Competitive Programming" title="Problem solving" />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {coding.items.map((item, i) => (
              <div key={i}>
                {item.points.map((p, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                    <Trophy size={16} color={C.purple} style={{ flexShrink: 0, marginTop: 3 }} />
                    <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65 }}>{p}</p>
                  </div>
                ))}
                {item.links && (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                    {item.links.map((link, idx) => (
                      <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: C.purple, background: C.purpleLight, border: `1px solid ${C.purple}33`, borderRadius: 8, padding: "6px 14px", textDecoration: "none" }}
                      ><ExternalLink size={12} /> {link.label}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function ContactSection() {
  const [name,   setName]   = useState("");
  const [email,  setEmail]  = useState("");
  const [msg,    setMsg]    = useState("");
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: msg }),
      });
      const json = await res.json();
      if (json.ok) { setStatus("sent"); setMsg(""); setName(""); setEmail(""); }
      else setStatus("error");
    } catch { setStatus("error"); }
  }

  const inp = {
    display: "block", width: "100%",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 10, padding: "11px 16px", fontSize: 14,
    color: "#fff", fontFamily: "inherit", outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <section id="contact" style={{ background: "#0F0A1E", borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 64 }}>

          {/* Left */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a78bfa", marginBottom: 10 }}>Get in touch</p>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", marginBottom: 14, lineHeight: 1.1 }}>
              Let's build something<br /><span style={{ color: C.purpleMid }}>together.</span>
            </h2>
            <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.75, marginBottom: 36 }}>{contact_me.subtitle}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: <Mail size={16} />,          label: "Email",     value: hero.contact.email,                    href: `mailto:${hero.contact.email}` },
                { icon: <MessageCircle size={16} />, label: "WhatsApp",  value: contact_me.channels.whatsapp.number,   href: contact_me.channels.whatsapp.link, external: true },
                { icon: <SendHorizonal size={16} />, label: "Telegram",  value: contact_me.channels.telegram.username, href: contact_me.channels.telegram.link, external: true },
                { icon: <Linkedin size={16} />,      label: "LinkedIn",  value: "ivyansingh",                          href: hero.contact.linkedin, external: true },
              ].map(ch => <ContactChannel key={ch.label} {...ch} />)}
            </div>

            <a href={contact_me.channels.resume.url} download
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 28, fontSize: 13, fontWeight: 600, color: "#fff", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 10, padding: "10px 20px", textDecoration: "none", background: "rgba(255,255,255,0.06)", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
            ><Download size={14} /> Download Resume PDF</a>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", display: "block", marginBottom: 6 }}>Your name</label>
                <input style={inp} placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required
                  onFocus={e => { e.target.style.borderColor = C.purple; e.target.style.boxShadow = `0 0 0 3px ${C.purple}33`; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.14)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", display: "block", marginBottom: 6 }}>Your email</label>
                <input style={inp} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required
                  onFocus={e => { e.target.style.borderColor = C.purple; e.target.style.boxShadow = `0 0 0 3px ${C.purple}33`; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.14)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", display: "block", marginBottom: 6 }}>Message</label>
              <textarea style={{ ...inp, minHeight: 130, resize: "vertical" }} placeholder="Hi Divyansh, I'd love to connect about…" value={msg} onChange={e => setMsg(e.target.value)} required
                onFocus={e => { e.target.style.borderColor = C.purple; e.target.style.boxShadow = `0 0 0 3px ${C.purple}33`; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.14)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <button type="submit" disabled={status === "sending" || status === "sent"}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 14, background: status === "sent" ? C.green : C.purple, color: "#fff", border: "none", cursor: "pointer", fontFamily: "inherit", boxShadow: `0 4px 20px ${C.purple}44`, opacity: status === "sending" ? 0.7 : 1, transition: "opacity 0.2s, background 0.3s", alignSelf: "flex-start" }}
            >
              <Send size={14} />
              {status === "sent" ? "Sent ✔" : status === "error" ? "Failed — try again" : status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "error" && <p style={{ fontSize: 12, color: "#FCA5A5" }}>Something went wrong. Try again or email directly.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactChannel({ icon, label, value, href, external }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
      style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: hov ? C.purple : "rgba(255,255,255,0.07)", color: hov ? "#fff" : "#6B7280", border: "1px solid rgba(255,255,255,0.1)", transition: "background 0.2s, color 0.2s", flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: "#4B5563", textTransform: "uppercase", letterSpacing: "1px" }}>{label}</p>
        <p style={{ fontSize: 13, fontWeight: 500, color: hov ? "#a78bfa" : "#D1D5DB", marginTop: 1, transition: "color 0.15s" }}>{value}</p>
      </div>
    </a>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#07030F", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "20px 24px", textAlign: "center" }}>
      <p style={{ fontSize: 12, color: "#4B5563" }}>
        © 2026 Divyansh Singh · Built with React & Framer Motion ·{" "}
        <a href={`mailto:${hero.contact.email}`} style={{ color: C.purple, textDecoration: "none" }}>{hero.contact.email}</a>
      </p>
    </footer>
  );
}
