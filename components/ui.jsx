"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Flame,
  Star,
  BookOpen,
  Home as HomeIcon,
  PenLine,
  BarChart3,
  Users,
  Settings as SettingsIcon,
} from "lucide-react";
import { COLORS, TYPE_META } from "@/lib/constants";

export function ConfettiBurst({ active }) {
  useEffect(() => {
    if (!active) return;
    confetti({
      particleCount: 90,
      spread: 70,
      startVelocity: 38,
      origin: { y: 0.3 },
      colors: [COLORS.coral, "#6C63FF", "#FFC947", "#1FAFA6", "#FF6FA8"],
      disableForReducedMotion: true,
    });
  }, [active]);
  return null;
}

export function TypeIconBadge({ typeKey, size = 40 }) {
  const meta = TYPE_META[typeKey];
  const Icon = meta.icon;
  return (
    <div
      className="flex items-center justify-center rounded-2xl shrink-0"
      style={{ width: size, height: size, background: `${meta.color}1A`, color: meta.color }}
    >
      <Icon size={Math.round(size * 0.5)} strokeWidth={2.2} />
    </div>
  );
}

export function ScreenHeader({ title, subtitle, right }) {
  return (
    <div className="px-5 pt-6 pb-3 flex items-start justify-between">
      <div>
        <h1 className="text-xl font-bold" style={{ color: COLORS.ink }}>{title}</h1>
        {subtitle && <p className="text-sm mt-0.5" style={{ color: COLORS.inkSoft }}>{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function TopBar({ streak, level, accentColor }) {
  return (
    <div
      className="sticky top-0 z-20 flex items-center justify-between px-5 py-3 backdrop-blur"
      style={{ background: `${COLORS.paper}E6`, borderBottom: `1px solid ${COLORS.line}` }}
    >
      <div className="flex items-center gap-1.5">
        <BookOpen size={20} style={{ color: accentColor }} />
        <span className="font-bold text-sm" style={{ color: COLORS.ink }}>ひびのかけら</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Flame size={16} className={streak > 0 ? "diary-bounce" : ""} style={{ color: streak > 0 ? "#FF7A59" : "#C9C2DE" }} />
          <span className="text-sm font-bold" style={{ color: COLORS.ink }}>{streak}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={16} style={{ color: "#FFC947" }} fill="#FFC947" />
          <span className="text-sm font-bold" style={{ color: COLORS.ink }}>Lv.{level}</span>
        </div>
      </div>
    </div>
  );
}

export function BottomNav({ view, setView, accentColor }) {
  const items = [
    { key: "home", label: "ホーム", Icon: HomeIcon },
    { key: "write", label: "日記作成", Icon: PenLine },
    { key: "analysis", label: "分析", Icon: BarChart3 },
    { key: "types", label: "タイプ", Icon: Users },
    { key: "settings", label: "設定", Icon: SettingsIcon },
  ];
  return (
    <div
      className="sticky bottom-0 z-20 flex items-stretch justify-between px-2 py-1.5"
      style={{ background: COLORS.paper, borderTop: `1px solid ${COLORS.line}` }}
    >
      {items.map(({ key, label, Icon }) => {
        const activeItem = view === key;
        return (
          <button
            key={key}
            onClick={() => setView(key)}
            className="diary-press flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-xl transition-colors"
            style={{ color: activeItem ? accentColor : "#B7AFD1" }}
          >
            <Icon size={20} strokeWidth={activeItem ? 2.5 : 2} />
            <span className="text-[10px] font-bold">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, body }) {
  return (
    <div className="flex flex-col items-center text-center px-8 py-10">
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ background: COLORS.paperDeep }}>
        <Icon size={24} style={{ color: COLORS.inkSoft }} />
      </div>
      <p className="font-bold text-sm mb-1" style={{ color: COLORS.ink }}>{title}</p>
      <p className="text-xs leading-relaxed" style={{ color: COLORS.inkSoft }}>{body}</p>
    </div>
  );
}
