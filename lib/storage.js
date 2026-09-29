// ブラウザの localStorage を使った永続化レイヤー。
// (Claudeのアーティファクト環境で使っていた window.storage の代わり)
// 将来、保存件数が増えて重くなってきたら、この4関数の中身だけを
// IndexedDB (idb パッケージなど) に差し替えれば、他のコードは変更不要です。

const STORAGE_KEYS = { profile: "diary:profile", entries: "diary:entries" };

export async function loadProfile() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.profile);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("loadProfile failed", e);
    return null;
  }
}

export async function saveProfile(profile) {
  if (typeof window === "undefined") return false;
  try {
    if (profile === null) {
      window.localStorage.removeItem(STORAGE_KEYS.profile);
    } else {
      window.localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
    }
    return true;
  } catch (e) {
    console.error("saveProfile failed", e);
    return false;
  }
}

export async function loadEntries() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.entries);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("loadEntries failed", e);
    return [];
  }
}

export async function saveEntries(entries) {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(STORAGE_KEYS.entries, JSON.stringify(entries));
    return true;
  } catch (e) {
    console.error("saveEntries failed", e);
    return false;
  }
}
