"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Landmark,
  IndianRupee,
  Users,
  Shield,
  CreditCard,
  Sun,
  FileText,
  ChevronRight,
  ExternalLink,
  CheckCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

const schemes = [
  {
    id: "pmkisan",
    name: "PM-KISAN",
    fullName: "Pradhan Mantri Kisan Samman Nidhi",
    icon: IndianRupee,
    color: "bg-green-500",
    description: "Direct income support of ₹6,000 per year to farmer families",
    eligibility: [
      "Small and marginal farmer families",
      "Landholding up to 2 hectares",
      "Valid bank account and Aadhaar",
    ],
    benefits: [
      "₹6,000 per year in three installments",
      "Direct transfer to bank account",
      "No middlemen involved",
    ],
    documents: ["Aadhaar Card", "Land Records", "Bank Passbook", "Mobile Number"],
    status: "Active",
    website: "https://pmkisan.gov.in",
  },
  {
    id: "crop-insurance",
    name: "PMFBY",
    fullName: "Pradhan Mantri Fasal Bima Yojana",
    icon: Shield,
    color: "bg-blue-500",
    description: "Comprehensive crop insurance against natural calamities",
    eligibility: [
      "All farmers growing notified crops",
      "Loanee and non-loanee farmers",
      "Tenant farmers and sharecroppers",
    ],
    benefits: [
      "Low premium rates (1.5% to 5%)",
      "Coverage for all stages of crop",
      "Quick claim settlement",
    ],
    documents: ["Aadhaar Card", "Land Records", "Bank Details", "Sowing Certificate"],
    status: "Active",
    website: "https://pmfby.gov.in",
  },
  {
    id: "kcc",
    name: "Kisan Credit Card",
    fullName: "Kisan Credit Card Scheme",
    icon: CreditCard,
    color: "bg-amber-500",
    description: "Easy credit access for farmers at low interest rates",
    eligibility: [
      "Individual farmers",
      "Tenant farmers and sharecroppers",
      "Self-help groups",
    ],
    benefits: [
      "Loan up to ₹3 lakh at 7% interest",
      "Additional 3% subvention for timely repayment",
      "Flexible repayment options",
    ],
    documents: ["Aadhaar Card", "Land Records", "Passport Photo", "Bank Statement"],
    status: "Active",
    website: "https://www.nabard.org",
  },
  {
    id: "solar-pump",
    name: "PM-KUSUM",
    fullName: "Solar Pump Scheme",
    icon: Sun,
    color: "bg-yellow-500",
    description: "Solar-powered agricultural pumps for irrigation",
    eligibility: [
      "Farmers with electric connection",
      "Irrigation pump owners",
      "Rural farmers",
    ],
    benefits: [
      "60% subsidy on solar pumps",
      "Reduced electricity bills",
      "Reliable irrigation source",
    ],
    documents: ["Aadhaar Card", "Land Records", "Electricity Bill", "Bank Details"],
    status: "Active",
    website: "https://mnre.gov.in",
  },
  {
    id: "soil-health",
    name: "Soil Health Card",
    fullName: "Soil Health Card Scheme",
    icon: FileText,
    color: "bg-emerald-500",
    description: "Free soil testing and health cards for farmers",
    eligibility: [
      "All farmers",
      "No land limit",
      "Free for all eligible farmers",
    ],
    benefits: [
      "Free soil testing every 3 years",
      "Detailed nutrient status report",
      "Fertilizer recommendations",
    ],
    documents: ["Aadhaar Card", "Land Records", "Mobile Number"],
    status: "Active",
    website: "https://soilhealth.dac.gov.in",
  },
  {
    id: "paramsugandha",
    name: "Paramparagat Krishi Vikas",
    fullName: "Traditional Farming Development",
    icon: Users,
    color: "bg-purple-500",
    description: "Promotion of organic farming in clusters",
    eligibility: [
      "Farmers willing to adopt organic farming",
      "Minimum 50 farmers per cluster",
      "20-50 hectare area per cluster",
    ],
    benefits: [
      "₹50,000 per hectare assistance",
      "Organic certification support",
      "Marketing assistance",
    ],
    documents: ["Aadhaar Card", "Land Records", "Bank Details", "Cluster Details"],
    status: "Active",
    website: "https://pgsindia-ncof.gov.in",
  },
];

export default function SchemesPage() {
  const [selectedScheme, setSelectedScheme] = useState<typeof schemes[0] | null>(null);

  return (
    <div className="min-h-screen bg-background p-4 pt-20 md:ml-64 md:pt-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">Government Schemes</h1>
          <p className="text-muted-foreground">
            Explore and apply for various government schemes for farmers
          </p>
        </motion.div>

        {!selectedScheme ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {schemes.map((scheme, index) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedScheme(scheme)}
                className="group cursor-pointer rounded-2xl border bg-card p-6 transition-all hover:shadow-lg"
              >
                <div className={`mb-4 inline-flex rounded-xl ${scheme.color} p-3`}>
                  <scheme.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-1 text-lg font-semibold group-hover:text-primary">
                  {scheme.name}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">{scheme.fullName}</p>
                <p className="text-sm">{scheme.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                  View Details
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedScheme(null)}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Back to all schemes
            </button>

            {/* Header */}
            <div className="rounded-2xl border bg-card p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <div className={`rounded-xl ${selectedScheme.color} p-4`}>
                    <selectedScheme.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedScheme.name}</h2>
                    <p className="text-muted-foreground">{selectedScheme.fullName}</p>
                    <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      {selectedScheme.status}
                    </span>
                  </div>
                </div>
                <a
                  href={selectedScheme.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <ExternalLink className="h-4 w-4" />
                  Apply Online
                </a>
              </div>
              <p className="mt-4 text-muted-foreground">{selectedScheme.description}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Eligibility */}
              <div className="rounded-2xl border bg-card p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Eligibility Criteria
                </h3>
                <ul className="space-y-2">
                  {selectedScheme.eligibility.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="rounded-2xl border bg-card p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  Benefits
                </h3>
                <ul className="space-y-2">
                  {selectedScheme.benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents */}
              <div className="rounded-2xl border bg-card p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <FileText className="h-5 w-5 text-amber-600" />
                  Required Documents
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedScheme.documents.map((doc, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-muted px-3 py-1 text-sm font-medium"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Application Process */}
              <div className="rounded-2xl border bg-card p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Info className="h-5 w-5 text-blue-600" />
                  How to Apply
                </h3>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      1
                    </span>
                    Visit the official website
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      2
                    </span>
                    Register with your Aadhaar number
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      3
                    </span>
                    Fill in the application form
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      4
                    </span>
                    Upload required documents
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      5
                    </span>
                    Submit and track application status
                  </li>
                </ol>
              </div>
            </div>

            {/* Helpline */}
            <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-primary/10 p-6">
              <h3 className="mb-2 text-lg font-semibold">Need Help?</h3>
              <p className="mb-4 text-muted-foreground">
                Contact our support team for assistance with application process
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:1800-180-1551"
                  className="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Call Helpline: 1800-180-1551
                </a>
                <button className="rounded-xl border px-6 py-3 font-medium transition-colors hover:bg-muted">
                  Find Nearest CSC
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
