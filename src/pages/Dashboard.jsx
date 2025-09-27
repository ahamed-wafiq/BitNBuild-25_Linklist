import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import { CibilGauge, ExpensePieChart, MonthlyExpensesChart } from '../components/Chart';
import { 
  Receipt, 
  Calculator, 
  TrendingUp, 
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Award
} from 'lucide-react';

const Dashboard = () => {
  const { expenses, getMonthlyExpenses, getExpensesByCategory, loading } = useExpense();

  // Mock data for demonstration
  const monthlyExpenses = getMonthlyExpenses();
  const cibilScore = 750;
  const taxSavingsOld = 45000;
  const taxSavingsNew = 39000;
  const recommendedRegime = taxSavingsOld > taxSavingsNew ? 'Old' : 'New';
  const maxSavings = Math.max(taxSavingsOld, taxSavingsNew);

  // Prepare expense data for charts
  const expensesByCategory = getExpensesByCategory();
  const pieChartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  // Mock monthly data for trends
  const monthlyTrendsData = [
    { month: 'Jan', expenses: 8200, income: 75000 },
    { month: 'Feb', expenses: 6800, income: 75000 },
    { month: 'Mar', expenses: 9500, income: 75000 },
    { month: 'Apr', expenses: monthlyExpenses, income: 75000 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your financial overview.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Monthly Expenses Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Receipt className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-sm font-medium text-gray-600">Monthly Expenses</h3>
            </div>
            <div className="flex items-center text-red-500">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">₹{monthlyExpenses.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        {/* Tax Savings Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Calculator className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-sm font-medium text-gray-600">Tax Savings</h3>
            </div>
            <div className="flex items-center text-green-500">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">₹{maxSavings.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">{recommendedRegime} Regime</p>
        </div>

        {/* CIBIL Score Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-sm font-medium text-gray-600">CIBIL Score</h3>
            </div>
            <div className="flex items-center text-green-500">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">{cibilScore}</p>
          <p className="text-sm text-gray-500 mt-2">Excellent</p>
        </div>

        {/* Savings Goal Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Target className="w-8 h-8 text-yellow-600 mr-3" />
              <h3 className="text-sm font-medium text-gray-600">Savings Goal</h3>
            </div>
            <div className="flex items-center text-green-500">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">75%</p>
          <p className="text-sm text-gray-500 mt-2">₹45k of ₹60k</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Expense Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Receipt className="w-5 h-5 mr-2 text-blue-600" />
            Expense Breakdown
          </h3>
          {pieChartData.length > 0 ? (
            <ExpensePieChart data={pieChartData} />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <p>No expense data available</p>
            </div>
          )}
        </div>

        {/* CIBIL Score Gauge */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
            CIBIL Score Overview
          </h3>
          <div className="flex flex-col items-center">
            <CibilGauge score={cibilScore} />
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Poor (300-549)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span>Good (650-749)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Excellent (750+)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <IndianRupee className="w-5 h-5 mr-2 text-green-600" />
          Monthly Income vs Expenses
        </h3>
        <MonthlyExpensesChart data={monthlyTrendsData} />
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <Receipt className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-800">Add Expense</h4>
                <p className="text-sm text-gray-500">Record a new expense</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <Calculator className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-800">Tax Calculator</h4>
                <p className="text-sm text-gray-500">Optimize your taxes</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <Award className="w-6 h-6 text-purple-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-800">CIBIL Tips</h4>
                <p className="text-sm text-gray-500">Improve your score</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;