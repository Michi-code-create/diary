"use client";

import { useState } from "react";
import { COLORS, TYPE_META } from "@/lib/constants";
import { analyzeEmotions, todayStr } from "@/lib/utils";
import { ConfettiBurst, ScreenHeader, TypeIconBadge } from "./ui";
import { FORM_BY_TYPE, TagPicker } from "./WriteForms";

export function WriteScreen({ profile, entries, onEntrySaved }) {
  const [celebrate, setCelebrate] = useState(false);
  const [allTags, setAllTags] = useState(() => Array.from(new Set(entries.flatMap((e) => e.tags || []))));
  const [selectedTags, setSelectedTags] = useState([]);
  const meta = TYPE_META[profile.mainType];
  const Form = FORM_BY_TYPE[profile.mainType];
  const modules = profile.modules || [];
  const availableModules = modules.filter((m) => m !== profile.mainType);

  function handleSave(payload) {
    const entry = {
      id: `e_${Date.now()}`,
      date: todayStr(0),
      createdAt: new Date().toISOString(),
      mainTypeUsed: profile.mainType,
      tags: selectedTags,
      emotions: analyzeEmotions(payload.text || ""),
      ...payload,
    };
    onEntrySaved(entry);
    setCelebrate(true);
    setSelectedTags([]);
    setTimeout(() => setCelebrate(false), 1600);
  }

  if (celebrate) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center px-8 py-16 text-center relative">
        <ConfettiBurst active={true} />
        <div className="text-6xl mb-4 diary-pop-in">🎉</div>
        <h2 className="text-xl font-bold diary-pop-in" style={{ color: COLORS.ink }}>今日の記録、保存しました！</h2>
        <p className="text-sm mt-1" style={{ color: COLORS.inkSoft }}>また明日も、待ってます。</p>
      </div>
    );
  }

  return (
    <div className="px-5 pb-10">
      <ScreenHeader
        title="日記を書く"
        subtitle={meta.name}
        right={<TypeIconBadge typeKey={profile.mainType} />}
      />
      <div className="mt-2">
        <Form color={meta.color} onSave={handleSave} modules={availableModules} />
        <div className="mt-6">
          <p className="text-xs font-bold mb-2" style={{ color: COLORS.inkSoft }}>タグをつける（任意）</p>
          <TagPicker
            allTags={allTags}
            selected={selectedTags}
            onToggle={(t) => setSelectedTags((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))}
            onAddTag={(t) => {
              if (!allTags.includes(t)) setAllTags((a) => [...a, t]);
              setSelectedTags((s) => (s.includes(t) ? s : [...s, t]));
            }}
          />
        </div>
      </div>
    </div>
  );
}
