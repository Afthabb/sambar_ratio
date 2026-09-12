import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import chorPlate from "@/assets/chor-plate.jpg";
import materialLab from "@/assets/material-lab.jpg";
import { PageShell } from "@/components/lab-ui";
import { SambarBoilingLoader } from "@/components/lab-loading";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Laboratory Selection — CHOR vs SPECIALS | CHOR Mixing Lab" },
      { name: "description", content: "Choose your experiment: CHOR (Rice + Sambar) or SPECIALS (Experimental Construction Materials)." },
      { property: "og:title", content: "Laboratory Selection — CHOR Mixing Lab" },
      { property: "og:description", content: "Choose your experiment: CHOR (Rice + Sambar) or SPECIALS (Experimental Construction Materials)." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SelectionPage,
});

function SelectionPage() {
  const [loadingDestination, setLoadingDestination] = useState<"/chor" | "/specials" | null>(null);

  return (
    <>
      {loadingDestination && (
        <SambarBoilingLoader navigateTo={loadingDestination} />
      )}

      <PageShell>
        <div className="selection-page">
          {/* Header Section */}
          <header className="selection-heading">
            <span className="eyebrow">LABORATORY SELECTION</span>
            <h1>What are we mixing?</h1>
            <p>Choose your experiment.</p>
          </header>

          {/* Main Selection Area: Two large glass cards with "+" in between */}
          <div className="selection-pair" role="region" aria-label="Experiment Selection">
            {/* Left Card: CHOR */}
            <button
              type="button"
              className="selection-card"
              onClick={() => setLoadingDestination("/chor")}
              aria-label="Select CHOR experiment: Rice + Sambar"
            >
              <div className="feature-image">
                <img
                  src={chorPlate}
                  alt="Kerala-style chor rice served with rich hot sambar"
                  width={1536}
                  height={1024}
                />
              </div>
              <div className="feature-content">
                <div>
                  <span>01 / Food Science</span>
                  <h2>CHOR</h2>
                  <h3>Rice + Sambar</h3>
                  <p>Precision sambar allocation for maximum rice satisfaction.</p>
                </div>
                <div className="selection-action">
                  <span>ENTER LAB</span>
                  <ArrowRight />
                </div>
              </div>
            </button>

            {/* Middle elegant '+' symbol */}
            <div className="selection-plus-wrap" aria-hidden="true">
              <span className="selection-plus">+</span>
            </div>

            {/* Right Card: SPECIALS */}
            <button
              type="button"
              className="selection-card"
              onClick={() => setLoadingDestination("/specials")}
              aria-label="Select SPECIALS experiment: Experimental Materials"
            >
              <div className="feature-image">
                <img
                  src={materialLab}
                  alt="Construction materials including cement, tar, sand, gravel, and tools"
                  width={1536}
                  height={1024}
                />
              </div>
              <div className="feature-content">
                <div>
                  <span>02 / Civil-ish Engineering</span>
                  <h2>SPECIALS</h2>
                  <h3>Experimental Materials</h3>
                  <p>Highly unnecessary analysis of construction materials.</p>
                </div>
                <div className="selection-action">
                  <span>ENTER LAB</span>
                  <ArrowRight />
                </div>
              </div>
            </button>
          </div>

          {/* Bottom Label */}
          <div className="selection-hint">
            <span className="selection-hint-dot" aria-hidden="true" />
            <span>SELECT ONE TO CONTINUE</span>
          </div>
        </div>
      </PageShell>
    </>
  );
}
