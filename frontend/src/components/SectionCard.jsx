import React from "react";
import { Code, Trophy } from "lucide-react";

export default function SectionCard({
  title,
  items,
  layout,
  accent,
  textPrimary,
  textSecondary,
  cardBg,
  cardBorder,
  glassBlur,
  hoverCard,
  accentUnderline,
}) {
  return (
    <div
      className={
        "rounded-2xl border p-6 shadow-xl transition-all " +
        (hoverCard === "lift-glow"
          ? "hover:-translate-y-0.5 hover:shadow-2xl"
          : "")
      }
      style={{
        background: cardBg,
        borderColor: cardBorder,
        backdropFilter: `blur(${glassBlur})`,
        boxShadow:
          hoverCard === "lift-glow"
            ? `0 30px 80px -10px ${accent}22`
            : undefined,
      }}
    >
      <h2
        className="text-sm font-semibold uppercase tracking-wide mb-4 flex w-fit"
        style={{ color: textPrimary }}
      >
        <span className="relative" style={{ color: textPrimary }}>
          {title}
          {accentUnderline && (
            <span
              className="absolute left-0 -bottom-1 h-[2px] w-full rounded"
              style={{
                background: accent,
                boxShadow: `0 0 12px ${accent}`,
              }}
            />
          )}
        </span>
      </h2>

      {layout === "chips" ? (
        <SkillGroups
          groups={items}
          accent={accent}
          textPrimary={textPrimary}
          textSecondary={textSecondary}
          cardBorder={cardBorder}
        />
      ) : Array.isArray(items) ? (
        items.map((item, i) => (
          <ItemBlock
            key={i}
            item={item}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            accent={accent}
            showDivider={i !== items.length - 1}
          />
        ))
      ) : null}
    </div>
  );
}

function ItemBlock({
  item,
  textPrimary,
  textSecondary,
  accent,
  showDivider = true,
}) {
  return (
    <div className="pb-4 last:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <div className="text-base font-medium" style={{ color: textPrimary }}>
          {item.role || item.degree}{" "}
          <span
            className="text-slate-400"
            style={{ color: textSecondary }}
          >
            {(item.company || item.college) && " · "}
            {item.company || item.college}
          </span>
        </div>
        <div
          className="text-xs font-mono text-slate-400"
          style={{ color: accent }}
        >
          {item.duration}
        </div>
      </div>

      {item.points && (
        <ul className="mt-2 text-sm leading-relaxed list-disc pl-5 space-y-1">
          {item.points.map((p, idx) => (
            <li
              key={idx}
              className="text-slate-300"
              style={{ color: textSecondary }}
            >
              <span style={{ color: textPrimary }}>{p}</span>
            </li>
          ))}
        </ul>
      )}

      {item.highlights && (
        <ul className="mt-2 text-sm leading-relaxed list-disc pl-5 space-y-1">
          {item.highlights.map((p, idx) => (
            <li
              key={idx}
              className="text-slate-300"
              style={{ color: textSecondary }}
            >
              <span style={{ color: textPrimary }}>{p}</span>
            </li>
          ))}
        </ul>
      )}

      {item.tech_stack && (
        <div className="flex flex-wrap gap-2 mt-3">
          {item.tech_stack.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-1 rounded-md border"
              style={{
                color: textPrimary,
                borderColor: accent + "55",
                backgroundColor: accent + "0d",
                boxShadow: `0 20px 40px -8px ${accent}33`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {item.links && (
        <div className="flex gap-2 mt-3">
          {item.links.map((link, idx) => {
            const IconComponent = link.icon === "code" ? Code : Trophy;
            return (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] px-3 py-2 rounded-lg border flex items-center gap-1 font-medium transition-all hover:-translate-y-0.5"
                style={{
                  color: textPrimary,
                  borderColor: accent + "55",
                  backgroundColor: accent + "0d",
                  boxShadow: `0 20px 40px -8px ${accent}33`,
                }}
              >
                <IconComponent size={14} />
                {link.label}
              </a>
            );
          })}
        </div>
      )}

      {showDivider && (
        <div className="mt-4 h-px bg-slate-700/30 w-full rounded-full" />
      )}
    </div>
  );
}

function SkillGroups({
  groups,
  accent,
  textPrimary,
  textSecondary,
  cardBorder,
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {groups.map((group, i) => (
        <div key={i}>
          <div
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: accent }}
          >
            {group.group}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {group.list.map((skill, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-1 rounded-lg border leading-none"
                style={{
                  color: textPrimary,
                  borderColor: cardBorder,
                  backgroundColor: "rgba(255,255,255,0.02)",
                  boxShadow: `0 20px 40px -8px ${accent}22`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
