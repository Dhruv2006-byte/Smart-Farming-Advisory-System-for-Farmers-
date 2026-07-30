"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  IndianRupee,
  Plus,
  TrendingUp,
  TrendingDown,
  Calendar,
  PieChart,
  Download,
  Sprout,
  Tractor,
  Users,
  Droplets,
  Package,
  Truck,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const expenseCategories = [
  { id: "seeds", name: "Seeds", icon: Sprout, color: "#22c55e" },
  { id: "fertilizer", name: "Fertilizer", icon: Package, color: "#3b82f6" },
  { id: "pesticides", name: "Pesticides", icon: Droplets, color: "#ef4444" },
  { id: "labour", name: "Labour", icon: Users, color: "#f59e0b" },
  { id: "irrigation", name: "Irrigation", icon: Droplets, color: "#06b6d4" },
  { id: "machinery", name: "Machinery", icon: Tractor, color: "#8b5cf6" },
  { id: "transport", name: "Transport", icon: Truck, color: "#ec4899" },
  { id: "misc", name: "Miscellaneous", icon: MoreHorizontal, color: "#6b7280" },
];

const recentTransactions = [
  { id: 1, category: "seeds", description: "Wheat seeds - HD-2967", amount: 12500, date: "2024-07-05", type: "expense" },
  { id: 2, category: "fertilizer", description: "Urea - 10 bags", amount: 6500, date: "2024-07-03", type: "expense" },
  { id: 3, category: "labour", description: "Sowing labor charges", amount: 8000, date: "2024-07-01", type: "expense" },
  { id: 4, category: "machinery", description: "Tractor rental", amount: 4500, date: "2024-06-28", type: "expense" },
  { id: 5, category: "misc", description: "Wheat sale - 40 quintals", amount: 97000, date: "2024-06-25", type: "income" },
];

const monthlyData = [
  { month: "Jan", expenses: 25000, income: 0 },
  { month: "Feb", expenses: 18000, income: 0 },
  { month: "Mar", expenses: 12000, income: 45000 },
  { month: "Apr", expenses: 35000, income: 0 },
  { month: "May", expenses: 28000, income: 0 },
  { month: "Jun", expenses: 15000, income: 97000 },
  { month: "Jul", expenses: 27000, income: 0 },
];

const pieData = [
  { name: "Seeds", value: 12500, color: "#22c55e" },
  { name: "Fertilizer", value: 15000, color: "#3b82f6" },
  { name: "Labour", value: 20000, color: "#f59e0b" },
  { name: "Machinery", value: 12000, color: "#8b5cf6" },
  { name: "Others", value: 8000, color: "#6b7280" },
];

export default function ExpensesPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "reports">("overview");
  const [showAddModal, setShowAddModal] = useState(false);

  const totalExpenses = recentTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = recentTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const profit = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-background p-4 pt-20 md:ml-64 md:pt-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Farm Expenses</h1>
            <p className="text-muted-foreground">Track your farm income and expenses</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="h-5 w-5" />
            Add Transaction
          </button>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          <div className="rounded-2xl border bg-card p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
          </div>
          <div className="rounded-2xl border bg-card p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground">Total Income</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="rounded-2xl border bg-card p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <IndianRupee className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-sm text-muted-foreground">Net Profit</p>
            <p className={cn("text-2xl font-bold", profit >= 0 ? "text-green-600" : "text-red-600")}>
              {formatCurrency(profit)}
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
              <PieChart className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-sm text-muted-foreground">Transactions</p>
            <p className="text-2xl font-bold">{recentTransactions.length}</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex gap-2 border-b"
        >
          {(["overview", "transactions", "reports"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "border-b-2 px-4 py-3 text-sm font-medium capitalize transition-colors",
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Monthly Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border bg-card p-6"
            >
              <h3 className="mb-4 text-lg font-semibold">Income vs Expenses</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                    <Bar dataKey="income" fill="#22c55e" name="Income" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Expense Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border bg-card p-6"
            >
              <h3 className="mb-4 text-lg font-semibold">Expense Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border bg-card p-6 lg:col-span-2"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                <button className="flex items-center gap-1 text-sm font-medium text-primary">
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between rounded-xl bg-muted p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl",
                          transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                        )}
                      >
                        {transaction.type === "income" ? (
                          <ArrowUpRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <p
                      className={cn(
                        "font-semibold",
                        transaction.type === "income" ? "text-green-600" : "text-red-600"
                      )}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === "transactions" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border bg-card p-6"
          >
            <h3 className="mb-4 text-lg font-semibold">All Transactions</h3>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-xl bg-muted p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl",
                        transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                      )}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpRight className="h-5 w-5 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.date} • {transaction.category}
                      </p>
                    </div>
                  </div>
                  <p
                    className={cn(
                      "font-semibold",
                      transaction.type === "income" ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "reports" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border bg-card p-6"
          >
            <h3 className="mb-4 text-lg font-semibold">Financial Reports</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <button className="rounded-xl border p-4 text-left transition-colors hover:bg-muted">
                <p className="font-medium">Monthly Summary</p>
                <p className="text-sm text-muted-foreground">July 2024</p>
              </button>
              <button className="rounded-xl border p-4 text-left transition-colors hover:bg-muted">
                <p className="font-medium">Quarterly Report</p>
                <p className="text-sm text-muted-foreground">Q2 2024</p>
              </button>
              <button className="rounded-xl border p-4 text-left transition-colors hover:bg-muted">
                <p className="font-medium">Annual Statement</p>
                <p className="text-sm text-muted-foreground">2024</p>
              </button>
              <button className="rounded-xl border p-4 text-left transition-colors hover:bg-muted">
                <p className="font-medium">Crop-wise Analysis</p>
                <p className="text-sm text-muted-foreground">All crops</p>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
