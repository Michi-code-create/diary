import { EMOTION_KEYS, EMOTION_DICTIONARY, MAIN_QUESTIONS, MAIN_TYPE_KEYS, SUB_QUESTIONS, REWARDS } from "./constants";

export function analyzeEmotions(text) {
  const counts = {};
  EMOTION_KEYS.forEach((k) => (counts[k] = 0));
  if (!text) return counts;
  EMOTION_KEYS.forEach((key) => {
    const words = EMOTION_DICTIONARY[key];
    words.forEach((w) => {
      const matches = text.split(w).length - 1;
      counts[key] += matches;
    });
  });
  return counts;
}

export function todayStr(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function calcStreak(entries) {
  if (!entries || entries.length === 0) return 0;
  const dateSet = new Set(entries.map((e) => e.date));
  let streak = 0;
  let cursor = dateSet.has(todayStr(0)) ? 0 : dateSet.has(todayStr(-1)) ? -1 : null;
  if (cursor === null) return 0;
  while (dateSet.has(todayStr(cursor))) {
    streak += 1;
    cursor -= 1;
  }
  return streak;
}

export function unlockedRewardIds(streak) {
  return REWARDS.filter((r) => streak >= r.days).map((r) => r.id);
}

export function determineType(answers) {
  const axisScores = { speed: 0, perfection: 0, dialogue: 0, emotion: 0, visual: 0, growth: 0 };
  MAIN_QUESTIONS.forEach((q, i) => {
    axisScores[q.axis] += answers[i] != null ? answers[i] : 0;
  });
  let mainType = MAIN_TYPE_KEYS[0];
  let best = -Infinity;
  MAIN_TYPE_KEYS.forEach((k) => {
    if (axisScores[k] > best) {
      best = axisScores[k];
      mainType = k;
    }
  });

  let eiScore = 0;
  let cbScore = 0;
  SUB_QUESTIONS.forEach((q, i) => {
    const val = answers[MAIN_QUESTIONS.length + i];
    const contribution = (val != null ? val - 1.5 : 0) * q.direction;
    if (q.axis === "ei") eiScore += contribution;
    else cbScore += contribution;
  });
  const ei = eiScore >= 0 ? "out" : "in";
  const cb = cbScore >= 0 ? "bold" : "cau";
  const subtypeKey = `${ei}_${cb}`;
  return { mainType, subtypeKey, axisScores };
}

export function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}
