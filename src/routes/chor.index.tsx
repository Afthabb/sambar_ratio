import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import chorPlate from "@/assets/chor-plate.jpg";
import { PageShell } from "@/components/lab-ui";
import { SambarBoilingLoader } from "@/components/lab-loading";
import { Slider } from "@/components/ui/slider";
import type { Consistency } from "@/lib/lab";

const CONSISTENCY_KEY = "cml_chor_consistency";
const RICE_KEY = "cml_chor_rice";

export const Route = createFileRoute("/chor/")({
  head: () => ({
    meta: [
      { title: "CHOR / STEP 02 — Rice Quantity | CHOR Mixing Lab" },
      { name: "description", content: "Calculate the exact amount of sambar your rice deserves." },
      { property: "og:title", content: "CHOR / STEP 02 — Rice Quantity" },
      { property: "og:description", content: "Let's calculate the amount of sambar your rice deserves." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChorQuantityPage,
});

function ChorQuantityPage() {
  // Consistency state loaded from localStorage or defaulting to "perfect"
  const [consistency, setConsistency] = useState<Consistency>("perfect");

  // Rice quantity state (Range 50g - 1000g, default 300g)
  const [rice, setRice] = useState<number>(300);

  // Loading transition state
  const [loading, setLoading] = useState(false);

  // Initialize from storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedConsistency = localStorage.getItem(CONSISTENCY_KEY);
      if (savedConsistency === "perfect" || savedConsistency === "soggy") {
        setConsistency(savedConsistency as Consistency);
      }
      const savedRice = localStorage.getItem(RICE_KEY);
      if (savedRice) {
        const num = Number(savedRice);
        if (!isNaN(num) && num >= 50 && num <= 1000) {
          setRice(num);
        }
      }
    }
  }, []);

  // Sync rice value to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(RICE_KEY, rice.toString());
    }
  }, [rice]);

  // Calculations
  // PERFECT = rice * 0.75, SOGGY = rice * 1.25, rounded to whole ml
  const multiplier = consistency === "perfect" ? 0.75 : 1.25;
  const sambar = Math.round(rice * multiplier);

  // Simulated metrics
  const ratioText = consistency === "perfect" ? "1 : 0.75" : "1 : 1.25";
  const moistureLevel = consistency === "perfect" ? "68%" : "94%";
  const riceIntegrity = consistency === "perfect" ? "92%" : "38%";

  // Handler for direct numeric typing
  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setRice(50);
      return;
    }
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed)) {
      // Clamp between 50 and 1000
      const clamped = Math.max(50, Math.min(1000, parsed));
      setRice(clamped);
    }
  };

  const handleStartMixing = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(RICE_KEY, rice.toString());
      localStorage.setItem(CONSISTENCY_KEY, consistency);
    }
    setLoading(true);
  };

  return (
    <>
      {loading && (
        <SambarBoilingLoader
          navigateTo="/chor/mixing"
          search={{ consistency, rice }}
        />
      )}

      <PageShell backTo="/">
        <div className="quantity-page">
          {/* Header */}
          <header className="quantity-heading">
            <span className="eyebrow">CHOR / STEP 02</span>
            <h1>How much chor do you have?</h1>
            <p>Let's calculate the amount of sambar your rice deserves.</p>
          </header>

          {/* Central Translucent Glass Card */}
          <section className="quantity-center-card" aria-label="Rice Quantity Configuration">
            {/* Large Rice Illustration / Photo */}
            <div className="quantity-hero-visual">
              <img
                src={chorPlate}
                alt="Kerala-style rice ready for precision sambar allocation"
                width={1536}
                height={1024}
              />
              <div className="quantity-consistency-badge">
                PROFILE: {consistency}
              </div>
            </div>

            {/* RICE QUANTITY Label & Large Numeric Display with Direct Input */}
            <div className="quantity-numeric-section">
              <span className="quantity-section-label">RICE QUANTITY</span>
              <div className="quantity-display-row">
                <input
                  type="number"
                  min={50}
                  max={1000}
                  step={10}
                  value={rice}
                  onChange={handleNumericInput}
                  className="quantity-number-input"
                  aria-label="Rice quantity in grams"
                />
                <span className="quantity-unit-label">g</span>
              </div>
            </div>

            {/* Stylish Range Slider */}
            <div className="quantity-slider-block">
              <Slider
                min={50}
                max={1000}
                step={10}
                value={[rice]}
                onValueChange={([val]) => val !== undefined && setRice(val)}
                className="quantity-slider"
                aria-label="Adjust rice quantity slider"
              />
              <div className="quantity-slider-range-row">
                <span>50g (Light snack)</span>
                <span>1000g (Family feast)</span>
              </div>
            </div>

            {/* Live Calculation Card */}
            <div className="live-calc-card" role="region" aria-label="Live Sambar Calculation">
              <div className="live-calc-header">
                <span>LIVE CALCULATION</span>
                <span className="live-calc-profile-tag">
                  {consistency === "perfect" ? "PERFECT PROFILE (×0.75)" : "SOGGY PROFILE (×1.25)"}
                </span>
              </div>

              <div className="live-calc-equation">
                {/* Rice Box */}
                <div className="calc-box">
                  <span className="calc-box-label">RICE</span>
                  <strong className="calc-box-val">{rice}</strong>
                  <span className="calc-box-unit">grams</span>
                </div>

                {/* Operator */}
                <span className="calc-plus-sign" aria-hidden="true">+</span>

                {/* Sambar Box */}
                <div className="calc-box">
                  <span className="calc-box-label">SAMBAR</span>
                  <strong className="calc-box-val">{sambar}</strong>
                  <span className="calc-box-unit">ml</span>
                </div>
              </div>

              {/* Three Small Metric Cards */}
              <div className="quantity-metrics-grid">
                {/* Metric 1 */}
                <div className="small-metric-card">
                  <span className="small-metric-title">SAMBAR/RICE RATIO</span>
                  <strong className="small-metric-val">{ratioText}</strong>
                  <span className="simulated-pill">RATIO</span>
                </div>

                {/* Metric 2 */}
                <div className="small-metric-card">
                  <span className="small-metric-title">MOISTURE LEVEL</span>
                  <strong className="small-metric-val">{moistureLevel}</strong>
                  <span className="simulated-pill">SIMULATED</span>
                </div>

                {/* Metric 3 */}
                <div className="small-metric-card">
                  <span className="small-metric-title">RICE INTEGRITY</span>
                  <strong className="small-metric-val">{riceIntegrity}</strong>
                  <span className="simulated-pill">SIMULATED</span>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Actions & Disclaimer */}
          <footer className="quantity-footer">
            <button
              type="button"
              className="continue-pill-button"
              onClick={handleStartMixing}
              aria-label="Start mixing simulation"
            >
              <span>START MIXING</span>
              <ArrowRight />
            </button>

            <p className="quantity-disclaimer">
              Simulated culinary calculations. Not a scientific standard.
            </p>
          </footer>
        </div>
      </PageShell>
    </>
  );
}
