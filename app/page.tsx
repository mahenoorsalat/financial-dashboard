"use client";

import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- TypeScript Interfaces ---

interface RevenueItem {
  month: string;
  revenue: number;
  expenses: number;
}

interface BudgetItem {
  category: string;
  budget: number;
  actual: number;
}

interface KPICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
  linkPath: string;
}

// Placeholder for navigation logic
const navigateTo = (path: string): void => {
  // In a real application, this would use a router (like React Router)
  console.log(`Navigating to: ${path}`);
};

// Monthly revenue data for the last 12 months (Typed)
const revenueData: RevenueItem[] = [
  { month: 'Jan', revenue: 32000, expenses: 18000 },
  { month: 'Feb', revenue: 35000, expenses: 19500 },
  { month: 'Mar', revenue: 38000, expenses: 17800 },
  { month: 'Apr', revenue: 42000, expenses: 20000 },
  { month: 'May', revenue: 39000, expenses: 18900 },
  { month: 'Jun', revenue: 41000, expenses: 19200 },
  { month: 'Jul', revenue: 45000, expenses: 21000 },
  { month: 'Aug', revenue: 43000, expenses: 19800 },
  { month: 'Sep', revenue: 46000, expenses: 20500 },
  { month: 'Oct', revenue: 44000, expenses: 19000 },
  { month: 'Nov', revenue: 48000, expenses: 21200 },
  { month: 'Dec', revenue: 47500, expenses: 20520 }
];

// Budget vs Actual for current month (Typed)
const budgetData: BudgetItem[] = [
  { category: 'Salaries', budget: 8000, actual: 7800 },
  { category: 'Marketing', budget: 3000, actual: 3500 },
  { category: 'Operations', budget: 5000, actual: 4200 },
  { category: 'Utilities', budget: 2000, actual: 1900 },
  { category: 'Others', budget: 2520, actual: 2420 }
];

// --- KPI Card Component (Typed) ---
const KPICard: React.FC<KPICardProps> = ({ title, value, icon, bgColor, linkPath }) => (
  <div
    className={`p-5 w-full rounded-xl border ${bgColor} hover:shadow-xl hover:scale-[1.02] transition duration-300 cursor-pointer flex flex-col justify-between`}
    onClick={() => navigateTo(linkPath)}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-gray-700 truncate">{title}</h3>
    </div>
    <h2 className="text-3xl font-bold text-purple-800 truncate">{value}</h2>
  </div>
);

// --- Main Dashboard Component ---
const App: React.FC = () => {
  // Calculated summaries for Net Income
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0);
  const netIncome = totalRevenue - totalExpenses;

  // Formatting helper
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  // KPI icons from lucide-react (simulated with inline SVG as external libraries are restricted)

  const DollarSignIcon = (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 1v22"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
  );

  const BanknoteIcon = (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2 10h20"></path><path d="M6 16h12"></path><path d="M6 16c0 1.1 0 2-2 2"></path><path d="M18 16c0 1.1 0 2 2 2"></path><path d="M20 10c0-1.1-1.1-2-2-2"></path><path d="M6 8c-1.1 0-2 0-2 2"></path></svg>
  );

  const TrendingUpIcon = (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
  );

  const UserXIcon = (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line></svg>
  );


  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <style>{`
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 border-purple-200 pb-3">
        💰 Financial Health Dashboard
      </h1>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Revenue (YTD)"
          value={formatCurrency(totalRevenue)}
          icon={DollarSignIcon}
          bgColor="bg-green-50 border-green-200"
          linkPath="/finance/revenue-details"
        />
        <KPICard
          title="Total Expenses (YTD)"
          value={formatCurrency(totalExpenses)}
          icon={BanknoteIcon}
          bgColor="bg-red-50 border-red-200"
          linkPath="/finance/operational-expenses"
        />
        <KPICard
          title="Net Income (YTD)"
          value={formatCurrency(netIncome)}
          icon={TrendingUpIcon}
          bgColor="bg-blue-50 border-blue-200"
          linkPath="/finance/day-book"
        />
        <KPICard
          title="Unpaid Student Fees"
          value="45"
          icon={UserXIcon}
          bgColor="bg-yellow-50 border-yellow-200"
          linkPath="/finance/studentfees"
        />
      </div>

      {/* Graphics & Detailed Links Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Trend Graph */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Revenue & Expense Trend (Last 12 Months)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" className="text-sm" />
              <YAxis tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}K`} className="text-sm" />
              <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
              <Legend wrapperStyle={{ paddingTop: '10px' }}/>
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#6b21a8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
          <button
            onClick={() => navigateTo('/finance/categories')}
            className="mt-6 w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-200 transform hover:scale-[1.01]"
          >
            Detailed P&L Statement
          </button>
        </div>

        {/* Budget vs. Actual Graph */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Budget vs. Actual (Current Month)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tickFormatter={(value: number) => `$${(value / 1000).toFixed(1)}K`} className="text-sm" />
              <YAxis dataKey="category" type="category" className="text-sm" width={80} />
              <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar dataKey="budget" name="Budget" fill="#818cf8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" name="Actual" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <button
            onClick={() => navigateTo('/finance/budget-planner')}
            className="mt-6 w-full py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition duration-200 transform hover:scale-[1.01]"
          >
            Manage Budget Planner
          </button>
        </div>
      </div>
      
      {/* Utility Links/Secondary Metrics */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Quick Actions & Utilities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigateTo('/finance/receipts')}
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl hover:bg-purple-50 transition duration-200 flex items-center justify-center border border-gray-100 text-purple-700 font-semibold text-lg"
          >
            🧾 View Receipts
          </button>
          <button
            onClick={() => navigateTo('/finance/bank-reconciliation')}
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl hover:bg-purple-50 transition duration-200 flex items-center justify-center border border-gray-100 text-purple-700 font-semibold text-lg"
          >
            🏦 Bank Reconciliation
          </button>
          <button
            onClick={() => navigateTo('/finance/payroll')}
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl hover:bg-purple-50 transition duration-200 flex items-center justify-center border border-gray-100 text-purple-700 font-semibold text-lg"
          >
            💼 Manage Payroll
          </button>
          <button
            onClick={() => navigateTo('/finance/Inventory')}
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl hover:bg-purple-50 transition duration-200 flex items-center justify-center border border-gray-100 text-purple-700 font-semibold text-lg"
          >
            📦 Check Inventory Value
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;