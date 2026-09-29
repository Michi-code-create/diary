"use client";

import { useState } from "react";
import { Download, Lock, Sparkles, Trash2 } from "lucide-react";
import { COLORS, REWARDS } from "@/lib/constants";
import { unlockedRewardIds, todayStr } from "@/lib/utils";
import { ScreenHeader } from "./ui";

export function SettingsScreen({ profile, entries, streak, onSetTheme, onReset }) {
  const [confirmingReset, setConfirmingReset] = useState(false);
  const unlocked = unlockedRewardIds(streak);

  function download(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function exportJSON() {
    download(`diary_export_${todayStr(0)}.json`, JSON.stringify(entries, null, 2), "application/json");
  }

  function exportTXT() {
    const text = entries
      .slice()
      .sort((a, b) => (a.date < b.date ? -1 : 1))
      .map((e) => `【${e.date}】\n${e.text || ""}\n${(e.tags || []).map((t) => "#" + t).join(" ")}\n`)
      .join("\n----------------\n\n");
    download(`diary_export_${todayStr(0)}.txt`, text, "text/plain");
  }

  return (
    <div className="px-5 pb-10">
      <ScreenHeader title="設定" />

      <p className="text-xs font-bold mb-2" style={{ color: COLORS.inkSoft }}>アンロック済みテーマ・機能</p>
      <div className="flex flex-col gap-2 mb-7">
        {REWARDS.map((r) => {
          const isUnlocked = unlocked.includes(r.id);
          const isActive = profile.theme === r.value;
          return (
            <div key={r.id} className="flex items-center justify-between p-3.5 rounded-2xl" style={{ background: "#fff", border: `1px solid ${COLORS.line}` }}>
              <div className="flex items-center gap-2.5">
                {isUnlocked ? (
                  r.type === "theme" ? (
                    <span className="w-6 h-6 rounded-full" style={{ background: r.value }} />
                  ) : (
                    <Sparkles size={18} style={{ color: "#6C63FF" }} />
                  )
                ) : (
                  <Lock size={16} style={{ color: "#C9C2DE" }} />
                )}
                <div>
                  <p className="text-xs font-bold" style={{ color: isUnlocked ? COLORS.ink : "#C9C2DE" }}>{r.label}</p>
                  <p className="text-[10px]" style={{ color: "#C9C2DE" }}>{r.days}日連続で解放</p>
                </div>
              </div>
              {isUnlocked && r.type === "theme" && (
                <button
                  onClick={() => onSetTheme(isActive ? null : r.value)}
                  className="diary-press text-[10px] font-bold px-3 py-1.5 rounded-full"
                  style={isActive ? { background: COLORS.ink, color: "#fff" } : { background: COLORS.paperDeep, color: COLORS.inkSoft }}
                >
                  {isActive ? "適用中" : "適用する"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs font-bold mb-2" style={{ color: COLORS.inkSoft }}>データの書き出し</p>
      <div className="flex gap-2 mb-7">
        <button onClick={exportJSON} className="diary-press flex-1 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5" style={{ background: COLORS.paperDeep, color: COLORS.ink }}>
          <Download size={14} /> JSONで書き出す
        </button>
        <button onClick={exportTXT} className="diary-press flex-1 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5" style={{ background: COLORS.paperDeep, color: COLORS.ink }}>
          <Download size={14} /> テキストで書き出す
        </button>
      </div>

      <div className="p-3.5 rounded-2xl mb-7 text-[11px] leading-relaxed" style={{ background: COLORS.paperDeep, color: COLORS.inkSoft }}>
        記録はこの画面のストレージ機能に保存されます。他の端末とは同期されません。書き出しておくと、他の場所にも保管できます。
      </div>

      <p className="text-xs font-bold mb-2" style={{ color: COLORS.inkSoft }}>データの管理</p>
      {!confirmingReset ? (
        <button
          onClick={() => setConfirmingReset(true)}
          className="diary-press w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5"
          style={{ background: "#E6395014", color: "#E63950" }}
        >
          <Trash2 size={14} /> すべての記録をリセット
        </button>
      ) : (
        <div className="p-4 rounded-2xl" style={{ background: "#E6395014" }}>
          <p className="text-xs font-bold mb-3" style={{ color: "#E63950" }}>本当にすべての記録・診断結果を削除しますか？この操作は取り消せません。</p>
          <div className="flex gap-2">
            <button onClick={() => setConfirmingReset(false)} className="diary-press flex-1 py-2.5 rounded-xl font-bold text-xs" style={{ background: "#fff", color: COLORS.inkSoft }}>
              やめる
            </button>
            <button onClick={onReset} className="diary-press flex-1 py-2.5 rounded-xl font-bold text-xs text-white" style={{ background: "#E63950" }}>
              削除する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
