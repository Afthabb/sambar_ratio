import { useNavigate, type LinkProps } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const MESSAGES = [
  "Preparing the lab...",
  "Heating sambar...",
  "Checking consistency...",
  "Consulting the rice...",
  "Calculating unnecessary quantities...",
] as const;

const DURATION_MS = 2200;
const MESSAGE_INTERVAL = DURATION_MS / MESSAGES.length;

interface LabLoadingProps {
  navigateTo: NonNullable<LinkProps["to"]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  search?: Record<string, any>;
}

export function LabLoading({ navigateTo, search }: LabLoadingProps) {

  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  // Cycle through messages
  useEffect(() => {
    if (msgIndex >= MESSAGES.length - 1) return;
    const t = window.setTimeout(() => setMsgIndex((i) => i + 1), MESSAGE_INTERVAL);
    return () => window.clearTimeout(t);
  }, [msgIndex]);

  // Animate progress bar smoothly via rAF
  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / DURATION_MS) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Navigate after duration, with exit animation
  useEffect(() => {
    const t = window.setTimeout(() => {
      setExiting(true);
      window.setTimeout(() => {
        // @ts-expect-error – search shape varies per route; TanStack Router validates it
        navigate({ to: navigateTo, search });
      }, 350);
    }, DURATION_MS);
    return () => window.clearTimeout(t);
  }, [navigate, navigateTo, search]);

  return (
    <div
      className={`lab-loading-overlay${exiting ? " lab-loading-exit" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="lab-loading-card">
        {/* ── Sambar bowl SVG animation ── */}
        <div className="sambar-scene" aria-hidden="true">
          <svg
            className="sambar-bowl-svg"
            viewBox="0 0 160 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Bowl shadow */}
            <ellipse cx="82" cy="128" rx="52" ry="6" fill="rgba(90,55,20,0.13)" />
            {/* Bowl outer */}
            <path d="M26 72 Q28 120 82 122 Q136 120 138 72 Z" fill="#c8845a" />
            {/* Bowl rim */}
            <ellipse cx="82" cy="72" rx="56" ry="14" fill="#d9956b" />
            {/* Bowl inner */}
            <ellipse cx="82" cy="72" rx="50" ry="11" fill="#b8693e" />
            {/* Sambar liquid surface */}
            <ellipse className="sambar-liquid" cx="82" cy="72" rx="48" ry="10" fill="#c4470d" />
            {/* Sambar highlight */}
            <ellipse
              cx="70" cy="69" rx="14" ry="3.5"
              fill="rgba(255,180,80,0.22)"
              transform="rotate(-8 70 69)"
            />
            {/* Bubbles */}
            <circle className="bubble bubble-a" cx="72" cy="70" r="3.5" fill="#d9580f" />
            <circle className="bubble bubble-b" cx="90" cy="68" r="2.5" fill="#bf4a0b" />
            <circle className="bubble bubble-c" cx="82" cy="73" r="2"   fill="#d4550e" />
            <circle className="bubble bubble-d" cx="63" cy="71" r="2"   fill="#c94e0c" />
            <circle className="bubble bubble-e" cx="100" cy="70" r="3"  fill="#d05a10" />
            {/* Vegetables */}
            <ellipse className="veg veg-tomato"    cx="78" cy="67" rx="5" ry="3.5" fill="#e8311a" />
            <ellipse                                cx="78" cy="66" rx="3" ry="1.5" fill="rgba(255,120,90,0.45)" />
            <rect    className="veg veg-drumstick" x="91" y="64" width="10" height="4" rx="2" fill="#5a8c3a" />
            <ellipse className="veg veg-onion"     cx="66" cy="65" rx="4" ry="3" fill="#e8bfa0" />
            <ellipse className="veg veg-leaf"      cx="97" cy="68" rx="3" ry="1.5" fill="#3d7a25" transform="rotate(-20 97 68)" />
            {/* Steam */}
            <path className="steam steam-a" d="M68 56 Q65 48 68 40 Q71 32 68 24" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path className="steam steam-b" d="M82 52 Q79 44 82 36 Q85 28 82 20" stroke="rgba(255,255,255,0.45)" strokeWidth="2"   strokeLinecap="round" fill="none" />
            <path className="steam steam-c" d="M96 55 Q99 47 96 39 Q93 31 96 23" stroke="rgba(255,255,255,0.4)"  strokeWidth="2"   strokeLinecap="round" fill="none" />
          </svg>

          {/* Spoon */}
          <svg className="sambar-spoon" viewBox="0 0 28 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="14" cy="14" rx="10" ry="12" fill="#e8c89a" />
            <ellipse cx="14" cy="14" rx="7"  ry="9"  fill="#c9a06a" />
            <rect    x="12.5" y="24" width="3" height="58" rx="1.5" fill="#d4aa7a" />
          </svg>
        </div>

        {/* ── Cycling messages ── */}
        <div className="loading-messages" aria-live="polite">
          {MESSAGES.map((msg, i) => (
            <span
              key={msg}
              className={`loading-message${i === msgIndex ? " loading-message-active" : ""}`}
            >
              {msg}
            </span>
          ))}
        </div>

        {/* ── Progress bar ── */}
        <div
          className="loading-progress-track"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="loading-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

export const SambarBoilingLoader = LabLoading;
