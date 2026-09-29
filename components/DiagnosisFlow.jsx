"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ChevronLeft } from "lucide-react";
import { COLORS, TYPE_META, SUBTYPE_MATRIX, ALL_QUESTIONS, LIKERT_OPTIONS } from "@/lib/constants";
import { determineType } from "@/lib/utils";
import { ConfettiBurst } from "./ui";

export function DiagnosisFlow({ onComplete }) {
  const [step, setStep] = useState("intro"); // intro | quiz | result
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const total = ALL_QUESTIONS.length;
  const progress = Math.round((index / total) * 100);

  function handleAnswer(value) {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
    if (index + 1 < total) {
      setIndex(index + 1);
    } else {
      const r = determineType(next);
      setResult(r);
      setStep("result");
    }
  }

  function handleBack() {
    if (index > 0) setIndex(index - 1);
  }

  if (step === "intro") {
    return (
      <div className="min-h-full flex flex-col items-center justify-center px-8 py-14 text-center diary-pop-in">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5 diary-bounce" style={{ background: "#6C63FF1A" }}>
          <Sparkles size={34} style={{ color: "#6C63FF" }} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: COLORS.ink }}>あなたの日記タイプを見つけよう</h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: COLORS.inkSoft }}>
          {total}個の質問に答えると、あなたに合う書き方が見つかります。正解・不正解はありません。直感で選んでください。
        </p>
        <button
          onClick={() => setStep("quiz")}
          className="diary-press w-full max-w-xs py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-1.5"
          style={{ background: "#6C63FF" }}
        >
          診断をはじめる <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  if (step === "quiz") {
    const q = ALL_QUESTIONS[index];
    return (
      <div className="min-h-full flex flex-col px-6 py-6">
        <div className="flex items-center gap-3 mb-8">
          {index > 0 ? (
            <button onClick={handleBack} className="diary-press p-1.5 -ml-1.5 rounded-full" style={{ color: COLORS.inkSoft }}>
              <ChevronLeft size={20} />
            </button>
          ) : (
            <div className="w-7" />
          )}
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: COLORS.paperDeep }}>
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: "#6C63FF" }} />
          </div>
          <span className="text-xs font-bold w-10 text-right" style={{ color: COLORS.inkSoft }}>{index + 1}/{total}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            <p className="text-lg font-bold leading-relaxed mb-8" style={{ color: COLORS.ink }}>{q.text}</p>
            <div className="flex flex-col gap-3 mt-auto">
              {LIKERT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="diary-press text-left px-5 py-3.5 rounded-2xl font-medium text-sm"
                  style={{ background: COLORS.paperDeep, color: COLORS.ink, border: `1.5px solid ${COLORS.line}` }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // result
  const meta = TYPE_META[result.mainType];
  const sub = SUBTYPE_MATRIX[result.mainType][result.subtypeKey];
  const Icon = meta.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-full flex flex-col items-center justify-center px-8 py-14 text-center relative"
    >
      <ConfettiBurst active={true} />
      <p className="text-xs font-bold tracking-wide mb-2" style={{ color: meta.color }}>診断結果</p>
      <div
        className="w-24 h-24 rounded-3xl flex items-center justify-center mb-5"
        style={{ background: `${meta.color}1A`, color: meta.color }}
      >
        <Icon size={40} strokeWidth={2} />
      </div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: COLORS.ink }}>{sub.title}</h1>
      <p className="text-sm font-bold mb-4" style={{ color: meta.color }}>{meta.name}</p>
      <p className="text-sm leading-relaxed mb-8 max-w-xs" style={{ color: COLORS.inkSoft }}>{sub.desc}</p>
      <button
        onClick={() => onComplete(result)}
        className="diary-press w-full max-w-xs py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-1.5"
        style={{ background: meta.color }}
      >
        このタイプではじめる <ArrowRight size={18} />
      </button>
    </motion.div>
  );
}
