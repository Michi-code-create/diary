"use client";

import { useState, useMemo } from "react";
import { BarChart3 } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { COLORS, EMOTION_KEYS, EMOTION_META } from "@/lib/constants";
import { todayStr } from "@/lib/utils";
import { ScreenHeader, EmptyState } from "./ui";

export function AnalysisScreen({ entries }) {
  const [range, setRange] = useState("week"); // week | month | year

  const totals = useMemo(() => {
    const t = {};
    EMOTION_KEYS.forEach((k) => (t[k] = 0));
    entries.forEach((e) => {
      EMOTION_KEYS.forEach((k) => (t[k] += e.emotions?.[k] || 0));
    });
    return t;
  }, [entries]);

  const totalCount = EMOTION_KEYS.reduce((s, k) => s + totals[k], 0);

  const pieData = EMOTION_KEYS.filter((k) => totals[k] > 0).map((k) => ({
    name: EMOTION_META[k].label,
    value: totals[k],
    color: EMOTION_META[k].color,
  }));

  const trendData = useMemo(() => {
    const days = range === "week" ? 7 : range === "month" ? 30 : 365;
    const buckets = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = todayStr(-i);
      buckets.push({ date, label: date.slice(5), score: 0 });
    }
    const byDate = {};
    entries.forEach((e) => {
      const sum = EMOTION_KEYS.reduce((s, k) => s + (e.emotions?.[k] || 0), 0);
      byDate[e.date] = (byDate[e.date] || 0) + sum;
    });
    buckets.forEach((b) => (b.score = byDate[b.date] || 0));
    if (range === "year") {
      const monthly = {};
      buckets.forEach((b) => {
        const m = b.date.slice(0, 7);
        monthly[m] = (monthly[m] || 0) + b.score;
      });
      return Object.keys(monthly).map((m) => ({ label: m.slice(5) + "月", score: monthly[m] }));
    }
    return buckets;
  }, [entries, range]);

  const avgScore = entries.length > 0 ? (totalCount / entries.length).toFixed(1) : "0.0";

  return (
    <div className="px-5 pb-10">
      <ScreenHeader title="感情の分析" subtitle="日記に含まれることばから、こころの傾向を見える化" />
      {entries.length === 0 ? (
        <EmptyState icon={BarChart3} title="分析するデータがまだありません" body="日記を書くと、感情の傾向がここに表示されます。" />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="rounded-2xl py-3 text-center" style={{ background: COLORS.paperDeep }}>
              <p className="text-lg font-bold" style={{ color: COLORS.ink }}>{avgScore}</p>
              <p className="text-[10px] font-bold" style={{ color: COLORS.inkSoft }}>平均感情スコア / 記録</p>
            </div>
            <div className="rounded-2xl py-3 text-center" style={{ background: COLORS.paperDeep }}>
              <p className="text-lg font-bold" style={{ color: COLORS.ink }}>{totalCount}</p>
              <p className="text-[10px] font-bold" style={{ color: COLORS.inkSoft }}>検出された感情語 合計</p>
            </div>
          </div>

          <p className="text-xs font-bold mb-2" style={{ color: COLORS.inkSoft }}>感情の内訳</p>
          {pieData.length === 0 ? (
            <p className="text-xs mb-6" style={{ color: COLORS.inkSoft }}>まだ感情語が検出されていません。</p>
          ) : (
            <div className="mb-2" style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {pieData.map((d, i) => (
                      <Cell key={i} fill={d.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-1 text-xs font-bold" style={{ color: COLORS.inkSoft }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /> {d.name}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold" style={{ color: COLORS.inkSoft }}>感情スコアの推移</p>
            <div className="flex gap-1 rounded-full p-0.5" style={{ background: COLORS.paperDeep }}>
              {[
                { k: "week", l: "週" },
                { k: "month", l: "月" },
                { k: "year", l: "年" },
              ].map((r) => (
                <button
                  key={r.k}
                  onClick={() => setRange(r.k)}
                  className="diary-press px-3 py-1 rounded-full text-[11px] font-bold"
                  style={range === r.k ? { background: "#fff", color: COLORS.ink, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" } : { color: COLORS.inkSoft }}
                >
                  {r.l}
                </button>
              ))}
            </div>
          </div>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid stroke={COLORS.line} vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: COLORS.inkSoft }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 10, fill: COLORS.inkSoft }} axisLine={false} tickLine={false} width={20} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#6C63FF" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
