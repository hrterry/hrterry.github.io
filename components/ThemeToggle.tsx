"use client";
import { useEffect, useState } from "react";

type Mode = "auto" | "light" | "dark";
const NEXT: Record<Mode, Mode> = { auto: "light", light: "dark", dark: "auto" };
const LABEL: Record<Mode, string> = { auto: "Theme: system", light: "Theme: light", dark: "Theme: dark" };

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("auto");
  useEffect(() => {
    try { const t = localStorage.getItem("theme"); if (t === "light" || t === "dark") setMode(t); } catch {}
  }, []);
  const apply = (m: Mode) => {
    setMode(m);
    const r = document.documentElement;
    if (m === "auto") r.removeAttribute("data-theme"); else r.setAttribute("data-theme", m);
    try { if (m === "auto") localStorage.removeItem("theme"); else localStorage.setItem("theme", m); } catch {}
    window.dispatchEvent(new Event("themechange"));
  };
  return (
    <button type="button" onClick={() => apply(NEXT[mode])} aria-label={LABEL[mode]} title={LABEL[mode]}
      className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink">
      {mode === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
      ) : mode === "light" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" /></svg>
      )}
    </button>
  );
}
