"use client";

import { useState } from "react";
import { MessageCircle, Image as ImageIcon, Sparkles, Tag as TagIcon, Plus, Check } from "lucide-react";
import { COLORS, STAMP_EMOJIS, DIALOGUE_PROMPTS } from "@/lib/constants";

function ModuleHint({ modules, dialoguePrompt }) {
  if (!modules || modules.length === 0) return null;
  return (
    <div className="flex flex-col gap-2 mb-4">
      {modules.includes("dialogue") && (
        <div className="px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2" style={{ background: "#1FAFA61A", color: "#178077" }}>
          <MessageCircle size={14} className="shrink-0" /> 今日の質問: {dialoguePrompt}
        </div>
      )}
      {modules.includes("visual") && (
        <div className="px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2" style={{ background: "#FFB1001A", color: "#A66C00" }}>
          <ImageIcon size={14} className="shrink-0" /> 気分にあうスタンプも選んでみましょう
        </div>
      )}
      {modules.includes("encourage") && (
        <div className="px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2" style={{ background: "#6C63FF1A", color: "#4A41CC" }}>
          <Sparkles size={14} className="shrink-0" /> 書けた分だけで、もう十分です
        </div>
      )}
    </div>
  );
}

export function TagPicker({ allTags, selected, onToggle, onAddTag }) {
  const [draft, setDraft] = useState("");
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {allTags.map((t) => {
        const isOn = selected.includes(t);
        return (
          <button
            key={t}
            onClick={() => onToggle(t)}
            className="diary-press px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
            style={isOn ? { background: COLORS.ink, color: "#fff" } : { background: COLORS.paperDeep, color: COLORS.inkSoft }}
          >
            <TagIcon size={11} /> {t}
          </button>
        );
      })}
      <div className="flex items-center gap-1">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="新しいタグ"
          className="text-xs px-2.5 py-1.5 rounded-full outline-none w-20"
          style={{ background: COLORS.paperDeep, color: COLORS.ink }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && draft.trim()) {
              onAddTag(draft.trim());
              setDraft("");
            }
          }}
        />
        <button
          onClick={() => {
            if (draft.trim()) {
              onAddTag(draft.trim());
              setDraft("");
            }
          }}
          className="diary-press p-1.5 rounded-full"
          style={{ background: COLORS.paperDeep, color: COLORS.inkSoft }}
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}

function SaveButton({ onClick, color, disabled, label = "きょうの記録を保存" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="diary-press w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-1.5 mt-5 disabled:opacity-40"
      style={{ background: color }}
    >
      <Check size={18} /> {label}
    </button>
  );
}

function SpeedForm({ color, onSave, modules }) {
  const [stamp, setStamp] = useState(null);
  const [line, setLine] = useState("");
  return (
    <div>
      <ModuleHint modules={modules} dialoguePrompt={DIALOGUE_PROMPTS[0]} />
      <p className="text-xs font-bold mb-2" style={{ color: COLORS.inkSoft }}>今日の気分は？</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {STAMP_EMOJIS.slice(0, 8).map((e) => (
          <button
            key={e}
            onClick={() => setStamp(e)}
            className="diary-press text-2xl w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: stamp === e ? `${color}33` : COLORS.paperDeep, border: stamp === e ? `2px solid ${color}` : "2px solid transparent" }}
          >
            {e}
          </button>
        ))}
      </div>
      <input
        value={line}
        onChange={(e) => setLine(e.target.value)}
        placeholder="一言だけ、残しておく"
        maxLength={60}
        className="w-full px-4 py-3.5 rounded-2xl outline-none text-sm font-medium"
        style={{ background: COLORS.paperDeep, color: COLORS.ink }}
      />
      <SaveButton
        color={color}
        disabled={!stamp && !line.trim()}
        onClick={() => onSave({ text: `${stamp || ""} ${line}`.trim(), emojis: stamp ? [stamp] : [] })}
      />
    </div>
  );
}

function PerfectionForm({ color, onSave, modules }) {
  const [text, setText] = useState("");
  return (
    <div>
      <ModuleHint modules={modules} dialoguePrompt={DIALOGUE_PROMPTS[1]} />
      <div className="px-4 py-3 rounded-2xl mb-3 text-xs font-medium" style={{ background: `${color}14`, color: "#4A41CC" }}>
        採点はしません。書いた分だけ、まるごと今日の記録です。
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="一文字からで大丈夫です"
        rows={6}
        className="w-full px-4 py-3.5 rounded-2xl outline-none text-sm leading-relaxed resize-none"
        style={{ background: COLORS.paperDeep, color: COLORS.ink }}
      />
      {text.trim().length > 0 && (
        <p className="text-xs font-bold mt-2" style={{ color }}>{text.trim().length}文字、書けました。それで十分です。</p>
      )}
      <SaveButton color={color} disabled={!text.trim()} onClick={() => onSave({ text })} />
    </div>
  );
}

function DialogueForm({ color, onSave, modules }) {
  const [qi, setQi] = useState(0);
  const [answersArr, setAnswersArr] = useState(Array(DIALOGUE_PROMPTS.length).fill(""));
  const isLast = qi === DIALOGUE_PROMPTS.length - 1;

  function setAns(v) {
    const next = [...answersArr];
    next[qi] = v;
    setAnswersArr(next);
  }

  function compileText() {
    return DIALOGUE_PROMPTS.map((q, i) => (answersArr[i].trim() ? `Q. ${q}\nA. ${answersArr[i].trim()}` : null))
      .filter(Boolean)
      .join("\n\n");
  }

  return (
    <div>
      <ModuleHint modules={modules} dialoguePrompt={DIALOGUE_PROMPTS[(qi + 1) % DIALOGUE_PROMPTS.length]} />
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold" style={{ color: COLORS.inkSoft }}>質問 {qi + 1} / {DIALOGUE_PROMPTS.length}</p>
        <div className="flex gap-1">
          {DIALOGUE_PROMPTS.map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i <= qi ? color : COLORS.line }} />
          ))}
        </div>
      </div>
      <p className="font-bold text-base mb-3" style={{ color: COLORS.ink }}>{DIALOGUE_PROMPTS[qi]}</p>
      <textarea
        value={answersArr[qi]}
        onChange={(e) => setAns(e.target.value)}
        placeholder="思いつくまま書いてみましょう"
        rows={5}
        className="w-full px-4 py-3.5 rounded-2xl outline-none text-sm leading-relaxed resize-none"
        style={{ background: COLORS.paperDeep, color: COLORS.ink }}
      />
      <div className="flex gap-2 mt-4">
        {qi > 0 && (
          <button onClick={() => setQi(qi - 1)} className="diary-press px-4 py-3 rounded-2xl font-bold text-sm" style={{ background: COLORS.paperDeep, color: COLORS.inkSoft }}>
            戻る
          </button>
        )}
        {!isLast ? (
          <button onClick={() => setQi(qi + 1)} className="diary-press flex-1 py-3 rounded-2xl font-bold text-sm text-white" style={{ background: color }}>
            次の質問へ
          </button>
        ) : (
          <button
            onClick={() => onSave({ text: compileText(), qa: answersArr })}
            disabled={!answersArr.some((a) => a.trim())}
            className="diary-press flex-1 py-3 rounded-2xl font-bold text-sm text-white disabled:opacity-40 flex items-center justify-center gap-1.5"
            style={{ background: color }}
          >
            <Check size={16} /> 記録を保存
          </button>
        )}
      </div>
    </div>
  );
}

function EmotionForm({ color, onSave, modules }) {
  const [text, setText] = useState("");
  return (
    <div>
      <ModuleHint modules={modules} dialoguePrompt={DIALOGUE_PROMPTS[2]} />
      <p className="text-xs mb-3" style={{ color: COLORS.inkSoft }}>ここは、なんでも受け止める場所です。良いことも、そうでないことも。</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="今日感じたこと、思ったこと、ぜんぶ吐き出してみて"
        rows={9}
        className="w-full px-4 py-3.5 rounded-2xl outline-none text-sm leading-relaxed resize-none"
        style={{ background: COLORS.paperDeep, color: COLORS.ink }}
      />
      <SaveButton color={color} disabled={!text.trim()} onClick={() => onSave({ text })} />
    </div>
  );
}

function VisualForm({ color, onSave, modules }) {
  const [chosen, setChosen] = useState([]);
  const [caption, setCaption] = useState("");
  function toggle(e) {
    setChosen((c) => (c.includes(e) ? c.filter((x) => x !== e) : [...c, e]));
  }
  return (
    <div>
      <ModuleHint modules={modules} dialoguePrompt={DIALOGUE_PROMPTS[3]} />
      <p className="text-xs font-bold mb-2" style={{ color: COLORS.inkSoft }}>今日を表すスタンプを選んでください（複数可）</p>
      <div className="grid grid-cols-6 gap-2 mb-4">
        {STAMP_EMOJIS.map((e) => (
          <button
            key={e}
            onClick={() => toggle(e)}
            className="diary-press text-2xl aspect-square rounded-2xl flex items-center justify-center"
            style={{ background: chosen.includes(e) ? `${color}33` : COLORS.paperDeep, border: chosen.includes(e) ? `2px solid ${color}` : "2px solid transparent" }}
          >
            {e}
          </button>
        ))}
      </div>
      <input
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="添える一言（任意）"
        className="w-full px-4 py-3 rounded-2xl outline-none text-sm"
        style={{ background: COLORS.paperDeep, color: COLORS.ink }}
      />
      <SaveButton color={color} disabled={chosen.length === 0} onClick={() => onSave({ text: caption, emojis: chosen })} />
    </div>
  );
}

function GrowthForm({ color, onSave, modules }) {
  const [text, setText] = useState("");
  const stage = Math.min(4, Math.floor(text.trim().length / 12));
  const stageEmojis = ["🥚", "🐣", "🐥", "🐤", "🦜"];
  return (
    <div>
      <ModuleHint modules={modules} dialoguePrompt={DIALOGUE_PROMPTS[4]} />
      <div className="flex flex-col items-center mb-4">
        <div className="text-5xl diary-bounce mb-1">{stageEmojis[stage]}</div>
        <p className="text-xs font-bold" style={{ color }}>書くほど育ちます（Lv.{stage + 1}）</p>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="書きはじめると、相棒が育ちます"
        rows={5}
        className="w-full px-4 py-3.5 rounded-2xl outline-none text-sm leading-relaxed resize-none"
        style={{ background: COLORS.paperDeep, color: COLORS.ink }}
      />
      <SaveButton color={color} disabled={!text.trim()} onClick={() => onSave({ text, growthStage: stage })} />
    </div>
  );
}

export const FORM_BY_TYPE = {
  speed: SpeedForm,
  perfection: PerfectionForm,
  dialogue: DialogueForm,
  emotion: EmotionForm,
  visual: VisualForm,
  growth: GrowthForm,
};
