// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ExpenseProvider } from './context/ExpenseContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import TaxOptimization from './pages/TaxOptimization';
import CibilAdvisor from './pages/CibilAdvisor';
import Settings from './pages/Settings';

function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/tax-optimization" element={<TaxOptimization />} />
            <Route path="/cibil-advisor" element={<CibilAdvisor />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </ExpenseProvider>
  );
}

export default App;