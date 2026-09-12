import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, FlaskConical, RotateCcw } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Consistency, Material } from "@/lib/lab";

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cn("glass-card", className)}>{children}</div>;
}

export function PillButton({ children, to, search, className = "" }: { children: ReactNode; to: NonNullable<LinkProps["to"]>; search?: LinkProps["search"]; className?: string }) {
  return <Button asChild size="lg" className={cn("pill-button", className)}>{search ? <Link to={to} search={search}>{children}<ArrowRight /></Link> : <Link to={to}>{children}<ArrowRight /></Link>}</Button>;
}

export function LabHeader({ backTo }: { backTo?: NonNullable<LinkProps["to"]> | undefined }) {
  return (
    <header className="lab-header">
      <div className="nav-brand-group">
        {backTo && (
          <Link to={backTo} className="nav-back-btn" aria-label="Go back">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="nav-back-label">Back</span>
          </Link>
        )}
        <Link to="/" className="brand">
          <span className="brand-mark">
            <FlaskConical className="w-4 h-4" />
          </span>
          <span className="brand-title">CHOR MIXING LAB</span>
        </Link>
      </div>
      <div className="nav-status-group">
        <div className="lab-status-pill">
          <span className="status-indicator-dot" />
          <span>LAB STATUS: READY</span>
        </div>
      </div>
    </header>
  );
}

export function PageShell({ children, backTo }: { children: ReactNode; backTo?: NonNullable<LinkProps["to"]> | undefined }) {
  return (
    <main className="site-wrap">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className="app-glass page-enter">
        <LabHeader backTo={backTo} />
        {children}
      </section>
    </main>
  );
}

export function ChoiceCard({ active, emoji, title, copy, onClick }: { active: boolean; emoji?: string; title: string; copy: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={cn("choice-card", active && "choice-card-active")}><span className="choice-emoji">{emoji}</span><span><strong>{title}</strong><small>{copy}</small></span><span className="choice-dot" /></button>;
}

export function MetricCard({ label, value }: { label: string; value: number }) {
  return <div className="metric"><div><span>{label}</span><b>{value}%</b></div><div className="metric-track"><i style={{ width: `${value}%` }} /></div></div>;
}

const chorStatuses = ["Adding rice...", "Preparing sambar...", "Pouring sambar...", "Analysing absorption...", "Checking structural integrity...", "MIX COMPLETE"];
const materialStatuses = ["Loading aggregate...", "Checking moisture...", "Crushing material...", "Analysing structural integrity...", "Applying unnecessary engineering...", "FINAL ANALYSIS COMPLETE"];

export function MixingSimulation({ kind, consistency, material, quantity, reportTo, reportSearch }: { kind: "chor" | "material"; consistency: Consistency; material?: Material; quantity: number; reportTo: NonNullable<LinkProps["to"]>; reportSearch: NonNullable<LinkProps["search"]> }) {
  const [step, setStep] = useState(0);
  const statuses = kind === "chor" ? chorStatuses : materialStatuses;
  useEffect(() => {
    if (step >= statuses.length - 1) return;
    const timer = window.setTimeout(() => setStep((value) => value + 1), 1100);
    return () => window.clearTimeout(timer);
  }, [step, statuses.length]);
  const done = step === statuses.length - 1;
  return <div className="simulation-wrap"><div className={cn("simulation", kind === "material" && "simulation-material", consistency === "soggy" && "simulation-soggy")}>
    <div className="sim-dust" />
    {kind === "chor" ? <><div className="plate"><div className="rice-mound" /><div className="sambar-pour" /><span className="veg veg-a" /><span className="veg veg-b" /><span className="veg veg-c" /></div></> : <><div className="ground" /><div className={cn("material-pile", `pile-${material}`)} /><div className="shovel">◢</div></>}
  </div><div className="sim-readout"><span>0{step + 1} / 0{statuses.length}</span><h2>{statuses[step]}</h2><div className="status-track"><i style={{ width: `${((step + 1) / statuses.length) * 100}%` }} /></div><p>{kind === "chor" ? `${quantity}g rice / ${consistency} consistency` : `${quantity}g ${material?.replace("-", " ")} / ${consistency}`}</p></div>
  <div className="simulation-actions">{done ? <PillButton to={reportTo} search={reportSearch}>View mixing report</PillButton> : <span className="loading-label"><i /> Simulation running</span>}<Button variant="ghost" onClick={() => setStep(0)} aria-label="Replay simulation" className="secondary-pill"><RotateCcw className="w-3.5 h-3.5" /> Replay</Button></div></div>;
}

export function ReportCard({ title, disclaimer, metrics, verdict, children }: { title: string; disclaimer: string; metrics: { label: string; value: number }[]; verdict: string; children: ReactNode }) {
  return <GlassCard className="report-card"><div className="report-top"><span className="eyebrow">Final laboratory report</span><h1>{title}</h1><p>{disclaimer}</p></div><div className="report-summary">{children}</div><div className="metrics-grid">{metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}</div><div className="verdict"><span>Final verdict</span><h2>{verdict}</h2></div></GlassCard>;
}
