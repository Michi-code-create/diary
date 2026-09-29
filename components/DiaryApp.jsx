"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Loader2 } from "lucide-react";
import { COLORS, TYPE_META, REWARDS } from "@/lib/constants";
import { loadProfile, saveProfile, loadEntries, saveEntries } from "@/lib/storage";
import { calcStreak } from "@/lib/utils";
import { ConfettiBurst, TopBar, BottomNav } from "./ui";
import { DiagnosisFlow } from "./DiagnosisFlow";
import { HomeScreen } from "./HomeScreen";
import { WriteScreen } from "./WriteScreen";
import { AnalysisScreen } from "./AnalysisScreen";
import { TypesScreen } from "./TypesScreen";
import { SettingsScreen } from "./SettingsScreen";

export default function DiaryApp() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [entries, setEntries] = useState([]);
  const [view, setView] = useState("home");
  const [retaking, setRetaking] = useState(false);
  const [rewardPopup, setRewardPopup] = useState(null);
  const prevStreak = useRef(0);

  useEffect(() => {
    (async () => {
      const [p, e] = await Promise.all([loadProfile(), loadEntries()]);
      setProfile(p);
      setEntries(e || []);
      prevStreak.current = calcStreak(e || []);
      setLoading(false);
    })();
  }, []);

  const streak = useMemo(() => calcStreak(entries), [entries]);
  const level = Math.min(99, Math.floor(entries.length / 5) + 1);

  useEffect(() => {
    if (streak > prevStreak.current) {
      const newlyUnlocked = REWARDS.find((r) => r.days === streak);
      if (newlyUnlocked) {
        setRewardPopup(newlyUnlocked);
        setTimeout(() => setRewardPopup(null), 3200);
      }
    }
    prevStreak.current = streak;
  }, [streak]);

  async function handleDiagnosisComplete(result) {
    const newProfile = {
      mainType: result.mainType,
      subtypeKey: result.subtypeKey,
      completed: true,
      modules: [],
      theme: null,
      createdAt: new Date().toISOString(),
    };
    setProfile(newProfile);
    setRetaking(false);
    setView("home");
    await saveProfile(newProfile);
  }

  async function handleEntrySaved(entry) {
    const next = [...entries, entry];
    setEntries(next);
    await saveEntries(next);
  }

  async function handleChangeMainType(key) {
    const next = { ...profile, mainType: key };
    setProfile(next);
    await saveProfile(next);
  }

  async function handleToggleModule(key) {
    const mods = profile.modules || [];
    const next = { ...profile, modules: mods.includes(key) ? mods.filter((m) => m !== key) : [...mods, key] };
    setProfile(next);
    await saveProfile(next);
  }

  async function handleSetTheme(value) {
    const next = { ...profile, theme: value };
    setProfile(next);
    await saveProfile(next);
  }

  async function handleReset() {
    await saveEntries([]);
    await saveProfile(null);
    setEntries([]);
    setProfile(null);
    setView("home");
  }

  if (loading) {
    return (
      <div className="diary-app-root min-h-[600px] flex items-center justify-center" style={{ background: COLORS.paper }}>
        <Loader2 size={28} className="animate-spin" style={{ color: "#6C63FF" }} />
      </div>
    );
  }

  if (!profile || !profile.completed || retaking) {
    return (
      <div className="diary-app-root min-h-[600px]" style={{ background: COLORS.paper }}>
        <DiagnosisFlow onComplete={handleDiagnosisComplete} />
      </div>
    );
  }

  const accentColor = profile.theme || TYPE_META[profile.mainType].color;

  const screens = {
    home: <HomeScreen profile={profile} entries={entries} streak={streak} level={level} setView={setView} />,
    write: <WriteScreen profile={profile} entries={entries} onEntrySaved={handleEntrySaved} />,
    analysis: <AnalysisScreen entries={entries} />,
    types: (
      <TypesScreen
        profile={profile}
        onChangeMainType={handleChangeMainType}
        onToggleModule={handleToggleModule}
        onRetakeDiagnosis={() => setRetaking(true)}
      />
    ),
    settings: <SettingsScreen profile={profile} entries={entries} streak={streak} onSetTheme={handleSetTheme} onReset={handleReset} />,
  };

  return (
    <div className="diary-app-root min-h-[600px] max-w-md mx-auto flex flex-col relative" style={{ background: COLORS.paper }}>
      <GlobalStyle />
      {rewardPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-8" style={{ background: "rgba(43,38,64,0.45)" }}>
          <ConfettiBurst active={true} />
          <div className="diary-pop-in bg-white rounded-3xl p-6 text-center max-w-xs">
            <div className="text-4xl mb-2">🎁</div>
            <p className="text-xs font-bold mb-1" style={{ color: "#6C63FF" }}>{rewardPopup.days}日連続達成！新しい機能が解放されました</p>
            <p className="font-bold" style={{ color: COLORS.ink }}>{rewardPopup.label}</p>
          </div>
        </div>
      )}
      <TopBar streak={streak} level={level} accentColor={accentColor} />
      <div className="flex-1 overflow-y-auto diary-scroll">{screens[view]}</div>
      <BottomNav view={view} setView={setView} accentColor={accentColor} />
    </div>
  );
}
