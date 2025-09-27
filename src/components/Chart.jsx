import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';

// CIBIL Score Gauge Component
export const CibilGauge = ({ score, size = 200 }) => {
  const percentage = (score / 850) * 100;
  const strokeDasharray = `${percentage * 2.51} 251`;
  
  const getScoreColor = (score) => {
    if (score >= 750) return '#22c55e'; // Green
    if (score >= 650) return '#eab308'; // Yellow
    if (score >= 550) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  const getScoreText = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 550) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r="80"
            stroke="#e5e7eb"
            strokeWidth="20"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r="80"
            stroke={getScoreColor(score)}
            strokeWidth="20"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-800">{score}</span>
          <span className="text-sm text-gray-500">{getScoreText(score)}</span>
        </div>
      </div>
    </div>
  );
};

// Expense Pie Chart Component
export const ExpensePieChart = ({ data }) => {
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Monthly Expenses Bar Chart
export const MonthlyExpensesChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
        <Legend />
        <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
        <Bar dataKey="income" fill="#10b981" name="Income" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Tax Comparison Chart
export const TaxComparisonChart = ({ oldRegime, newRegime }) => {
  const data = [
    {
      name: 'Tax Liability',
      'Old Regime': oldRegime,
      'New Regime': newRegime,
    }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
        <Legend />
        <Bar dataKey="Old Regime" fill="#8884d8" />
        <Bar dataKey="New Regime" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};