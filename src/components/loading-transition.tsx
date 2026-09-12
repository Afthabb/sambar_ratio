import { useNavigate, type LinkProps } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export interface LoadingTransitionProps {
  to?: NonNullable<LinkProps["to"]>;
  search?: Record<string, unknown>;
  duration?: number; // duration in ms, default 2200ms (1.5 - 2.5s)
  onComplete?: () => void;
  isOpen?: boolean;
}

const defaultMessages = [
  "Preparing the lab...",
  "Heating sambar...",
  "Checking consistency...",
  "Consulting the rice...",
  "Calculating unnecessary quantities...",
];

export function SambarPotAnimation() {
  return (
    <div className="sambar-pot-wrap relative flex items-center justify-center select-none py-2">
      <svg
        viewBox="0 0 200 160"
        className="w-48 h-38 overflow-visible"
        aria-label="Animated bubbling sambar pot"
      >
        <defs>
          {/* Pot ceramic gradient */}
          <linearGradient id="potBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a292d" />
            <stop offset="50%" stopColor="#1c1b1f" />
            <stop offset="100%" stopColor="#111013" />
          </linearGradient>

          {/* Sambar broth radial gradient */}
          <radialGradient id="sambarBrothGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f37324" />
            <stop offset="45%" stopColor="#d95a18" />
            <stop offset="85%" stopColor="#b54310" />
            <stop offset="100%" stopColor="#8d320b" />
          </radialGradient>

          {/* Spoon metallic gradient */}
          <linearGradient id="spoonMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3f3f5" />
            <stop offset="40%" stopColor="#d2d2d6" />
            <stop offset="70%" stopColor="#a8a8ae" />
            <stop offset="100%" stopColor="#7a7a82" />
          </linearGradient>

          {/* Steam filter for soft ethereal vapor */}
          <filter id="steamSoftBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
        </defs>

        {/* Ambient table shadow under bowl and spoon */}
        <ellipse cx="88" cy="142" rx="54" ry="10" fill="rgba(35, 24, 15, 0.12)" filter="url(#steamSoftBlur)" />
        <ellipse cx="156" cy="138" rx="15" ry="5" fill="rgba(35, 24, 15, 0.08)" filter="url(#steamSoftBlur)" />

        {/* Pot outer ceramic body */}
        <path
          d="M 36 76 C 36 126, 64 140, 88 140 C 112 140, 140 126, 140 76 Z"
          fill="url(#potBodyGrad)"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
        />

        {/* Pot body highlight reflection */}
        <path
          d="M 44 86 C 44 118, 62 133, 80 135 C 64 130, 48 114, 48 88 Z"
          fill="rgba(255, 255, 255, 0.07)"
        />

        {/* Pot outer rim */}
        <ellipse cx="88" cy="76" rx="52" ry="16" fill="#242327" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1" />

        {/* Pot inner rim edge */}
        <ellipse cx="88" cy="77" rx="48" ry="14" fill="#141316" />

        {/* Hot Sambar broth pool */}
        <ellipse cx="88" cy="78" rx="46" ry="13" fill="url(#sambarBrothGrad)" className="sambar-surface" />

        {/* Floating vegetable: Drumstick cylinder piece */}
        <g className="veg-drumstick">
          <rect x="58" y="73" width="15" height="7" rx="2.5" fill="#4d6b34" transform="rotate(-8 65 76)" />
          <line x1="61" y1="74" x2="70" y2="73" stroke="#71964f" strokeWidth="1" strokeLinecap="round" />
          <line x1="61" y1="77" x2="70" y2="76" stroke="#364d23" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Floating vegetable: Diced Carrot chunk */}
        <g className="veg-carrot">
          <rect
            x="96"
            y="74"
            width="9"
            height="8"
            rx="2"
            fill="#ff6b29"
            stroke="#ffa066"
            strokeWidth="0.8"
            transform="rotate(14 100 78)"
          />
        </g>

        {/* Floating vegetable: Aromatic Curry Leaf */}
        <g className="veg-leaf">
          <path
            d="M 76 81 C 73 77, 81 75, 87 77 C 84 82, 79 84, 76 81 Z"
            fill="#385822"
            stroke="#5a803a"
            strokeWidth="0.5"
          />
        </g>

        {/* Floating spice specks (mustard seeds) */}
        <circle cx="70" cy="76" r="1" fill="#22160e" opacity="0.8" />
        <circle cx="86" cy="80" r="1.2" fill="#22160e" opacity="0.75" />
        <circle cx="106" cy="79" r="1" fill="#22160e" opacity="0.7" />

        {/* Simmering Bubbles */}
        {/* Bubble 1: Center-left */}
        <g className="sambar-bubble bubble-1">
          <circle cx="72" cy="77" r="4.2" fill="rgba(254, 215, 120, 0.45)" stroke="#fed778" strokeWidth="1" />
          <circle cx="70.8" cy="75.6" r="1" fill="#ffffff" opacity="0.9" />
        </g>

        {/* Bubble 2: Center-right */}
        <g className="sambar-bubble bubble-2">
          <circle cx="104" cy="76" r="3.6" fill="rgba(254, 215, 120, 0.45)" stroke="#fed778" strokeWidth="1" />
          <circle cx="103" cy="74.8" r="0.8" fill="#ffffff" opacity="0.9" />
        </g>

        {/* Bubble 3: Center-deep */}
        <g className="sambar-bubble bubble-3">
          <circle cx="88" cy="79" r="4.8" fill="rgba(254, 215, 120, 0.5)" stroke="#fed778" strokeWidth="1" />
          <circle cx="86.6" cy="77.4" r="1.1" fill="#ffffff" opacity="0.9" />
        </g>

        {/* Bubble 4: Small pop right */}
        <g className="sambar-bubble bubble-4">
          <circle cx="114" cy="78" r="2.8" fill="rgba(254, 215, 120, 0.4)" stroke="#fed778" strokeWidth="0.8" />
          <circle cx="113.2" cy="77.2" r="0.6" fill="#ffffff" opacity="0.85" />
        </g>

        {/* Subtle rising steam wisps */}
        <g className="steam-group" filter="url(#steamSoftBlur)">
          <path
            d="M 72 64 C 68 50, 76 38, 70 24 C 65 12, 73 2, 69 -8"
            className="steam-wisp steam-1"
            fill="none"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 90 60 C 95 48, 86 35, 92 20 C 97 7, 91 -4, 95 -14"
            className="steam-wisp steam-2"
            fill="none"
            stroke="rgba(255, 255, 255, 0.65)"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          <path
            d="M 108 64 C 104 52, 112 40, 106 25 C 102 12, 109 2, 105 -8"
            className="steam-wisp steam-3"
            fill="none"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* Spoon resting beside the pot */}
        <g className="sambar-spoon" transform="rotate(18 152 95)">
          {/* Spoon handle */}
          <path
            d="M 152 35 C 152 35, 150 78, 149 96 C 148 108, 147 114, 146 118 L 150 118 C 151 114, 152 108, 153 96 C 154 78, 156 35, 156 35 Z"
            fill="url(#spoonMetal)"
            stroke="rgba(0, 0, 0, 0.15)"
            strokeWidth="0.5"
          />
          {/* Spoon head/bowl */}
          <ellipse
            cx="148"
            cy="126"
            rx="8.5"
            ry="14.5"
            fill="url(#spoonMetal)"
            stroke="rgba(0, 0, 0, 0.18)"
            strokeWidth="0.6"
          />
          {/* Spoon concave inner highlight */}
          <ellipse
            cx="147.5"
            cy="126"
            rx="6.5"
            ry="11.5"
            fill="rgba(255, 255, 255, 0.28)"
          />
        </g>
      </svg>
    </div>
  );
}

export function LoadingTransition({
  to,
  search,
  duration = 2200,
  onComplete,
  isOpen = true,
}: LoadingTransitionProps) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const startTime = performance.now();
    let animationFrameId: number;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const updateProgress = (currentTime: number): void => {
      const elapsed = currentTime - startTime;
      const calculatedProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(calculatedProgress);

      if (calculatedProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Finished loading transition
        timeoutId = setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
          if (to) {
            // @ts-expect-error - polymorphic generic route navigate
            navigate({ to, search });
          }
        }, 120);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOpen, duration, to, search, onComplete, navigate]);

  if (!isOpen) return null;

  // Determine current active message based on progress percentage
  const messageIndex = Math.min(
    defaultMessages.length - 1,
    Math.floor((progress / 100) * defaultMessages.length)
  );
  const currentMessage = defaultMessages[messageIndex];

  return (
    <div
      className="loading-transition-portal fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Loading transition"
    >
      {/* Full-screen blurred food/backdrop layer */}
      <div className="site-wrap-backdrop fixed inset-0 pointer-events-none" />

      {/* Ambient background blur overlay */}
      <div className="fixed inset-0 bg-black/10 backdrop-blur-md pointer-events-none" />

      {/* Centered Small Premium Glass Card */}
      <div className="relative z-10 w-full max-w-[360px] sm:max-w-[410px] p-7 sm:p-9 rounded-[2.25rem] bg-[#fdfbf7]/80 backdrop-blur-2xl border border-white/90 shadow-[0_35px_90px_-15px_rgba(45,35,25,0.15),0_10px_30px_-5px_rgba(0,0,0,0.04)] text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
        {/* Outlined status pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/15 bg-white/50 backdrop-blur-sm text-[10px] font-bold tracking-widest text-neutral-800 uppercase mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse" />
          <span>LAB INITIALISATION</span>
        </div>

        {/* Animated Boiling Sambar Pot with visible veggies, steam & spoon */}
        <SambarPotAnimation />

        {/* Changing Message */}
        <div className="mt-4 min-h-[2.5rem] flex items-center justify-center">
          <h3
            key={currentMessage}
            className="text-base sm:text-lg font-extrabold tracking-tight text-neutral-900 transition-all duration-300 animate-in fade-in slide-in-from-bottom-1"
          >
            {currentMessage}
          </h3>
        </div>

        {/* Thin rounded progress bar */}
        <div className="w-full mt-5">
          <div className="h-1.5 w-full bg-neutral-900/10 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-neutral-950 rounded-full transition-all duration-75 ease-out shadow-xs"
              style={{ width: `${Math.round(progress)}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 text-[10px] font-bold tracking-wider text-neutral-500 uppercase">
            <span>Precision Mixing</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
