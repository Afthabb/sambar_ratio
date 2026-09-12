export type Consistency = "perfect" | "soggy";
export type Material = "cement" | "tar" | "para-podi" | "sand" | "gravel" | "mystery";

export const materialLabels: Record<Material, string> = {
  cement: "Cement",
  tar: "Tar",
  "para-podi": "Para Podi",
  sand: "Sand",
  gravel: "Gravel",
  mystery: "Mystery Material",
};

export function sambarFor(rice: number, consistency: Consistency) {
  return Math.round(rice * (consistency === "perfect" ? 0.75 : 1.25));
}

export function materialMetrics(mass: number, consistency: Consistency, material: Material) {
  const offset = Object.keys(materialLabels).indexOf(material) * 3;
  const wet = consistency === "soggy";
  return [
    { label: "Moisture content", value: Math.min(96, (wet ? 72 : 28) + offset) },
    { label: "Density", value: Math.min(96, 48 + Math.round(mass / 30) + offset) },
    { label: "Flowability", value: Math.min(96, (wet ? 88 : 44) + offset) },
    { label: "Structural integrity", value: Math.max(12, (wet ? 32 : 86) - offset) },
    { label: "Aggregate content", value: Math.min(95, 57 + offset) },
    { label: "Binding potential", value: Math.max(18, (wet ? 39 : 79) - offset) },
  ];
}
