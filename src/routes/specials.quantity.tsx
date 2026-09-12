import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Activity, Gauge, Droplets, Layers, ShieldCheck, Waves } from "lucide-react";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/lab-ui";
import { Slider } from "@/components/ui/slider";
import { materialLabels, type Consistency, type Material } from "@/lib/lab";

const SPECIALS_MASS_KEY = "cml_specials_mass";
const SPECIALS_CONSISTENCY_KEY = "cml_specials_consistency";
const SPECIALS_MATERIAL_KEY = "cml_specials_material";

export const Route = createFileRoute("/specials/quantity")({
  validateSearch: (search: Record<string, unknown>) => ({
    material: (typeof search["material"] === "string" ? search["material"] : "cement") as Material,
    consistency: (search["consistency"] === "soggy" ? "soggy" : "perfect") as Consistency,
  }),
  head: () => ({
    meta: [
      { title: "SPECIALS / STEP 03 — Material Quantity & Analysis | CHOR Mixing Lab" },
      { name: "description", content: "Precision analysis of an entirely unnecessary sample." },
      { property: "og:title", content: "SPECIALS / STEP 03 — Material Quantity & Analysis" },
      { property: "og:description", content: "How much material are we mixing?" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpecialsQuantityPage,
});

// Deterministic baseline engineering characteristics per material
interface BaselineMetrics {
  moisture: number;
  density: number;
  flowability: number;
  structuralIntegrity: number;
  aggregateContent: number;
  bindingPotential: number;
}

const MATERIAL_BASELINES: Record<Material, BaselineMetrics> = {
  // CEMENT: high structural integrity, high binding potential, low flowability
  cement: {
    moisture: 18,
    density: 82,
    flowability: 24,
    structuralIntegrity: 92,
    aggregateContent: 35,
    bindingPotential: 96,
  },
  // TAR: high flowability, high stickiness, moderate structural integrity
  tar: {
    moisture: 22,
    density: 74,
    flowability: 84,
    structuralIntegrity: 62,
    aggregateContent: 40,
    bindingPotential: 88,
  },
  // SAND: high aggregate content, high flowability, low binding potential
  sand: {
    moisture: 14,
    density: 68,
    flowability: 78,
    structuralIntegrity: 48,
    aggregateContent: 92,
    bindingPotential: 22,
  },
  // GRAVEL: very high aggregate content, low flowability
  gravel: {
    moisture: 10,
    density: 90,
    flowability: 28,
    structuralIntegrity: 78,
    aggregateContent: 98,
    bindingPotential: 34,
  },
  // PARA PODI: high aggregate content, medium flowability
  "para-podi": {
    moisture: 16,
    density: 76,
    flowability: 52,
    structuralIntegrity: 70,
    aggregateContent: 86,
    bindingPotential: 58,
  },
  // MYSTERY: unclassifiable synthetic/alien compound
  mystery: {
    moisture: 32,
    density: 85,
    flowability: 60,
    structuralIntegrity: 65,
    aggregateContent: 68,
    bindingPotential: 75,
  },
};

// SVG Hero Illustration rendering the selected material container/batch
function MaterialHeroIllustration({
  material,
  consistency,
}: {
  material: Material;
  consistency: Consistency;
}) {
  const isSoggy = consistency === "soggy";

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
    <svg viewBox="0 0 480 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="specials-hero-svg">
      <defs>
        <radialGradient id={`specialsHeroGrad_${material}`} cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor={lightColor} />
          <stop offset="60%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={darkColor} />
        </radialGradient>
        <linearGradient id="trayMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e5e0d8" />
          <stop offset="50%" stopColor="#c7c0b4" />
          <stop offset="100%" stopColor="#9e978b" />
        </linearGradient>
      </defs>

      {/* Surface Drop Shadow */}
      <ellipse cx="240" cy="188" rx="160" ry="18" fill="rgba(30, 20, 10, 0.12)" />

      {/* Stainless Construction Specimen Tray */}
      <ellipse cx="240" cy="174" rx="180" ry="24" fill="url(#trayMetalGrad)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <ellipse cx="240" cy="172" rx="172" ry="20" fill="#2d2b27" opacity="0.1" />

      {/* Material Mound / Mass */}
      {isSoggy ? (
        /* SOGGY: Slumped wide mound with liquid sheen and displacement */
        <g>
          <ellipse cx="240" cy="168" rx="140" ry="22" fill={darkColor} opacity="0.8" />
          <path
            d="M 120 166 C 145 130, 185 105, 240 102 C 295 105, 335 130, 360 166 C 340 178, 140 178, 120 166 Z"
            fill={`url(#specialsHeroGrad_${material})`}
          />
          {/* Slump ripples */}
          <path d="M 170 148 Q 240 156 310 148" stroke="rgba(0,0,0,0.18)" strokeWidth="3" fill="none" />
          <path d="M 195 160 Q 240 165 285 160" stroke="rgba(0,0,0,0.14)" strokeWidth="2.5" fill="none" />
          {/* Moisture gloss reflections */}
          <ellipse cx="225" cy="122" rx="35" ry="10" fill="rgba(255,255,255,0.38)" transform="rotate(-4 225 122)" />
          <ellipse cx="270" cy="132" rx="20" ry="6" fill="rgba(255,255,255,0.28)" />
          {/* Droplets */}
          <circle cx="155" cy="168" r="4.5" fill={primaryColor} />
          <circle cx="325" cy="169" r="4" fill={primaryColor} />
        </g>
      ) : (
        /* PERFECT: Compact pyramid cone mound with crisp structural facets */
        <g>
          <ellipse cx="240" cy="170" rx="115" ry="16" fill={darkColor} opacity="0.6" />
          <path
            d="M 140 166 C 160 158, 200 68, 240 64 C 280 68, 320 158, 340 166 C 310 174, 170 174, 140 166 Z"
            fill={`url(#specialsHeroGrad_${material})`}
          />
          {/* Ridge contour highlight */}
          <path
            d="M 240 64 Q 225 115 210 166"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Texture grain dots */}
          <circle cx="215" cy="130" r="2" fill="rgba(255,255,255,0.5)" />
          <circle cx="255" cy="115" r="2.5" fill="rgba(0,0,0,0.2)" />
          <circle cx="232" cy="95" r="1.8" fill="rgba(255,255,255,0.6)" />
          <circle cx="270" cy="142" r="2" fill="rgba(0,0,0,0.25)" />
        </g>
      )}

      {/* Lab Sample Grid overlay watermark */}
      <line x1="120" y1="172" x2="360" y2="172" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
    </svg>
  );
}

function SpecialsQuantityPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  // Load initial material & consistency from search or localStorage
  const [material, setMaterial] = useState<Material>(search.material || "cement");
  const [consistency, setConsistency] = useState<Consistency>(search.consistency || "perfect");

  // Material Mass in grams (Range 50g - 5000g, default 500g)
  const [mass, setMass] = useState<number>(500);

  // Initialize from storage or URL params
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMaterial = localStorage.getItem(SPECIALS_MATERIAL_KEY);
      if (savedMaterial && savedMaterial in MATERIAL_BASELINES) {
        setMaterial(savedMaterial as Material);
      }
      const savedConsistency = localStorage.getItem(SPECIALS_CONSISTENCY_KEY);
      if (savedConsistency === "perfect" || savedConsistency === "soggy") {
        setConsistency(savedConsistency as Consistency);
      }
      const savedMass = localStorage.getItem(SPECIALS_MASS_KEY);
      if (savedMass) {
        const num = Number(savedMass);
        if (!isNaN(num) && num >= 50 && num <= 5000) {
          setMass(num);
        }
      }
    }
  }, []);

  // Update localStorage when mass changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(SPECIALS_MASS_KEY, mass.toString());
    }
  }, [mass]);

  // Handler for direct numeric typing
  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setMass(50);
      return;
    }
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed)) {
      // Clamp between 50g and 5000g
      const clamped = Math.max(50, Math.min(5000, parsed));
      setMass(clamped);
    }
  };

  // Deterministic engineering analysis computation
  // Factors:
  // - Baseline characteristics of the material
  // - Mass scaling: higher mass slightly increases density and aggregate cohesion, slightly affects flowability
  // - SOGGY state: increases moisture (+42%), increases flowability (+32%), reduces structural integrity (-36%)
  // - PERFECT state: reduces moisture (-8%), increases structural stability (+10%), retains baseline flowability
  const base = MATERIAL_BASELINES[material] || MATERIAL_BASELINES.cement;
  const isSoggy = consistency === "soggy";

  // Mass factor: normalized -5% to +8% based on 500g center point
  const massRatio = (mass - 500) / 4500; // 0 to 1 as mass increases from 500 to 5000
  const massDensityBonus = Math.round(massRatio * 10);
  const massIntegrityModifier = Math.round(massRatio * 4);

  // 1. MOISTURE CONTENT
  const calculatedMoisture = Math.min(
    98,
    Math.max(6, isSoggy ? base.moisture + 46 : Math.max(8, base.moisture - 4))
  );

  // 2. DENSITY
  const calculatedDensity = Math.min(
    99,
    Math.max(40, base.density + massDensityBonus + (isSoggy ? 6 : 0))
  );

  // 3. FLOWABILITY
  const calculatedFlowability = Math.min(
    98,
    Math.max(8, isSoggy ? base.flowability + 34 : Math.max(10, base.flowability - 6))
  );

  // 4. STRUCTURAL INTEGRITY
  const calculatedStructuralIntegrity = Math.min(
    98,
    Math.max(
      12,
      isSoggy
        ? Math.max(14, base.structuralIntegrity - 38)
        : Math.min(96, base.structuralIntegrity + 8 + massIntegrityModifier)
    )
  );

  // 5. AGGREGATE CONTENT
  const calculatedAggregate = Math.min(
    99,
    Math.max(20, base.aggregateContent + Math.round(massRatio * 3))
  );

  // 6. BINDING POTENTIAL
  const calculatedBinding = Math.min(
    98,
    Math.max(15, isSoggy ? Math.max(18, base.bindingPotential - 24) : base.bindingPotential)
  );

  const handleStartMixing = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(SPECIALS_MASS_KEY, mass.toString());
      localStorage.setItem(SPECIALS_CONSISTENCY_KEY, consistency);
      localStorage.setItem(SPECIALS_MATERIAL_KEY, material);
    }
    navigate({
      to: "/specials/mixing",
      search: {
        material,
        consistency,
        mass,
      },
    });
  };

  const formattedMaterialName = materialLabels[material] || material.toUpperCase();

  return (
    <PageShell backTo="/specials/consistency">
      <div className="quantity-page">
        {/* Header */}
        <header className="quantity-heading">
          <span className="eyebrow">SPECIALS / STEP 03</span>
          <h1>How much material are we mixing?</h1>
          <p>Precision analysis of an entirely unnecessary sample.</p>
        </header>

        {/* Large Central Glass Card */}
        <section className="quantity-center-card specials-quantity-card" aria-label="Material Mass Configuration">
          {/* Material Visual inside Card */}
          <div className="quantity-hero-visual specials-hero-container">
            <MaterialHeroIllustration material={material} consistency={consistency} />
            <div className="quantity-consistency-badge">
              {formattedMaterialName} • {consistency.toUpperCase()}
            </div>
          </div>

          {/* MATERIAL MASS Label & Large Interactive Numeric Display */}
          <div className="quantity-numeric-section">
            <span className="quantity-section-label">MATERIAL MASS</span>
            <div className="quantity-display-row">
              <input
                type="number"
                min={50}
                max={5000}
                step={50}
                value={mass}
                onChange={handleNumericInput}
                className="quantity-number-input specials-number-input"
                aria-label="Material mass in grams"
              />
              <span className="quantity-unit-label">g</span>
            </div>
          </div>

          {/* Stylish Range Slider (50g – 5000g) */}
          <div className="quantity-slider-block">
            <Slider
              min={50}
              max={5000}
              step={50}
              value={[mass]}
              onValueChange={([val]) => val !== undefined && setMass(val)}
              className="quantity-slider"
              aria-label="Adjust material mass slider"
            />
            <div className="quantity-slider-range-row">
              <span>50g (Laboratory vial)</span>
              <span>2500g (Standard batch)</span>
              <span>5000g (Heavy load)</span>
            </div>
          </div>

          {/* Live Analysis Panel */}
          <div className="live-calc-card specials-analysis-card" role="region" aria-label="Live Material Engineering Analysis">
            <div className="live-calc-header">
              <div className="specials-analysis-title-group">
                <Activity className="w-3.5 h-3.5" />
                <span>LIVE MATERIAL ANALYSIS</span>
              </div>
              <span className="live-calc-profile-tag">
                {formattedMaterialName} • {consistency === "perfect" ? "COMPACT STATE" : "SATURATED STATE"}
              </span>
            </div>

            {/* Specimen Equation Summary */}
            <div className="live-calc-equation specials-specimen-equation">
              <div className="calc-box">
                <span className="calc-box-label">SPECIMEN</span>
                <strong className="calc-box-val">{formattedMaterialName}</strong>
                <span className="calc-box-unit">{consistency} profile</span>
              </div>

              <span className="calc-plus-sign" aria-hidden="true">@</span>

              <div className="calc-box">
                <span className="calc-box-label">MASS</span>
                <strong className="calc-box-val">{mass}</strong>
                <span className="calc-box-unit">grams</span>
              </div>
            </div>

            {/* 6 Deterministic Engineering Metrics Grid */}
            <div className="specials-metrics-grid">
              {/* 1. MOISTURE CONTENT */}
              <div className="small-metric-card specials-metric-box">
                <div className="specials-metric-header">
                  <Droplets className="w-3.5 h-3.5" />
                  <span className="small-metric-title">MOISTURE CONTENT</span>
                </div>
                <strong className="small-metric-val">{calculatedMoisture}%</strong>
                <div className="metric-bar-wrap">
                  <div className="metric-bar-fill" style={{ width: `${calculatedMoisture}%` }} />
                </div>
                <span className="simulated-pill">SIMULATED</span>
              </div>

              {/* 2. DENSITY */}
              <div className="small-metric-card specials-metric-box">
                <div className="specials-metric-header">
                  <Gauge className="w-3.5 h-3.5" />
                  <span className="small-metric-title">DENSITY</span>
                </div>
                <strong className="small-metric-val">{calculatedDensity}%</strong>
                <div className="metric-bar-wrap">
                  <div className="metric-bar-fill" style={{ width: `${calculatedDensity}%` }} />
                </div>
                <span className="simulated-pill">SIMULATED</span>
              </div>

              {/* 3. FLOWABILITY */}
              <div className="small-metric-card specials-metric-box">
                <div className="specials-metric-header">
                  <Waves className="w-3.5 h-3.5" />
                  <span className="small-metric-title">FLOWABILITY</span>
                </div>
                <strong className="small-metric-val">{calculatedFlowability}%</strong>
                <div className="metric-bar-wrap">
                  <div className="metric-bar-fill" style={{ width: `${calculatedFlowability}%` }} />
                </div>
                <span className="simulated-pill">SIMULATED</span>
              </div>

              {/* 4. STRUCTURAL INTEGRITY */}
              <div className="small-metric-card specials-metric-box">
                <div className="specials-metric-header">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="small-metric-title">STRUCTURAL INTEGRITY</span>
                </div>
                <strong className="small-metric-val">{calculatedStructuralIntegrity}%</strong>
                <div className="metric-bar-wrap">
                  <div className="metric-bar-fill" style={{ width: `${calculatedStructuralIntegrity}%` }} />
                </div>
                <span className="simulated-pill">SIMULATED</span>
              </div>

              {/* 5. AGGREGATE CONTENT */}
              <div className="small-metric-card specials-metric-box">
                <div className="specials-metric-header">
                  <Layers className="w-3.5 h-3.5" />
                  <span className="small-metric-title">AGGREGATE CONTENT</span>
                </div>
                <strong className="small-metric-val">{calculatedAggregate}%</strong>
                <div className="metric-bar-wrap">
                  <div className="metric-bar-fill" style={{ width: `${calculatedAggregate}%` }} />
                </div>
                <span className="simulated-pill">SIMULATED</span>
              </div>

              {/* 6. BINDING POTENTIAL */}
              <div className="small-metric-card specials-metric-box">
                <div className="specials-metric-header">
                  <Activity className="w-3.5 h-3.5" />
                  <span className="small-metric-title">BINDING POTENTIAL</span>
                </div>
                <strong className="small-metric-val">{calculatedBinding}%</strong>
                <div className="metric-bar-wrap">
                  <div className="metric-bar-fill" style={{ width: `${calculatedBinding}%` }} />
                </div>
                <span className="simulated-pill">SIMULATED</span>
              </div>
            </div>

            {/* Clearly display simulated engineering values notice */}
            <div className="specials-engineering-banner">
              <span className="engineering-badge">SIMULATED ENGINEERING VALUES</span>
              <p className="specials-engineering-caption">
                All measurements are calculated deterministically for entertainment and satirical engineering modeling. Do not construct real-world infrastructure using these metrics.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Actions */}
        <footer className="quantity-footer">
          <button
            type="button"
            className="continue-pill-button specials-pill-cta"
            onClick={handleStartMixing}
            aria-label="Start construction mix"
          >
            <span>START CONSTRUCTION MIX</span>
            <ArrowRight />
          </button>
        </footer>
      </div>
    </PageShell>
  );
}
