export type IndustryTheme = {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  textClass: string;
  bgClass: string;
  borderClass: string;
};

const themes: Record<string, IndustryTheme> = {
  "healthcare-medical-technology": {
    primary: "#3b82f6", // blue-500
    secondary: "#60a5fa", // blue-400
    accent: "#1e40af", // blue-800
    gradient: "from-blue-600 to-cyan-500",
    textClass: "text-blue-500",
    bgClass: "bg-blue-500",
    borderClass: "border-blue-500",
  },
  "financial-technology-fintech": {
    primary: "#4f46e5", // indigo-600
    secondary: "#6366f1", // indigo-500
    accent: "#312e81", // indigo-900
    gradient: "from-indigo-600 to-violet-600",
    textClass: "text-indigo-600",
    bgClass: "bg-indigo-600",
    borderClass: "border-indigo-600",
  },
  "education-technology-edtech": {
    primary: "#ea580c", // orange-600
    secondary: "#f97316", // orange-500
    accent: "#9a3412", // orange-800
    gradient: "from-orange-500 to-amber-500",
    textClass: "text-orange-500",
    bgClass: "bg-orange-500",
    borderClass: "border-orange-500",
  },
  "default": {
    primary: "#2563eb", // blue-600
    secondary: "#3b82f6", // blue-500
    accent: "#1e3a8a", // blue-900
    gradient: "from-gray-900 to-gray-800",
    textClass: "text-primary",
    bgClass: "bg-primary",
    borderClass: "border-primary",
  },
};

export const getIndustryTheme = (slug: string): IndustryTheme => {
  return themes[slug] || themes["default"];
};
