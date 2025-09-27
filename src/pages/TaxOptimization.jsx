import React, { useState } from 'react';
import { calculateOldRegimeTax, calculateNewRegimeTax, getTaxRecommendation } from '../utils/taxCalculations';
import { TaxComparisonChart } from '../components/Chart';
import { 
  Calculator, 
  IndianRupee, 
  TrendingDown, 
  Award, 
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const TaxOptimization = () => {
  const [income, setIncome] = useState('');
  const [deductions, setDeductions] = useState({
    section80C: '',
    section80D: '',
    hra: '',
    nps: ''
  });
  const [results, setResults] = useState(null);
  const [showCalculation, setShowCalculation] = useState(false);

  const handleCalculate = () => {
    const annualIncome = parseFloat(income) || 0;
    
    if (annualIncome <= 0) {
      alert('Please enter a valid annual income');
      return;
    }

    const deductionAmounts = {
      section80C: parseFloat(deductions.section80C) || 0,
      section80D: parseFloat(deductions.section80D) || 0,
      hra: parseFloat(deductions.hra) || 0,
      nps: parseFloat(deductions.nps) || 0
    };

    const oldRegimeResult = calculateOldRegimeTax(annualIncome, deductionAmounts);
    const newRegimeResult = calculateNewRegimeTax(annualIncome);
    const recommendation = getTaxRecommendation(oldRegimeResult, newRegimeResult);

    setResults({
      oldRegime: oldRegimeResult,
      newRegime: newRegimeResult,
      recommendation
    });
    setShowCalculation(true);
  };

  const handleReset = () => {
    setIncome('');
    setDeductions({
      section80C: '',
      section80D: '',
      hra: '',
      nps: ''
    });
    setResults(null);
    setShowCalculation(false);
  };

  const taxSavingTips = [
    {
      title: 'Section 80C Investments',
      description: 'Invest up to ₹1.5 lakh in ELSS, PPF, NSC, or life insurance premiums',
      maxSaving: 46800
    },
    {
      title: 'Health Insurance (80D)',
      description: 'Get deduction up to ₹25,000 for health insurance premiums',
      maxSaving: 7800
    },
    {
      title: 'NPS Additional (80CCD(1B))',
      description: 'Additional ₹50,000 deduction for NPS investments',
      maxSaving: 15600
    },
    {
      title: 'HRA Exemption',
      description: 'Claim HRA exemption if you live in a rented house',
      maxSaving: 'Variable'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center mb-4">
          <Calculator className="w-10 h-10 mr-4 text-blue-600" />
          Tax Optimization
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Compare old vs new tax regimes and find the best way to minimize your tax liability
        </p>
      </div>

      {/* Tax Calculator Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <IndianRupee className="w-6 h-6 mr-2 text-green-600" />
          Tax Calculator
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Income Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Income (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="1000000"
                min="0"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Quick Income Guide
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Include salary, bonuses, and allowances</li>
                <li>• Add rental income if applicable</li>
                <li>• Include other sources of income</li>
              </ul>
            </div>
          </div>

          {/* Deductions Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Deductions (Old Regime Only)
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section 80C (₹)
              </label>
              <input
                type="number"
                value={deductions.section80C}
                onChange={(e) => setDeductions({ ...deductions, section80C: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="150000 (Max limit)"
                min="0"
                max="150000"
              />
              <p className="text-xs text-gray-500 mt-1">PPF, ELSS, Life Insurance, NSC (Max: ₹1.5L)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section 80D - Health Insurance (₹)
              </label>
              <input
                type="number"
                value={deductions.section80D}
                onChange={(e) => setDeductions({ ...deductions, section80D: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="25000 (Max limit)"
                min="0"
                max="25000"
              />
              <p className="text-xs text-gray-500 mt-1">Health insurance premiums (Max: ₹25k)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HRA Exemption (₹)
              </label>
              <input
                type="number"
                value={deductions.hra}
                onChange={(e) => setDeductions({ ...deductions, hra: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="House Rent Allowance"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">HRA received from employer</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NPS Additional 80CCD(1B) (₹)
              </label>
              <input
                type="number"
                value={deductions.nps}
                onChange={(e) => setDeductions({ ...deductions, nps: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="50000 (Max limit)"
                min="0"
                max="50000"
              />
              <p className="text-xs text-gray-500 mt-1">Additional NPS investment (Max: ₹50k)</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleCalculate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Tax
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Tax Comparison Results */}
      {results && showCalculation && (
        <div className="space-y-8">
          {/* Recommendation Card */}
          <div className={`p-6 rounded-2xl shadow-lg ${
            results.recommendation.recommended === 'old' 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
              : results.recommendation.recommended === 'new'
              ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200'
              : 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200'
          }`}>
            <div className="flex items-center mb-4">
              {results.recommendation.recommended !== 'equal' ? (
                <Award className={`w-8 h-8 mr-3 ${
                  results.recommendation.recommended === 'old' ? 'text-green-600' : 'text-blue-600'
                }`} />
              ) : (
                <AlertCircle className="w-8 h-8 mr-3 text-yellow-600" />
              )}
              <h3 className="text-2xl font-bold text-gray-800">
                {results.recommendation.recommended === 'old' ? 'Old Regime Recommended' :
                 results.recommendation.recommended === 'new' ? 'New Regime Recommended' :
                 'Both Regimes Equal'}
              </h3>
            </div>
            <p className="text-lg text-gray-700 mb-4">{results.recommendation.reason}</p>
            {results.recommendation.savings > 0 && (
              <div className="flex items-center">
                <TrendingDown className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-xl font-semibold text-green-600">
                  Save ₹{results.recommendation.savings.toLocaleString()} annually
                </span>
              </div>
            )}
          </div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Old Regime Card */}
            <div className={`bg-white p-6 rounded-2xl shadow-lg border-2 ${
              results.recommendation.recommended === 'old' ? 'border-green-500' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Old Tax Regime</h3>
                {results.recommendation.recommended === 'old' && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Recommended
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Gross Income:</span>
                  <span className="font-medium">₹{parseFloat(income).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Deductions:</span>
                  <span className="font-medium text-green-600">-₹{results.oldRegime.totalDeductions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Taxable Income:</span>
                  <span className="font-medium">₹{results.oldRegime.taxableIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Tax Payable:</span>
                  <span className="font-medium text-red-600">₹{Math.round(results.oldRegime.tax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-gray-50 px-4 rounded-lg">
                  <span className="font-semibold text-gray-800">Net Income:</span>
                  <span className="font-bold text-xl text-green-600">₹{Math.round(results.oldRegime.netIncome).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* New Regime Card */}
            <div className={`bg-white p-6 rounded-2xl shadow-lg border-2 ${
              results.recommendation.recommended === 'new' ? 'border-blue-500' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">New Tax Regime</h3>
                {results.recommendation.recommended === 'new' && (
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Recommended
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Gross Income:</span>
                  <span className="font-medium">₹{parseFloat(income).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Deductions:</span>
                  <span className="font-medium text-gray-400">₹0 (No deductions)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Taxable Income:</span>
                  <span className="font-medium">₹{results.newRegime.taxableIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Tax Payable:</span>
                  <span className="font-medium text-red-600">₹{Math.round(results.newRegime.tax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-gray-50 px-4 rounded-lg">
                  <span className="font-semibold text-gray-800">Net Income:</span>
                  <span className="font-bold text-xl text-green-600">₹{Math.round(results.newRegime.netIncome).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Comparison Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Tax Liability Comparison</h3>
            <TaxComparisonChart 
              oldRegime={Math.round(results.oldRegime.tax)}
              newRegime={Math.round(results.newRegime.tax)}
            />
          </div>
        </div>
      )}

      {/* Tax Saving Tips */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <TrendingDown className="w-6 h-6 mr-2 text-green-600" />
          Tax Saving Tips
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {taxSavingTips.map((tip, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{tip.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Max tax saving (30% bracket):</span>
                <span className="font-semibold text-green-600">
                  {typeof tip.maxSaving === 'number' ? `₹${tip.maxSaving.toLocaleString()}` : tip.maxSaving}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaxOptimization;