/** Produkcijski domen – koristi se za metadataBase, sitemap i robots */
export const siteUrl = "https://www.cvecaraorijental.com";

export const siteRoutes = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/buketi", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/saksisko-cvece", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/rezano-cvece", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/program-za-saucesce", changeFrequency: "weekly" as const, priority: 0.85 },
  { path: "/novo-groblje", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/o-nama", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/kontakt", changeFrequency: "monthly" as const, priority: 0.8 },
] as const;
