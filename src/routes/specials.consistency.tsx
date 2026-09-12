import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/lab-ui";
import type { Consistency, Material } from "@/lib/lab";

const SPECIALS_CONSISTENCY_KEY = "cml_specials_consistency";
const SPECIALS_MATERIAL_KEY = "cml_specials_material";

export const Route = createFileRoute("/specials/consistency")({
  validateSearch: (search: Record<string, unknown>) => ({
    material: (typeof search["material"] === "string" ? search["material"] : "cement") as Material,
  }),
  head: () => ({
    meta: [
      { title: "SPECIALS / STEP 02 — Consistency Selection | CHOR Mixing Lab" },
      { name: "description", content: "Select your preferred material consistency: Perfect or Soggy." },
      { property: "og:title", content: "SPECIALS / STEP 02 — Consistency Selection" },
      { property: "og:description", content: "Because even cement has a preferred consistency." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpecialsConsistencyPage,
});

// Helper component rendering custom material pile visual based on selected material and consistency
function MaterialConsistencyVisual({
  material,
  consistency,
}: {
  material: Material;
  consistency: Consistency;
}) {
  const isPerfect = consistency === "perfect";

  // Palette according to material
  let primaryColor = "#a39d93";
  let darkColor = "#6e685f";
  let lightColor = "#d5cfc4";

  if (material === "tar") {
    primaryColor = "#252427";
    darkColor = "#121114";
    lightColor = "#444248";
  } else if (material === "sand") {
    primaryColor = "#e2c589";
    darkColor = "#ad8a4e";
    lightColor = "#fae8bd";
  } else if (material === "gravel") {
    primaryColor = "#888279";
    darkColor = "#524d45";
    lightColor = "#b8b2a7";
  } else if (material === "para-podi") {
    primaryColor = "#8e8980";
    darkColor = "#555047";
    lightColor = "#b5afa5";
  } else if (material === "mystery") {
    primaryColor = "#3a3447";
    darkColor = "#1a1622";
    lightColor = "#fca33d";
  }

  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`pileShadow_${consistency}_${material}`} cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="rgba(35, 20, 10, 0.16)" />
          <stop offset="100%" stopColor="rgba(35, 20, 10, 0)" />
        </radialGradient>
        <radialGradient id={`pileGrad_${consistency}_${material}`} cx="48%" cy="40%" r="55%">
          <stop offset="0%" stopColor={lightColor} />
          <stop offset="55%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={darkColor} />
        </radialGradient>
      </defs>

      {/* Surface Base Shadow */}
      <ellipse
        cx="180"
        cy={isPerfect ? "182" : "186"}
        rx={isPerfect ? "115" : "145"}
        ry={isPerfect ? "18" : "24"}
        fill={`url(#pileShadow_${consistency}_${material})`}
      />

      {isPerfect ? (
        /* PERFECT: Stable, compact material pile */
        <g>
          {/* Main steep compact cone/pyramid mound */}
          <path
            d="M 75 178 C 95 174, 135 78, 180 75 C 225 78, 265 174, 285 178 Z"
            fill={`url(#pileGrad_${consistency}_${material})`}
          />

          {/* Crest ridge highlight */}
          <path
            d="M 180 75 Q 165 125 155 176"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Shaded facet */}
          <path
            d="M 180 75 Q 195 125 285 178 L 180 178 Z"
            fill="rgba(0, 0, 0, 0.12)"
          />

          {/* Compact stone/granule details */}
          <ellipse cx="160" cy="145" rx="5" ry="3" fill="rgba(255, 255, 255, 0.25)" />
          <ellipse cx="205" cy="155" rx="6" ry="4" fill="rgba(0, 0, 0, 0.2)" />
          <circle cx="178" cy="115" r="2.5" fill="rgba(255, 255, 255, 0.4)" />
          <circle cx="140" cy="165" r="3" fill="rgba(0, 0, 0, 0.18)" />
          <circle cx="225" cy="168" r="3.5" fill="rgba(255, 255, 255, 0.3)" />
        </g>
      ) : (
        /* SOGGY: Wet, soft material spreading slightly with moisture pooling */
        <g>
          {/* Expanded, wet slurry pool ring */}
          <ellipse
            cx="180"
            cy="180"
            rx="138"
            ry="26"
            fill={darkColor}
            opacity="0.45"
          />

          {/* Collapsed, spreading soft mud mound */}
          <path
            d="M 45 184 C 70 162, 115 125, 180 120 C 245 125, 290 162, 315 184 C 285 198, 75 198, 45 184 Z"
            fill={`url(#pileGrad_${consistency}_${material})`}
          />

          {/* Surface Slump & Spreading Ripples */}
          <ellipse
            cx="180"
            cy="165"
            rx="85"
            ry="18"
            fill="rgba(255, 255, 255, 0.22)"
          />

          {/* Wet glossy moisture reflections */}
          <ellipse
            cx="155"
            cy="158"
            rx="28"
            ry="7"
            fill="rgba(255, 255, 255, 0.45)"
            transform="rotate(-5 155 158)"
          />
          <ellipse
            cx="210"
            cy="162"
            rx="24"
            ry="6"
            fill="rgba(255, 255, 255, 0.4)"
            transform="rotate(6 210 162)"
          />

          {/* Splattered droplets & seepage lines */}
          <circle cx="68" cy="186" r="3.5" fill={darkColor} opacity="0.7" />
          <circle cx="292" cy="188" r="4" fill={darkColor} opacity="0.7" />
          <circle cx="180" cy="192" r="3" fill="rgba(255, 255, 255, 0.5)" />
        </g>
      )}
    </svg>
  );
}

function SpecialsConsistencyPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const material = search.material;

  // Selected consistency state (persisted in localStorage, defaulting to "perfect")
  const [selectedConsistency, setSelectedConsistency] = useState<Consistency>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(SPECIALS_CONSISTENCY_KEY);
      if (saved === "perfect" || saved === "soggy") {
        return saved as Consistency;
      }
    }
    return "perfect";
  });

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(SPECIALS_CONSISTENCY_KEY, selectedConsistency);
      localStorage.setItem(SPECIALS_MATERIAL_KEY, material);
    }
  }, [selectedConsistency, material]);

  const handleContinue = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(SPECIALS_CONSISTENCY_KEY, selectedConsistency);
    }
    // Navigate forward to specials quantity input (STEP 03)
    navigate({
      to: "/specials/quantity",
      search: {
        material,
        consistency: selectedConsistency,
      },
    });
  };

  return (
    <PageShell backTo="/specials">
      <div className="consistency-page">
        {/* Header */}
        <header className="consistency-heading">
          <span className="eyebrow">SPECIALS / STEP 02</span>
          <h1>How do you want your material?</h1>
          <p>Because even cement has a preferred consistency.</p>
        </header>

        {/* Consistency Cards Pair Grid */}
        <div
          className="consistency-pair"
          role="radiogroup"
          aria-label="Specials material consistency options"
        >
          {/* Card 1: PERFECT */}
          <button
            type="button"
            role="radio"
            aria-checked={selectedConsistency === "perfect"}
            className={`consistency-card ${selectedConsistency === "perfect" ? "consistency-card-selected" : ""}`}
            onClick={() => setSelectedConsistency("perfect")}
            aria-label="Select PERFECT consistency"
          >
            {selectedConsistency === "perfect" && (
              <div className="consistency-check-badge" aria-hidden="true">
                <Check />
              </div>
            )}

            <div className="specials-consistency-visual">
              <MaterialConsistencyVisual
                material={material}
                consistency="perfect"
              />
            </div>

            <div className="consistency-body">
              <h2>PERFECT</h2>
              <p>Optimal material consistency.</p>

              <div className="sambar-level-indicator">
                <div className="sambar-level-header">
                  <span className="sambar-level-label">MOISTURE</span>
                  <span className="sambar-level-pct">40%</span>
                </div>
                <div className="sambar-blocks" aria-label="Moisture level 4 of 10">
                  <span className="sambar-block-filled">████</span>
                  <span className="sambar-block-empty">░░░░░░</span>
                </div>
              </div>
            </div>
          </button>

          {/* Card 2: SOGGY */}
          <button
            type="button"
            role="radio"
            aria-checked={selectedConsistency === "soggy"}
            className={`consistency-card ${selectedConsistency === "soggy" ? "consistency-card-selected" : ""}`}
            onClick={() => setSelectedConsistency("soggy")}
            aria-label="Select SOGGY consistency"
          >
            {selectedConsistency === "soggy" && (
              <div className="consistency-check-badge" aria-hidden="true">
                <Check />
              </div>
            )}

            <div className="specials-consistency-visual">
              <MaterialConsistencyVisual
                material={material}
                consistency="soggy"
              />
              <div className="soggy-material-overlay" aria-hidden="true" />
            </div>

            <div className="consistency-body">
              <h2>SOGGY</h2>
              <p>Excess moisture detected.</p>

              <div className="sambar-level-indicator">
                <div className="sambar-level-header">
                  <span className="sambar-level-label">MOISTURE</span>
                  <span className="sambar-level-pct">90%</span>
                </div>
                <div className="sambar-blocks" aria-label="Moisture level 9 of 10">
                  <span className="sambar-block-filled">█████████</span>
                  <span className="sambar-block-empty">░</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Bottom Area: Selected indicator + Continue button */}
        <footer className="consistency-footer">
          <div className="selected-readout">
            <span>SELECTED</span>
            <strong>{selectedConsistency}</strong>
          </div>

          <button
            type="button"
            className="continue-pill-button"
            onClick={handleContinue}
            aria-label={`Continue with ${selectedConsistency} consistency`}
          >
            <span>CONTINUE</span>
            <ArrowRight />
          </button>
        </footer>
      </div>
    </PageShell>
  );
}
