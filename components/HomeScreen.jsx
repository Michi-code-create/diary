"use client";

import { useState, useMemo } from "react";
import { PenLine, Search, Flame, BookOpen } from "lucide-react";
import { COLORS, TYPE_META, EMOTION_KEYS, EMOTION_META } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { ScreenHeader, TypeIconBadge, EmptyState } from "./ui";

function EntryCard({ entry }) {
  const meta = TYPE_META[entry.mainTypeUsed];
  const topEmotion = EMOTION_KEYS.reduce((best, k) => (entry.emotions?.[k] > (entry.emotions?.[best] || 0) ? k : best), null);
  return (
    <div
      className="p-4 rounded-2xl mb-3"
      style={{ background: "#fff", border: `1px solid ${COLORS.line}`, boxShadow: "0 2px 10px rgba(43,38,64,0.04)" }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold" style={{ color: COLORS.inkSoft }}>{formatDate(entry.date)}</span>
        <div className="flex items-center gap-1.5">
          {entry.emojis && entry.emojis.length > 0 && <span className="text-sm">{entry.emojis.slice(0, 3).join(" ")}</span>}
          {topEmotion && entry.emotions[topEmotion] > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${EMOTION_META[topEmotion].color}22`, color: EMOTION_META[topEmotion].color }}>
              {EMOTION_META[topEmotion].label}
            </span>
          )}
        </div>
      </div>
      {entry.text && (
        <p className="text-sm leading-relaxed" style={{ color: COLORS.ink, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {entry.text}
        </p>
      )}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {entry.tags.map((t) => (
            <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: COLORS.paperDeep, color: COLORS.inkSoft }}>#{t}</span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-1 mt-2">
        <TypeIconBadge typeKey={entry.mainTypeUsed} size={18} />
        <span className="text-[10px] font-bold" style={{ color: meta.color }}>{meta.name}</span>
      </div>
    </div>
  );
}

export function HomeScreen({ profile, entries, streak, level, setView }) {
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState(null);
  const meta = TYPE_META[profile.mainType];
  const allTags = useMemo(() => Array.from(new Set(entries.flatMap((e) => e.tags || []))), [entries]);

  const filtered = useMemo(() => {
    return entries
      .filter((e) => (tagFilter ? (e.tags || []).includes(tagFilter) : true))
      .filter((e) => (query ? (e.text || "").includes(query) : true))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [entries, tagFilter, query]);

  return (
    <div className="pb-10">
      <ScreenHeader
        title={streak > 0 ? `${streak}日連続で記録中！` : "今日もはじめよう"}
        subtitle={meta.name}
      />
      <div className="px-5">
        <button
          onClick={() => setView("write")}
          className="diary-press w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 mb-6"
          style={{ background: meta.color }}
        >
          <PenLine size={18} /> 今日の記録を書く
        </button>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="rounded-2xl py-3 text-center" style={{ background: COLORS.paperDeep }}>
            <p className="text-lg font-bold" style={{ color: COLORS.ink }}>{entries.length}</p>
            <p className="text-[10px] font-bold" style={{ color: COLORS.inkSoft }}>総記録数</p>
          </div>
          <div className="rounded-2xl py-3 text-center" style={{ background: COLORS.paperDeep }}>
            <p className="text-lg font-bold flex items-center justify-center gap-0.5" style={{ color: "#FF7A59" }}>
              <Flame size={15} /> {streak}
            </p>
            <p className="text-[10px] font-bold" style={{ color: COLORS.inkSoft }}>連続日数</p>
          </div>
          <div className="rounded-2xl py-3 text-center" style={{ background: COLORS.paperDeep }}>
            <p className="text-lg font-bold" style={{ color: COLORS.ink }}>Lv.{level}</p>
            <p className="text-[10px] font-bold" style={{ color: COLORS.inkSoft }}>成長度</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3 px-3.5 py-2.5 rounded-2xl" style={{ background: "#fff", border: `1px solid ${COLORS.line}` }}>
          <Search size={15} style={{ color: COLORS.inkSoft }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="日記を検索"
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: COLORS.ink }}
          />
        </div>
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setTagFilter(null)}
              className="diary-press px-3 py-1.5 rounded-full text-xs font-bold"
              style={!tagFilter ? { background: COLORS.ink, color: "#fff" } : { background: COLORS.paperDeep, color: COLORS.inkSoft }}
            >
              すべて
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setTagFilter(t === tagFilter ? null : t)}
                className="diary-press px-3 py-1.5 rounded-full text-xs font-bold"
                style={tagFilter === t ? { background: COLORS.ink, color: "#fff" } : { background: COLORS.paperDeep, color: COLORS.inkSoft }}
              >
                #{t}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <EmptyState icon={BookOpen} title="まだ記録がありません" body="最初の一行から、はじめてみましょう。" />
        ) : (
          filtered.map((e) => <EntryCard key={e.id} entry={e} />)
        )}
      </div>
    </div>
  );
}
