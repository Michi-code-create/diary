"use client";

import { useState } from "react";
import { Check, Plus, ChevronRight } from "lucide-react";
import { COLORS, TYPE_META, MAIN_TYPE_KEYS, SUBTYPE_MATRIX } from "@/lib/constants";
import { TypeIconBadge, ScreenHeader } from "./ui";

export function TypesScreen({ profile, onChangeMainType, onToggleModule, onRetakeDiagnosis }) {
  const [openType, setOpenType] = useState(profile.mainType);
  const currentSub = profile.subtypeKey;

  return (
    <div className="px-5 pb-10">
      <ScreenHeader title="24のタイプ" subtitle="いまのタイプはいつでも変更できます" />
      <div className="mb-6 p-4 rounded-2xl" style={{ background: `${TYPE_META[profile.mainType].color}14` }}>
        <p className="text-xs font-bold mb-1" style={{ color: TYPE_META[profile.mainType].color }}>いまのタイプ</p>
        <p className="font-bold" style={{ color: COLORS.ink }}>{SUBTYPE_MATRIX[profile.mainType][currentSub].title}</p>
        <button
          onClick={onRetakeDiagnosis}
          className="diary-press mt-2 text-xs font-bold underline"
          style={{ color: TYPE_META[profile.mainType].color }}
        >
          もう一度診断を受け直す
        </button>
      </div>

      <p className="text-xs font-bold mb-2" style={{ color: COLORS.inkSoft }}>拡張モジュール（他タイプの機能をトッピング）</p>
      <div className="flex flex-wrap gap-2 mb-7">
        {[
          { key: "dialogue", label: "問いかけヒント" },
          { key: "visual", label: "スタンプ表示" },
          { key: "encourage", label: "励ましメッセージ" },
        ].map((m) => {
          const on = (profile.modules || []).includes(m.key);
          return (
            <button
              key={m.key}
              onClick={() => onToggleModule(m.key)}
              className="diary-press px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5"
              style={on ? { background: COLORS.ink, color: "#fff" } : { background: "#fff", color: COLORS.inkSoft, border: `1px solid ${COLORS.line}` }}
            >
              {on ? <Check size={12} /> : <Plus size={12} />} {m.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        {MAIN_TYPE_KEYS.map((key) => {
          const meta = TYPE_META[key];
          const Icon = meta.icon;
          const isOpen = openType === key;
          const isCurrent = profile.mainType === key;
          return (
            <div key={key} className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: `1px solid ${COLORS.line}` }}>
              <button
                onClick={() => setOpenType(isOpen ? null : key)}
                className="w-full flex items-center gap-3 p-4 text-left diary-press"
              >
                <TypeIconBadge typeKey={key} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm" style={{ color: COLORS.ink }}>{meta.name}</p>
                    {isCurrent && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: meta.color, color: "#fff" }}>使用中</span>
                    )}
                  </div>
                  <p className="text-xs" style={{ color: COLORS.inkSoft }}>{meta.catch}</p>
                </div>
                <ChevronRight size={16} style={{ color: COLORS.inkSoft, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform .2s" }} />
              </button>
              {isOpen && (
                <div className="px-4 pb-4">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {["in_cau", "in_bold", "out_cau", "out_bold"].map((sk) => {
                      const s = SUBTYPE_MATRIX[key][sk];
                      const active = isCurrent && currentSub === sk;
                      return (
                        <div
                          key={sk}
                          className="p-2.5 rounded-xl"
                          style={{ background: active ? `${meta.color}1F` : COLORS.paperDeep, border: active ? `1.5px solid ${meta.color}` : "1.5px solid transparent" }}
                        >
                          <p className="text-[11px] font-bold mb-0.5" style={{ color: COLORS.ink }}>{s.title}</p>
                          <p className="text-[10px] leading-snug" style={{ color: COLORS.inkSoft }}>{s.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                  {!isCurrent && (
                    <button
                      onClick={() => onChangeMainType(key)}
                      className="diary-press w-full py-2.5 rounded-xl font-bold text-xs text-white"
                      style={{ background: meta.color }}
                    >
                      このタイプに切り替える
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
