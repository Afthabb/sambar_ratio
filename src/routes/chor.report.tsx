import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, RotateCcw } from "lucide-react";
import { PageShell } from "@/components/lab-ui";
import { sambarFor, type Consistency } from "@/lib/lab";

export const Route = createFileRoute("/chor/report")({
  validateSearch: (search: Record<string, unknown>) => ({
    rice: Number(search["rice"]) || 300,
    consistency: (search["consistency"] === "soggy" ? "soggy" : "perfect") as Consistency,
  }),
  head: () => ({
    meta: [
      { title: "LAB REPORT / CHOR — Food Analysis | CHOR Mixing Lab" },
      { name: "description", content: "Your precision culinary mixing laboratory report." },
      { property: "og:title", content: "LAB REPORT / CHOR — Food Analysis" },
      { property: "og:description", content: "Your mix is ready." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChorReportPage,
});

function ChorReportPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const rice = search.rice;
  const consistency = search.consistency;
  const sambar = sambarFor(rice, consistency);
  const isPerfect = consistency === "perfect";

  // Deterministic metrics calculation
  const ratioVal = isPerfect ? "0.75" : "1.25";
  const moistureVal = isPerfect ? 72 : 94;
  const coverageVal = isPerfect ? 68 : 96;
  const integrityVal = isPerfect ? 84 : 32;
  const qualityVal = isPerfect ? 92 : 78;

  // Sambar spread radii on the completed plate illustration
  const sambarRx = isPerfect ? 82 : 116;
  const sambarRy = isPerfect ? 50 : 72;

  return (
    <PageShell backTo="/chor">
      <div className="report-page-container">
        {/* Header */}
        <header className="flow-heading compact text-center">
          <span className="eyebrow">LAB REPORT / CHOR</span>
          <h1>Your mix is ready.</h1>
        </header>

        {/* Centre: Completed Illustrated Plate Card with Final Mix Readout */}
        <section className="report-hero-plate-card" aria-label="Completed Food Preparation Result">
          {/* Completed Visual Plate SVG matching simulation exactly */}
          <svg
            viewBox="0 0 500 380"
            className="report-plate-svg"
            aria-label="Completed Kerala rice and sambar plate with vegetables"
          >
            <defs>
              <radialGradient id="repPlateShadow" cx="50%" cy="50%" r="50%">
                <stop offset="60%" stopColor="rgba(35, 20, 10, 0.16)" />
                <stop offset="100%" stopColor="rgba(35, 20, 10, 0)" />
              </radialGradient>
              <linearGradient id="repPlateRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#f7f5f0" />
                <stop offset="70%" stopColor="#ebe7de" />
                <stop offset="100%" stopColor="#dcd6c8" />
              </linearGradient>
              <radialGradient id="repPlateBasin" cx="45%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#faf9f6" />
                <stop offset="70%" stopColor="#eeebe2" />
                <stop offset="100%" stopColor="#dfd9cd" />
              </radialGradient>
              <radialGradient id="repRiceMoundGrad" cx="48%" cy="42%" r="52%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#faf8f2" />
                <stop offset="85%" stopColor="#eee8dc" />
                <stop offset="100%" stopColor="#dfd6c4" />
              </radialGradient>
              <radialGradient id="repSambarLiquidGrad" cx="48%" cy="45%" r="52%">
                <stop offset="0%" stopColor="#ef5a18" />
                <stop offset="45%" stopColor="#d94b0d" />
                <stop offset="80%" stopColor="#b83b07" />
                <stop offset="100%" stopColor="#912c05" />
              </radialGradient>
              <filter id="repSteamBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" />
              </filter>
            </defs>

            {/* Ambient Shadow */}
            <ellipse cx="250" cy="205" rx="190" ry="135" fill="url(#repPlateShadow)" />

            {/* Ceramic Plate Rim */}
            <ellipse
              cx="250"
              cy="195"
              rx="180"
              ry="128"
              fill="url(#repPlateRimGrad)"
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="2"
            />
            <ellipse cx="250" cy="195" rx="150" ry="106" fill="none" stroke="rgba(0, 0, 0, 0.06)" strokeWidth="1.5" />
            <ellipse cx="250" cy="196" rx="142" ry="100" fill="url(#repPlateBasin)" />

            {/* Sambar Pool Beneath/Around Mound */}
            <ellipse
              cx="250"
              cy="194"
              rx={sambarRx + 6}
              ry={sambarRy + 4}
              fill="rgba(180, 60, 10, 0.22)"
              filter="url(#repSteamBlur)"
            />
            <ellipse cx="250" cy="194" rx={sambarRx} ry={sambarRy} fill="url(#repSambarLiquidGrad)" />
            <ellipse cx="244" cy="188" rx={sambarRx * 0.55} ry={sambarRy * 0.45} fill="rgba(255, 200, 100, 0.35)" />

            {/* Rice Mound */}
            <ellipse cx="250" cy="198" rx="94" ry="58" fill="rgba(60, 45, 30, 0.08)" filter="url(#repSteamBlur)" />
            <ellipse cx="250" cy="192" rx="90" ry="56" fill="url(#repRiceMoundGrad)" />
            <ellipse cx="248" cy="186" rx="70" ry="42" fill="#ffffff" opacity="0.65" />

            {/* Rice Grains Texture */}
            <g opacity="0.5">
              <rect x="220" y="175" width="2.5" height="6.5" rx="1.2" fill="#eae2d2" transform="rotate(25 220 175)" />
              <rect x="240" y="168" width="2.5" height="7" rx="1.2" fill="#eae2d2" transform="rotate(-15 240 168)" />
              <rect x="260" y="178" width="2.5" height="6.5" rx="1.2" fill="#eae2d2" transform="rotate(40 260 178)" />
              <rect x="215" y="195" width="2.5" height="7" rx="1.2" fill="#eae2d2" transform="rotate(-30 215 195)" />
              <rect x="275" y="192" width="2.5" height="6.5" rx="1.2" fill="#eae2d2" transform="rotate(10 275 192)" />
              <rect x="245" y="202" width="2.5" height="7" rx="1.2" fill="#eae2d2" transform="rotate(80 245 202)" />
            </g>

            {/* Settled Vegetables */}
            {/* Tomato */}
            <g transform="rotate(18 232 185)">
              <ellipse cx="232" cy="185" rx="9" ry="6.5" fill="#d92a18" stroke="#a0180b" strokeWidth="0.8" />
              <ellipse cx="231" cy="183" rx="5" ry="3" fill="#ff624a" opacity="0.6" />
            </g>
            {/* Carrot */}
            <g transform="rotate(-12 268 182)">
              <circle cx="268" cy="182" r="8.5" fill="#f96615" stroke="#cc4c06" strokeWidth="1" />
              <circle cx="268" cy="182" r="4" fill="#fb883f" opacity="0.65" />
            </g>
            {/* Potato */}
            <g transform="rotate(24 220 208)">
              <rect x="214" y="202" width="13" height="11" rx="3" fill="#e8ba5d" stroke="#bf923b" strokeWidth="0.8" />
              <rect x="216" y="204" width="8" height="5" rx="1.5" fill="#f8d689" opacity="0.6" />
            </g>
            {/* Drumstick */}
            <g transform="rotate(-28 274 206)">
              <rect x="264" y="201" width="20" height="9" rx="3.5" fill="#4d6f32" stroke="#31481e" strokeWidth="0.8" />
              <line x1="267" y1="203" x2="280" y2="203" stroke="#719e48" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="267" y1="207" x2="280" y2="207" stroke="#364e22" strokeWidth="1.2" strokeLinecap="round" />
            </g>
            {/* Curry Leaf */}
            <g transform="rotate(42 248 172)">
              <path d="M 242 172 C 242 166, 252 165, 258 168 C 255 174, 248 176, 242 172 Z" fill="#2e4e1a" stroke="#46722a" strokeWidth="0.6" />
              <path d="M 244 171 Q 250 169 256 168" stroke="#5d9239" strokeWidth="0.5" fill="none" />
            </g>

            {/* Tempering Specks */}
            <circle cx="236" cy="176" r="1.3" fill="#1f140e" />
            <circle cx="258" cy="186" r="1.4" fill="#1f140e" />
            <circle cx="242" cy="202" r="1.2" fill="#1f140e" />
            <circle cx="262" cy="200" r="1.3" fill="#1f140e" />
          </svg>

          {/* FINAL MIX Breakdown */}
          <div className="final-mix-section">
            <span className="final-mix-eyebrow">FINAL MIX</span>

            <div className="final-mix-values-row">
              <div className="final-val-block">
                <span className="final-val-num">{rice} g</span>
                <span className="final-val-label">RICE</span>
              </div>

              <span className="final-val-plus" aria-hidden="true">+</span>

              <div className="final-val-block">
                <span className="final-val-num">{sambar} ml</span>
                <span className="final-val-label">SAMBAR</span>
              </div>
            </div>

            {/* Large Final Classification Banner */}
            <div className="final-classification-banner">
              <span>{isPerfect ? "PERFECT" : "SOGGY"}</span>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="report-metrics-glass" aria-label="Laboratory Quality Metrics">
          <div className="report-metrics-header">
            <span className="eyebrow">LABORATORY TELEMETRY & MEASUREMENTS</span>
            <span className="entertainment-pill">SIMULATED VALUES — FOR ENTERTAINMENT</span>
          </div>

          <div className="report-metrics-grid-5">
            {/* Metric 1 */}
            <div className="report-metric-tile">
              <span className="report-metric-tile-title">SAMBAR / RICE RATIO</span>
              <strong className="report-metric-tile-val">{ratioVal}</strong>
              <div className="report-metric-tile-bar">
                <i style={{ width: `${Math.min(100, parseFloat(ratioVal) * 80)}%` }} />
              </div>
            </div>

            {/* Metric 2 */}
            <div className="report-metric-tile">
              <span className="report-metric-tile-title">MOISTURE CONTENT</span>
              <strong className="report-metric-tile-val">{moistureVal}%</strong>
              <div className="report-metric-tile-bar">
                <i style={{ width: `${moistureVal}%` }} />
              </div>
            </div>

            {/* Metric 3 */}
            <div className="report-metric-tile">
              <span className="report-metric-tile-title">SAMBAR COVERAGE</span>
              <strong className="report-metric-tile-val">{coverageVal}%</strong>
              <div className="report-metric-tile-bar">
                <i style={{ width: `${coverageVal}%` }} />
              </div>
            </div>

            {/* Metric 4 */}
            <div className="report-metric-tile">
              <span className="report-metric-tile-title">RICE STRUCTURAL INTEGRITY</span>
              <strong className="report-metric-tile-val">{integrityVal}%</strong>
              <div className="report-metric-tile-bar">
                <i style={{ width: `${integrityVal}%` }} />
              </div>
            </div>

            {/* Metric 5 */}
            <div className="report-metric-tile">
              <span className="report-metric-tile-title">MIX QUALITY</span>
              <strong className="report-metric-tile-val">{qualityVal}%</strong>
              <div className="report-metric-tile-bar">
                <i style={{ width: `${qualityVal}%` }} />
              </div>
            </div>
          </div>
        </section>

        {/* Final Verdict Card */}
        <section className="report-verdict-card" aria-label="Final Verdict Analysis">
          <span className="verdict-tag">FINAL VERDICT</span>

          <h2 className="verdict-title">
            {isPerfect ? "OPTIMAL MIX" : "STRUCTURAL COMPROMISE DETECTED"}
          </h2>

          <p className="verdict-description">
            {isPerfect ? (
              <>
                Rice structural integrity maintained.
                <br />
                Sambar distribution within acceptable culinary limits.
              </>
            ) : (
              <>Rice has surrendered to the sambar.</>
            )}
          </p>

          <div className="verdict-recommendation">
            <span>
              {isPerfect
                ? "Ready for immediate consumption."
                : "Consumption permitted. Structural inspection recommended."}
            </span>
          </div>
        </section>

        {/* Bottom Action Buttons */}
        <footer className="report-bottom-actions">
          <button
            type="button"
            className="report-mix-again-btn"
            onClick={() => navigate({ to: "/chor" })}
            aria-label="Mix again"
          >
            <RotateCcw className="w-4 h-4" />
            <span>MIX AGAIN</span>
          </button>

          <button
            type="button"
            className="report-back-lab-btn"
            onClick={() => navigate({ to: "/" })}
            aria-label="Back to laboratory selection"
          >
            <span>BACK TO LAB</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </PageShell>
  );
}