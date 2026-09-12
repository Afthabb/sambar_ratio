import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, FastForward, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/lab-ui";
import { sambarFor, type Consistency } from "@/lib/lab";

export const Route = createFileRoute("/chor/mixing")({
  validateSearch: (search: Record<string, unknown>) => ({
    rice: Number(search["rice"]) || 300,
    consistency: (search["consistency"] === "soggy" ? "soggy" : "perfect") as Consistency,
  }),
  head: () => ({
    meta: [
      { title: "CHOR / MIXING — Simulation | CHOR Mixing Lab" },
      { name: "description", content: "Watch the simulated precision sambar mixing sequence on Kerala rice." },
      { property: "og:title", content: "CHOR / MIXING — Simulation" },
      { property: "og:description", content: "Preparing your perfect mix." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChorMixingPage,
});

function ChorMixingPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const rice = search.rice;
  const consistency = search.consistency;
  const sambar = sambarFor(rice, consistency);

  // Total duration: 7200ms (7.2s)
  const TOTAL_DURATION = 7200;

  const [elapsed, setElapsed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isCompleted) return;

    const startTime = performance.now() - elapsed;
    let animFrame: number;

    const tick = (now: number) => {
      const current = Math.min(TOTAL_DURATION, now - startTime);
      setElapsed(current);

      if (current >= TOTAL_DURATION) {
        setIsCompleted(true);
      } else {
        animFrame = requestAnimationFrame(tick);
      }
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [isCompleted]);

  // Skip animation handler
  const handleSkip = () => {
    setElapsed(TOTAL_DURATION);
    setIsCompleted(true);
  };

  // Replay animation handler
  const handleReplay = () => {
    setElapsed(0);
    setIsCompleted(false);
  };

  // Status message calculation based on progress
  const progressPct = Math.min(100, Math.round((elapsed / TOTAL_DURATION) * 100));

  let statusMsg = "Adding rice...";
  let phaseText = "Preparing plate...";

  if (elapsed < 1100) {
    // Phase 1 (0 - 1.1s)
    phaseText = "Preparing plate...";
    statusMsg = "Preparing plate...";
  } else if (elapsed < 2400) {
    // Phase 2 (1.1s - 2.4s)
    phaseText = `Adding ${rice}g rice...`;
    statusMsg = "Adding rice...";
  } else if (elapsed < 3700) {
    // Phase 3 (2.4s - 3.7s)
    phaseText = `Preparing ${sambar}ml sambar...`;
    statusMsg = "Preparing sambar...";
  } else if (elapsed < 4900) {
    // Phase 4 (3.7s - 4.9s)
    phaseText = `Pouring ${sambar}ml sambar onto rice...`;
    statusMsg = "Pouring...";
  } else if (elapsed < 5800) {
    // Phase 5 (4.9s - 5.8s)
    phaseText = "Distributing sambar & vegetables...";
    statusMsg = "Distributing...";
  } else if (elapsed < 6600) {
    // Phase 6 early
    phaseText = "Checking sambar absorption...";
    statusMsg = "Checking absorption...";
  } else if (elapsed < 7200) {
    // Phase 6 mid
    phaseText = "Evaluating structural integrity...";
    statusMsg = "Evaluating structural integrity...";
  } else {
    // Completed
    phaseText = "Completed: Perfect culinary integration";
    statusMsg = "Mix complete.";
  }

  // Animation values derived smoothly from elapsed time (ms)
  // Rice Mound scale and opacity:
  const riceProgress = Math.min(1, Math.max(0, (elapsed - 1100) / 1300));
  const riceScale = 0.2 + riceProgress * 0.8;
  const riceOpacity = Math.min(1, riceProgress * 1.2);

  // Sambar Container translation:
  // Enters at 2400ms, tilts at 3700ms, leaves at 5000ms
  let potX = 390; // hidden off to the right
  let potY = 70;
  let potRot = 0;
  let potOpacity = 0;

  if (elapsed >= 2400 && elapsed < 5200) {
    potOpacity = 1;
    if (elapsed < 3400) {
      // entering smoothly
      const t = (elapsed - 2400) / 1000;
      potX = 390 - t * 130; // comes to 260
      potRot = 0;
    } else if (elapsed < 4800) {
      // pouring state (tilted)
      potX = 260;
      potRot = -42; // tilted toward the center plate
      potY = 55;
    } else {
      // exiting
      const t = (elapsed - 4800) / 400;
      potX = 260 + t * 140;
      potOpacity = 1 - t;
    }
  }

  // Pouring stream visible during pour phase:
  const isPouring = elapsed >= 3700 && elapsed < 4800;

  // Sambar spreading on rice:
  // Starts at 3800ms, expands up to 5800ms
  const sambarSpreadProgress = Math.min(1, Math.max(0, (elapsed - 3800) / 2000));
  // If soggy, sambar expands wider (rx 110, ry 68), if perfect (rx 78, ry 46)
  const targetRx = consistency === "soggy" ? 116 : 82;
  const targetRy = consistency === "soggy" ? 72 : 50;
  const currentSambarRx = targetRx * sambarSpreadProgress;
  const currentSambarRy = targetRy * sambarSpreadProgress;
  const sambarOpacity = Math.min(1, sambarSpreadProgress * 1.2);

  // Vegetables appear during spreading (phase 5: 4800ms+)
  const vegProgress = Math.min(1, Math.max(0, (elapsed - 4600) / 1200));
  const vegOpacity = vegProgress;
  const vegScale = 0.5 + vegProgress * 0.5;

  return (
    <PageShell backTo="/chor">
      <header className="flow-heading compact">
        <span className="eyebrow">CHOR / MIXING</span>
        <h1>Preparing your perfect mix.</h1>
      </header>

      <div className="mixing-simulation-layout">
        {/* ── Center Animated Food Preparation Scene ── */}
        <section
          className="simulation-stage-glass"
          aria-label="Interactive Food Preparation Stage"
        >
          {/* Stage Top Bar */}
          <div className="sim-stage-header">
            <div className="sim-stage-badge">
              <span className="sim-stage-badge-dot" />
              <span>LIVE MIX PROTOCOL</span>
            </div>
            <div className="sim-stage-badge">
              <span>{consistency === "perfect" ? "PERFECT 75% RATIO" : "SOGGY 125% RATIO"}</span>
            </div>
          </div>

          {/* SVG Food Preparation Plate Canvas */}
          <div className="sim-stage-center">
            <svg
              viewBox="0 0 500 440"
              className="plate-canvas-svg"
              aria-label="Top-down visual plate with animated falling rice, poured sambar, and vegetables"
            >
              <defs>
                {/* Ceramic Plate Shadow */}
                <radialGradient id="plateShadow" cx="50%" cy="50%" r="50%">
                  <stop offset="60%" stopColor="rgba(35, 20, 10, 0.16)" />
                  <stop offset="100%" stopColor="rgba(35, 20, 10, 0)" />
                </radialGradient>

                {/* Ceramic Plate Rim Gradient */}
                <linearGradient id="plateRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#f7f5f0" />
                  <stop offset="70%" stopColor="#ebe7de" />
                  <stop offset="100%" stopColor="#dcd6c8" />
                </linearGradient>

                {/* Inner Plate Basin */}
                <radialGradient id="plateBasin" cx="45%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#faf9f6" />
                  <stop offset="70%" stopColor="#eeebe2" />
                  <stop offset="100%" stopColor="#dfd9cd" />
                </radialGradient>

                {/* Rice Mound Texture Gradient */}
                <radialGradient id="riceMoundGrad" cx="48%" cy="42%" r="52%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="45%" stopColor="#faf8f2" />
                  <stop offset="85%" stopColor="#eee8dc" />
                  <stop offset="100%" stopColor="#dfd6c4" />
                </radialGradient>

                {/* Hot Sambar Broth Gradient */}
                <radialGradient id="sambarLiquidGrad" cx="48%" cy="45%" r="52%">
                  <stop offset="0%" stopColor="#ef5a18" />
                  <stop offset="45%" stopColor="#d94b0d" />
                  <stop offset="80%" stopColor="#b83b07" />
                  <stop offset="100%" stopColor="#912c05" />
                </radialGradient>

                {/* Sambar Container Gradient */}
                <linearGradient id="copperBowlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c87948" />
                  <stop offset="50%" stopColor="#9c4c23" />
                  <stop offset="100%" stopColor="#68290f" />
                </linearGradient>

                {/* Soft Steam Blur */}
                <filter id="simSteamBlur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>

              {/* ── Ambient Plate Dropshadow on Table ── */}
              <ellipse cx="250" cy="245" rx="195" ry="145" fill="url(#plateShadow)" />

              {/* ── Ceramic Plate Rim ── */}
              <ellipse
                cx="250"
                cy="235"
                rx="185"
                ry="135"
                fill="url(#plateRimGrad)"
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth="2"
              />

              {/* Ceramic Inner Ledge */}
              <ellipse
                cx="250"
                cy="235"
                rx="155"
                ry="112"
                fill="none"
                stroke="rgba(0, 0, 0, 0.06)"
                strokeWidth="1.5"
              />

              {/* ── Plate Basin Floor ── */}
              <ellipse cx="250" cy="236" rx="146" ry="105" fill="url(#plateBasin)" />

              {/* ── PHASE 1: Empty Plate Shimmer Ring ── */}
              {elapsed < 1100 && (
                <ellipse
                  cx="250"
                  cy="236"
                  rx="90"
                  ry="60"
                  fill="none"
                  stroke="rgba(200, 180, 150, 0.3)"
                  strokeDasharray="4 6"
                  className="animate-pulse"
                />
              )}

              {/* ── PHASE 2: Falling Rice Grains (Visible between 1100ms - 2600ms) ── */}
              {elapsed >= 1100 && elapsed < 2600 && (
                <g className="falling-rice-grains" opacity={1 - Math.max(0, (elapsed - 2200) / 400)}>
                  {/* Rain of rice grains */}
                  <rect x="230" y="80" width="3" height="7" rx="1.5" fill="#ffffff" stroke="#ddd6c4" strokeWidth="0.5" transform="rotate(12 230 80)" />
                  <rect x="265" y="60" width="3" height="7" rx="1.5" fill="#ffffff" stroke="#ddd6c4" strokeWidth="0.5" transform="rotate(-18 265 60)" />
                  <rect x="245" y="110" width="3" height="8" rx="1.5" fill="#ffffff" stroke="#ddd6c4" strokeWidth="0.5" transform="rotate(5 245 110)" />
                  <rect x="215" y="125" width="3.2" height="7.5" rx="1.6" fill="#fdfbf7" stroke="#ddd6c4" strokeWidth="0.5" transform="rotate(28 215 125)" />
                  <rect x="280" y="100" width="3" height="7" rx="1.5" fill="#ffffff" stroke="#ddd6c4" strokeWidth="0.5" transform="rotate(-24 280 100)" />
                  <rect x="250" y="140" width="3" height="7" rx="1.5" fill="#ffffff" stroke="#ddd6c4" strokeWidth="0.5" />
                  <rect x="225" y="160" width="3" height="8" rx="1.5" fill="#ffffff" stroke="#ddd6c4" strokeWidth="0.5" transform="rotate(-10 225 160)" />
                  <rect x="270" y="150" width="3.2" height="7.5" rx="1.6" fill="#ffffff" stroke="#ddd6c4" strokeWidth="0.5" transform="rotate(15 270 150)" />
                </g>
              )}

              {/* ── Rice Mound Base ── */}
              {riceProgress > 0 && (
                <g
                  transform={`translate(250, 235) scale(${riceScale}) translate(-250, -235)`}
                  opacity={riceOpacity}
                >
                  {/* Soft rice drop shadow on plate */}
                  <ellipse cx="250" cy="242" rx="98" ry="62" fill="rgba(60, 45, 30, 0.08)" filter="url(#simSteamBlur)" />

                  {/* Rice Mound Primary Layer */}
                  <ellipse cx="250" cy="232" rx="92" ry="58" fill="url(#riceMoundGrad)" />

                  {/* Rice upper dome highlight */}
                  <ellipse cx="248" cy="225" rx="72" ry="44" fill="#ffffff" opacity="0.65" />

                  {/* Individual rice grain details rendered across mound */}
                  <g opacity="0.55">
                    <rect x="220" y="215" width="2.5" height="6.5" rx="1.2" fill="#eae2d2" transform="rotate(25 220 215)" />
                    <rect x="240" y="208" width="2.5" height="7" rx="1.2" fill="#eae2d2" transform="rotate(-15 240 208)" />
                    <rect x="260" y="218" width="2.5" height="6.5" rx="1.2" fill="#eae2d2" transform="rotate(40 260 218)" />
                    <rect x="215" y="235" width="2.5" height="7" rx="1.2" fill="#eae2d2" transform="rotate(-30 215 235)" />
                    <rect x="275" y="232" width="2.5" height="6.5" rx="1.2" fill="#eae2d2" transform="rotate(10 275 232)" />
                    <rect x="245" y="242" width="2.5" height="7" rx="1.2" fill="#eae2d2" transform="rotate(80 245 242)" />
                    <rect x="235" y="225" width="2.5" height="6.5" rx="1.2" fill="#f5eedf" transform="rotate(-5 235 225)" />
                    <rect x="255" y="228" width="2.5" height="7" rx="1.2" fill="#f5eedf" transform="rotate(20 255 228)" />
                  </g>
                </g>
              )}

              {/* ── PHASE 4 & 5: Sambar Liquid Pool & Spreading ── */}
              {sambarSpreadProgress > 0 && (
                <g opacity={sambarOpacity}>
                  {/* Sambar pool outer wet margin */}
                  <ellipse
                    cx="250"
                    cy="234"
                    rx={currentSambarRx + 6}
                    ry={currentSambarRy + 4}
                    fill="rgba(180, 60, 10, 0.2)"
                    filter="url(#simSteamBlur)"
                  />

                  {/* Sambar pool main viscous body */}
                  <ellipse
                    cx="250"
                    cy="234"
                    rx={currentSambarRx}
                    ry={currentSambarRy}
                    fill="url(#sambarLiquidGrad)"
                  />

                  {/* Sambar glossy broth sheen */}
                  <ellipse
                    cx="244"
                    cy="228"
                    rx={Math.max(0, currentSambarRx * 0.55)}
                    ry={Math.max(0, currentSambarRy * 0.45)}
                    fill="rgba(255, 200, 100, 0.35)"
                  />
                </g>
              )}

              {/* ── PHASE 5 & 6: Visible Vegetables (Carrot, Tomato, Potato, Drumstick, Curry Leaves) ── */}
              {vegProgress > 0 && (
                <g
                  opacity={vegOpacity}
                  transform={`translate(250, 235) scale(${vegScale}) translate(-250, -235)`}
                >
                  {/* 1. Tomato chunk (Crimson soft wedge) */}
                  <g className="veg-tomato" transform="rotate(18 232 225)">
                    <ellipse cx="232" cy="225" rx="9" ry="6.5" fill="#d92a18" stroke="#a0180b" strokeWidth="0.8" />
                    <ellipse cx="231" cy="223" rx="5" ry="3" fill="#ff624a" opacity="0.6" />
                  </g>

                  {/* 2. Carrot slice (Bright orange circular disc) */}
                  <g className="veg-carrot" transform="rotate(-12 268 222)">
                    <circle cx="268" cy="222" r="8.5" fill="#f96615" stroke="#cc4c06" strokeWidth="1" />
                    <circle cx="268" cy="222" r="4" fill="#fb883f" opacity="0.65" />
                  </g>

                  {/* 3. Potato chunk (Warm pale golden-yellow cube) */}
                  <g className="veg-potato" transform="rotate(24 220 248)">
                    <rect x="214" y="242" width="13" height="11" rx="3" fill="#e8ba5d" stroke="#bf923b" strokeWidth="0.8" />
                    <rect x="216" y="244" width="8" height="5" rx="1.5" fill="#f8d689" opacity="0.6" />
                  </g>

                  {/* 4. Drumstick section (Green ribbed cylinder) */}
                  <g className="veg-drumstick" transform="rotate(-28 274 246)">
                    <rect x="264" y="241" width="20" height="9" rx="3.5" fill="#4d6f32" stroke="#31481e" strokeWidth="0.8" />
                    <line x1="267" y1="243" x2="280" y2="243" stroke="#719e48" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="267" y1="247" x2="280" y2="247" stroke="#364e22" strokeWidth="1.2" strokeLinecap="round" />
                  </g>

                  {/* 5. Aromatic Curry Leaves (Deep green pointed leaves) */}
                  <g className="veg-curryleaf" transform="rotate(42 248 212)">
                    <path
                      d="M 242 212 C 242 206, 252 205, 258 208 C 255 214, 248 216, 242 212 Z"
                      fill="#2e4e1a"
                      stroke="#46722a"
                      strokeWidth="0.6"
                    />
                    <path d="M 244 211 Q 250 209 256 208" stroke="#5d9239" strokeWidth="0.5" fill="none" />
                  </g>

                  {/* Tiny mustard seed tempering specks */}
                  <circle cx="236" cy="216" r="1.3" fill="#1f140e" />
                  <circle cx="258" cy="226" r="1.4" fill="#1f140e" />
                  <circle cx="242" cy="242" r="1.2" fill="#1f140e" />
                  <circle cx="262" cy="240" r="1.3" fill="#1f140e" />
                </g>
              )}

              {/* ── PHASE 4: Pouring Sambar Stream ── */}
              {isPouring && (
                <g className="pouring-stream">
                  {/* Thick golden-amber sambar cascade */}
                  <path
                    d="M 252 140 C 248 165, 246 195, 250 226"
                    fill="none"
                    stroke="#dc4e0e"
                    strokeWidth={consistency === "soggy" ? "12" : "8"}
                    strokeLinecap="round"
                  />
                  {/* Core highlight in cascade */}
                  <path
                    d="M 251 142 C 249 165, 247 195, 250 220"
                    fill="none"
                    stroke="#fca33d"
                    strokeWidth={consistency === "soggy" ? "5" : "3.5"}
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  {/* Small splash droplets */}
                  <circle cx="246" cy="222" r="2.5" fill="#fca33d" />
                  <circle cx="256" cy="224" r="2" fill="#e85814" />
                </g>
              )}

              {/* ── PHASE 3 & 4: Sambar Pouring Container (Copper / Brass Katori) ── */}
              {potOpacity > 0 && (
                <g
                  transform={`translate(${potX}, ${potY}) rotate(${potRot})`}
                  opacity={potOpacity}
                  className="sambar-pour-container"
                >
                  {/* Container drop shadow */}
                  <ellipse cx="0" cy="55" rx="36" ry="12" fill="rgba(35, 20, 10, 0.2)" filter="url(#simSteamBlur)" />

                  {/* Bowl body */}
                  <path
                    d="M -34 16 C -34 46, 34 46, 34 16 Z"
                    fill="url(#copperBowlGrad)"
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="1"
                  />

                  {/* Bowl rim */}
                  <ellipse cx="0" cy="16" rx="34" ry="11" fill="#c87948" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />

                  {/* Bowl inner hot sambar */}
                  <ellipse cx="0" cy="17" rx="30" ry="9" fill="url(#sambarLiquidGrad)" />

                  {/* Hot steam rising from container */}
                  <g filter="url(#simSteamBlur)" opacity="0.6">
                    <path d="M -8 10 Q -12 -5 -8 -20" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M 8 8 Q 12 -8 8 -22" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </g>
                </g>
              )}
            </svg>
          </div>

          {/* Bottom Phase Status Banner */}
          <div className="sim-phase-banner" role="status">
            <span>CURRENT STEP:</span>
            <strong>{phaseText}</strong>
          </div>
        </section>

        {/* ── Side Panel: Metrics, Status & Controls ── */}
        <aside className="simulation-side-panel" aria-label="Simulation Status and Metrics">
          <div className="sim-side-top">
            <span className="eyebrow">LABORATORY TELEMETRY</span>

            {/* Readout Metrics */}
            <div className="sim-data-grid">
              <div className="sim-data-row">
                <span className="sim-data-label">RICE</span>
                <strong className="sim-data-val">{rice} g</strong>
              </div>

              <div className="sim-data-row">
                <span className="sim-data-label">SAMBAR</span>
                <strong className="sim-data-val">{sambar} ml</strong>
              </div>

              <div className="sim-data-row">
                <span className="sim-data-label">TARGET</span>
                <span className="sim-data-val-target">{consistency}</span>
              </div>
            </div>

            {/* Progress Section */}
            <div className="sim-progress-block">
              <div className="sim-progress-header">
                <span>SIMULATION PROGRESS</span>
                <span>{progressPct}%</span>
              </div>

              <div className="status-track" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
                <i style={{ width: `${progressPct}%` }} />
              </div>

              {/* Changing Status Messages */}
              <div className="sim-status-message">
                <span>{statusMsg}</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions Block */}
          <div className="sim-actions-block">
            {isCompleted ? (
              <button
                type="button"
                className="continue-pill-button w-full"
                onClick={() =>
                  navigate({
                    to: "/chor/report",
                    search: { consistency, rice },
                  })
                }
                aria-label="View mixing report"
              >
                <span>VIEW REPORT</span>
                <ArrowRight />
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="skip-anim-btn"
                  onClick={handleSkip}
                  aria-label="Skip animation and complete mixing immediately"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>SKIP ANIMATION</span>
                </button>
              </div>
            )}

            {isCompleted && (
              <button
                type="button"
                className="skip-anim-btn"
                onClick={handleReplay}
                aria-label="Replay simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>REPLAY ANIMATION</span>
              </button>
            )}
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
