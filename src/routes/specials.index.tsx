import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/lab-ui";
import type { Material } from "@/lib/lab";

const SPECIALS_MATERIAL_KEY = "cml_specials_material";

export const Route = createFileRoute("/specials/")({
  head: () => ({
    meta: [
      { title: "SPECIALS / STEP 01 — Material Selection | CHOR Mixing Lab" },
      { name: "description", content: "Select an experimental construction material: Cement, Tar, Para Podi, Sand, Gravel, or Mystery." },
      { property: "og:title", content: "SPECIALS / STEP 01 — Material Selection" },
      { property: "og:description", content: "What are we working with?" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpecialsMaterialPage,
});

interface MaterialOption {
  id: Material;
  name: string;
  description: string;
}

const MATERIAL_ITEMS: MaterialOption[] = [
  {
    id: "cement",
    name: "CEMENT",
    description: "High structural ambition.",
  },
  {
    id: "tar",
    name: "TAR",
    description: "Excellent for roads. Questionable everywhere else.",
  },
  {
    id: "para-podi",
    name: "PARA PODI",
    description: "Maximum aggregate potential.",
  },
  {
    id: "sand",
    name: "SAND",
    description: "Found absolutely everywhere.",
  },
  {
    id: "gravel",
    name: "GRAVEL",
    description: "Maximum crunch potential.",
  },
  {
    id: "mystery",
    name: "MYSTERY",
    description: "Nobody knows what this is.",
  },
];

// Helper to render high-fidelity custom SVG illustrations for each material
function MaterialIllustration({ id }: { id: Material }) {
  switch (id) {
    case "cement":
      return (
        <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cementBagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d5cfc4" />
              <stop offset="50%" stopColor="#b8b0a2" />
              <stop offset="100%" stopColor="#989082" />
            </linearGradient>
            <linearGradient id="cementPowderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a39d93" />
              <stop offset="100%" stopColor="#7a746a" />
            </linearGradient>
          </defs>
          {/* Shadow */}
          <ellipse cx="160" cy="175" rx="90" ry="12" fill="rgba(40,30,20,0.12)" />
          {/* Cement bag body */}
          <rect x="100" y="45" width="120" height="115" rx="14" fill="url(#cementBagGrad)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <rect x="110" y="55" width="100" height="24" rx="4" fill="#3a3732" opacity="0.85" />
          <text x="160" y="72" fill="#ffffff" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">PORTLAND</text>
          {/* Bag folds & texture */}
          <path d="M 100 80 Q 120 85 140 82 T 220 84" stroke="rgba(0,0,0,0.15)" strokeWidth="2" fill="none" />
          <path d="M 100 120 Q 130 126 160 122 T 220 124" stroke="rgba(0,0,0,0.15)" strokeWidth="2" fill="none" />
          {/* Loose cement powder pile spill */}
          <ellipse cx="160" cy="162" rx="42" ry="16" fill="url(#cementPowderGrad)" />
          <ellipse cx="160" cy="160" rx="30" ry="9" fill="#beb6ab" opacity="0.5" />
        </svg>
      );

    case "tar":
      return (
        <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tarRoadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#252427" />
              <stop offset="50%" stopColor="#1a191c" />
              <stop offset="100%" stopColor="#0d0c0e" />
            </linearGradient>
            <radialGradient id="tarGloss" cx="45%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#444248" />
              <stop offset="60%" stopColor="#1e1d21" />
              <stop offset="100%" stopColor="#0d0c0e" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="172" rx="95" ry="14" fill="rgba(15,10,10,0.16)" />
          {/* Thick viscous bitumen pool */}
          <path
            d="M 80 145 C 70 120, 110 110, 140 120 C 165 110, 210 115, 235 135 C 255 155, 235 175, 195 178 C 150 182, 90 175, 80 145 Z"
            fill="url(#tarRoadGrad)"
          />
          {/* Wet asphalt highway markings */}
          <path d="M 125 152 L 150 149" stroke="#f6c344" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
          <path d="M 175 146 L 200 143" stroke="#f6c344" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
          {/* Glossy liquid sheen */}
          <ellipse cx="150" cy="135" rx="35" ry="12" fill="url(#tarGloss)" opacity="0.8" transform="rotate(-6 150 135)" />
          {/* Tar droplets */}
          <circle cx="95" cy="165" r="5" fill="#141316" />
          <circle cx="230" cy="162" r="4" fill="#141316" />
        </svg>
      );

    case "para-podi":
      return (
        <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="paraPodiGrad" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#a8a39a" />
              <stop offset="45%" stopColor="#827d74" />
              <stop offset="85%" stopColor="#5e5951" />
              <stop offset="100%" stopColor="#47433c" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="174" rx="88" ry="13" fill="rgba(35,25,15,0.14)" />
          {/* Granular crushed granite pyramid mound */}
          <path d="M 85 168 Q 160 85 235 168 Z" fill="url(#paraPodiGrad)" />
          {/* Stone facets & textured granules */}
          <polygon points="145,110 160,95 175,115 155,125" fill="#c2bcb0" opacity="0.65" />
          <polygon points="125,140 140,128 152,145 130,152" fill="#757068" />
          <polygon points="175,135 190,120 205,138 185,148" fill="#524e47" />
          {/* Granular stone speckles */}
          <circle cx="130" cy="120" r="2.5" fill="#ded8cc" />
          <circle cx="165" cy="138" r="2.2" fill="#302d28" />
          <circle cx="185" cy="155" r="2.8" fill="#e5dfd3" />
          <circle cx="145" cy="158" r="2" fill="#2d2a26" />
          <circle cx="110" cy="162" r="3" fill="#8f897f" />
          <circle cx="210" cy="164" r="3.2" fill="#6e685f" />
        </svg>
      );

    case "sand":
      return (
        <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sandDuneGrad" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#fae6b8" />
              <stop offset="45%" stopColor="#e8cf97" />
              <stop offset="85%" stopColor="#caa96e" />
              <stop offset="100%" stopColor="#a38249" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="174" rx="92" ry="12" fill="rgba(60,40,15,0.12)" />
          {/* Flowing golden desert dune pile */}
          <path
            d="M 75 168 C 95 140, 130 100, 160 102 C 190 104, 225 145, 245 168 Z"
            fill="url(#sandDuneGrad)"
          />
          {/* Wind ripple lines across sand */}
          <path d="M 110 148 Q 145 135 185 142" stroke="#dcb97e" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 130 130 Q 160 120 195 128" stroke="#eed49c" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 100 162 Q 150 152 215 158" stroke="#b49359" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Tiny glittering silica grains */}
          <circle cx="142" cy="116" r="1.5" fill="#ffffff" opacity="0.85" />
          <circle cx="178" cy="122" r="1.5" fill="#ffffff" opacity="0.85" />
          <circle cx="120" cy="140" r="1.2" fill="#ffffff" opacity="0.75" />
        </svg>
      );

    case "gravel":
      return (
        <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pebbleGradA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#948f87" />
              <stop offset="100%" stopColor="#55514b" />
            </linearGradient>
            <linearGradient id="pebbleGradB" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b0aaa0" />
              <stop offset="100%" stopColor="#736d65" />
            </linearGradient>
            <linearGradient id="pebbleGradC" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6e685f" />
              <stop offset="100%" stopColor="#3d3934" />
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="174" rx="90" ry="13" fill="rgba(30,25,20,0.14)" />
          {/* Multi-stone coarse gravel cluster */}
          {/* Stone 1 */}
          <polygon points="120,135 145,118 160,132 135,155" fill="url(#pebbleGradA)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          {/* Stone 2 */}
          <polygon points="150,115 180,95 205,118 175,135" fill="url(#pebbleGradB)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          {/* Stone 3 */}
          <polygon points="90,155 115,142 125,165 100,172" fill="url(#pebbleGradC)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          {/* Stone 4 */}
          <polygon points="180,138 215,128 230,155 195,168" fill="url(#pebbleGradA)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          {/* Stone 5 (Center big chunk) */}
          <polygon points="140,145 175,138 185,165 145,172" fill="url(#pebbleGradB)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          {/* Stone 6 */}
          <polygon points="115,165 140,158 150,175 125,178" fill="url(#pebbleGradC)" />
          {/* Highlights */}
          <line x1="150" y1="117" x2="175" y2="100" stroke="#ded8cd" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "mystery":
      return (
        <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="mysteryGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(240, 140, 45, 0.45)" />
              <stop offset="60%" stopColor="rgba(120, 80, 180, 0.25)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="mysteryCube" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c2a30" />
              <stop offset="50%" stopColor="#1c1a22" />
              <stop offset="100%" stopColor="#100f14" />
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="174" rx="85" ry="12" fill="rgba(20,15,30,0.18)" />
          {/* Cosmic anomaly glow */}
          <circle cx="160" cy="120" r="65" fill="url(#mysteryGlow)" />
          {/* Unidentified industrial monolith container */}
          <polygon points="160,65 210,95 210,155 160,125" fill="#1e1d24" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <polygon points="160,65 110,95 110,155 160,125" fill="#2d2b33" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <polygon points="160,65 210,95 160,125 110,95" fill="#3a3742" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          {/* Glowing question symbol */}
          <text x="160" y="132" fill="#fca33d" fontSize="32" fontWeight="900" textAnchor="middle" opacity="0.95">?</text>
          {/* Shimmering warning stripes */}
          <line x1="120" y1="130" x2="135" y2="145" stroke="#f6c344" strokeWidth="2" opacity="0.8" />
          <line x1="135" y1="130" x2="150" y2="145" stroke="#f6c344" strokeWidth="2" opacity="0.8" />
        </svg>
      );
  }
}

function SpecialsMaterialPage() {
  const navigate = useNavigate();

  // Selected material state with local persistence
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(SPECIALS_MATERIAL_KEY);
      if (saved && ["cement", "tar", "para-podi", "sand", "gravel", "mystery"].includes(saved)) {
        return saved as Material;
      }
    }
    return "cement";
  });

  // Persist choice
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(SPECIALS_MATERIAL_KEY, selectedMaterial);
    }
  }, [selectedMaterial]);

  const handleContinue = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(SPECIALS_MATERIAL_KEY, selectedMaterial);
    }
    // Navigate to specials consistency selection (STEP 02)
    navigate({
      to: "/specials/consistency",
      search: {
        material: selectedMaterial,
      },
    });
  };

  const selectedItem = MATERIAL_ITEMS.find((m) => m.id === selectedMaterial) || MATERIAL_ITEMS[0];

  return (
    <PageShell backTo="/">
      <div className="specials-material-page">
        {/* Header */}
        <header className="specials-heading">
          <span className="eyebrow">SPECIALS / STEP 01</span>
          <h1>What are we working with?</h1>
          <p>Select an experimental construction material.</p>
        </header>

        {/* 6-Card Premium Grid */}
        <div
          className="specials-cards-grid"
          role="radiogroup"
          aria-label="Experimental construction materials"
        >
          {MATERIAL_ITEMS.map((item) => {
            const isSelected = selectedMaterial === item.id;

            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`specials-material-card ${isSelected ? "specials-material-card-selected" : ""}`}
                onClick={() => setSelectedMaterial(item.id)}
                aria-label={`Select ${item.name}`}
              >
                {/* Check Badge if Selected */}
                {isSelected && (
                  <div className="specials-check-badge" aria-hidden="true">
                    <Check />
                  </div>
                )}

                {/* Large Visual Illustration / Image */}
                <div className="specials-material-visual">
                  <MaterialIllustration id={item.id} />
                </div>

                {/* Content */}
                <div className="specials-card-content">
                  <div className="specials-card-header">
                    <h2 className="specials-card-name">{item.name}</h2>
                    <div className="specials-card-arrow" aria-hidden="true">
                      <ArrowRight />
                    </div>
                  </div>

                  <p className="specials-card-desc">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Readout & Action Bar */}
        <footer className="specials-bottom-bar">
          <div className="specials-selected-readout">
            <span>SELECTED MATERIAL</span>
            <strong>{selectedItem?.name ?? "CEMENT"}</strong>
          </div>

          <button
            type="button"
            className="continue-pill-button"
            onClick={handleContinue}
            aria-label={`Continue with ${selectedItem?.name ?? "Cement"}`}
          >
            <span>CONTINUE</span>
            <ArrowRight />
          </button>
        </footer>
      </div>
    </PageShell>
  );
}
