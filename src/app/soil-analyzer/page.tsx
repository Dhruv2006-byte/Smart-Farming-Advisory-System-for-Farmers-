"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sprout,
  FlaskConical,
  ArrowRight,
  Leaf,
  Droplets,
  Thermometer,
  CheckCircle,
  AlertCircle,
  Info,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";

interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicCarbon: number;
  moisture: number;
}

interface AnalysisResult {
  healthScore: number;
  missingNutrients: string[];
  recommendedFertilizer: string;
  organicAlternatives: string[];
  compostRecommendation: string;
  micronutrients: string[];
  waterHoldingCapacity: string;
  suitableCrops: string[];
}

const nutrientData = (data: SoilData) => [
  { name: "Nitrogen", value: data.nitrogen, fullMark: 100 },
  { name: "Phosphorus", value: data.phosphorus, fullMark: 100 },
  { name: "Potassium", value: data.potassium, fullMark: 100 },
  { name: "Organic C", value: data.organicCarbon, fullMark: 100 },
  { name: "Moisture", value: data.moisture, fullMark: 100 },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444"];

const getHealthScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

const getHealthScoreBg = (score: number) => {
  if (score >= 80) return "bg-green-100";
  if (score >= 60) return "bg-yellow-100";
  return "bg-red-100";
};

export default function SoilAnalyzerPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [soilData, setSoilData] = useState<SoilData>({
    ph: 7.0,
    nitrogen: 50,
    phosphorus: 40,
    potassium: 60,
    organicCarbon: 30,
    moisture: 45,
  });

  const [result, setResult] = useState<AnalysisResult>({
    healthScore: 72,
    missingNutrients: ["Zinc", "Boron", "Iron"],
    recommendedFertilizer: "NPK 20-20-20 with Micronutrients",
    organicAlternatives: [
      "Vermicompost - 2 tons/acre",
      "Neem Cake - 200 kg/acre",
      "Biofertilizers (Rhizobium, Azotobacter)",
    ],
    compostRecommendation: "Apply 3-4 tons of well-decomposed FYM per acre",
    micronutrients: ["Zinc Sulphate", "Borax", "Ferrous Sulphate"],
    waterHoldingCapacity: "Moderate - Consider adding organic matter",
    suitableCrops: ["Wheat", "Rice", "Soybean", "Chickpea", "Mustard"],
  });

  const handleAnalyze = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setShowResults(true);
  };

  const handleInputChange = (field: keyof SoilData, value: number) => {
    setSoilData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background p-4 pt-20 md:ml-64 md:pt-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">Soil Health Analyzer</h1>
          <p className="text-muted-foreground">
            Analyze your soil composition and get personalized recommendations
          </p>
        </motion.div>

        {!showResults ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border bg-card p-6 md:p-8"
          >
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <FlaskConical className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Enter Soil Test Results</h2>
                <p className="text-sm text-muted-foreground">
                  Input values from your soil test report
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* pH Level */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Thermometer className="h-4 w-4" />
                  Soil pH Level
                </label>
                <input
                  type="range"
                  min="0"
                  max="14"
                  step="0.1"
                  value={soilData.ph}
                  onChange={(e) => handleInputChange("ph", parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Acidic (0)</span>
                  <span className="rounded-lg bg-primary/10 px-3 py-1 text-lg font-semibold text-primary">
                    {soilData.ph.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">Alkaline (14)</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {soilData.ph < 6.5
                    ? "Acidic - Add lime to increase pH"
                    : soilData.ph > 7.5
                    ? "Alkaline - Add sulfur to decrease pH"
                    : "Neutral - Optimal for most crops"}
                </p>
              </div>

              {/* Nitrogen */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Leaf className="h-4 w-4" />
                  Nitrogen (N) kg/ha
                </label>
                <input
                  type="number"
                  value={soilData.nitrogen}
                  onChange={(e) => handleInputChange("nitrogen", parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g., 50"
                />
                <p className="text-xs text-muted-foreground">Optimal range: 280-560 kg/ha</p>
              </div>

              {/* Phosphorus */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Leaf className="h-4 w-4" />
                  Phosphorus (P) kg/ha
                </label>
                <input
                  type="number"
                  value={soilData.phosphorus}
                  onChange={(e) => handleInputChange("phosphorus", parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g., 40"
                />
                <p className="text-xs text-muted-foreground">Optimal range: 10-25 kg/ha</p>
              </div>

              {/* Potassium */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Leaf className="h-4 w-4" />
                  Potassium (K) kg/ha
                </label>
                <input
                  type="number"
                  value={soilData.potassium}
                  onChange={(e) => handleInputChange("potassium", parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g., 60"
                />
                <p className="text-xs text-muted-foreground">Optimal range: 110-280 kg/ha</p>
              </div>

              {/* Organic Carbon */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Sprout className="h-4 w-4" />
                  Organic Carbon (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={soilData.organicCarbon}
                  onChange={(e) => handleInputChange("organicCarbon", parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g., 1.5"
                />
                <p className="text-xs text-muted-foreground">Optimal: Above 0.75%</p>
              </div>

              {/* Moisture */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Droplets className="h-4 w-4" />
                  Soil Moisture (%)
                </label>
                <input
                  type="number"
                  value={soilData.moisture}
                  onChange={(e) => handleInputChange("moisture", parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g., 45"
                />
                <p className="text-xs text-muted-foreground">Optimal: 25-50%</p>
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-primary py-4 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing Soil...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Analyze Soil Health
                  <ArrowRight className="h-5 w-5" />
                </span>
              )}
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Health Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border bg-card p-6"
            >
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="text-center md:text-left">
                  <h2 className="mb-2 text-2xl font-bold">Soil Health Score</h2>
                  <p className="text-muted-foreground">
                    Based on your soil test results analysis
                  </p>
                  <div className="mt-4 flex gap-2">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-sm font-medium",
                        getHealthScoreBg(result.healthScore),
                        getHealthScoreColor(result.healthScore)
                      )}
                    >
                      {result.healthScore >= 80
                        ? "Excellent"
                        : result.healthScore >= 60
                        ? "Good"
                        : "Needs Improvement"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-32 w-32 items-center justify-center rounded-full border-8",
                      getHealthScoreBg(result.healthScore)
                    )}
                  >
                    <span
                      className={cn(
                        "text-4xl font-bold",
                        getHealthScoreColor(result.healthScore)
                      )}
                    >
                      {result.healthScore}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Charts Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Radar Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border bg-card p-6"
              >
                <h3 className="mb-4 text-lg font-semibold">Nutrient Analysis</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={nutrientData(soilData)}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Your Soil"
                        dataKey="value"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.3}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                {/* Missing Nutrients */}
                <div className="rounded-2xl border bg-card p-4">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    Deficient Nutrients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.missingNutrients.map((nutrient) => (
                      <span
                        key={nutrient}
                        className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700"
                      >
                        {nutrient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended Fertilizer */}
                <div className="rounded-2xl border bg-card p-4">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold">
                    <FlaskConical className="h-5 w-5 text-blue-600" />
                    Recommended Fertilizer
                  </h3>
                  <p className="text-sm">{result.recommendedFertilizer}</p>
                </div>

                {/* Compost Recommendation */}
                <div className="rounded-2xl border bg-card p-4">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold">
                    <Sprout className="h-5 w-5 text-green-600" />
                    Compost Recommendation
                  </h3>
                  <p className="text-sm">{result.compostRecommendation}</p>
                </div>

                {/* Water Holding Capacity */}
                <div className="rounded-2xl border bg-card p-4">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold">
                    <Droplets className="h-5 w-5 text-cyan-600" />
                    Water Holding Capacity
                  </h3>
                  <p className="text-sm">{result.waterHoldingCapacity}</p>
                </div>
              </motion.div>
            </div>

            {/* Organic Alternatives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border bg-card p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Leaf className="h-5 w-5 text-green-600" />
                Organic Alternatives
              </h3>
              <div className="grid gap-3 md:grid-cols-3">
                {result.organicAlternatives.map((alt, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl bg-green-50 p-4 dark:bg-green-900/20"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">{alt}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Suitable Crops */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border bg-card p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Sprout className="h-5 w-5 text-primary" />
                Suitable Crops for Your Soil
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.suitableCrops.map((crop) => (
                  <span
                    key={crop}
                    className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Reset Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <button
                onClick={() => setShowResults(false)}
                className="rounded-xl border px-6 py-3 font-medium transition-colors hover:bg-muted"
              >
                Analyze Another Sample
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
