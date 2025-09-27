// Tax calculation utilities for Indian tax system

export const calculateOldRegimeTax = (income, deductions) => {
  const { section80C, section80D, hra, nps } = deductions;
  
  // Standard deduction
  const standardDeduction = Math.min(50000, income);
  
  // Total deductions under old regime
  const totalDeductions = standardDeduction + 
                         Math.min(section80C || 0, 150000) +
                         Math.min(section80D || 0, 25000) +
                         (hra || 0) +
                         Math.min(nps || 0, 50000);
  
  const taxableIncome = Math.max(0, income - totalDeductions);
  
  let tax = 0;
  
  // Tax slabs for old regime (FY 2023-24)
  if (taxableIncome <= 250000) {
    tax = 0;
  } else if (taxableIncome <= 500000) {
    tax = (taxableIncome - 250000) * 0.05;
  } else if (taxableIncome <= 1000000) {
    tax = 12500 + (taxableIncome - 500000) * 0.2;
  } else {
    tax = 112500 + (taxableIncome - 1000000) * 0.3;
  }
  
  // Add cess
  const cess = tax * 0.04;
  
  return {
    taxableIncome,
    tax: tax + cess,
    totalDeductions,
    netIncome: income - (tax + cess)
  };
};

export const calculateNewRegimeTax = (income) => {
  const taxableIncome = Math.max(0, income);
  
  let tax = 0;
  
  // Tax slabs for new regime (FY 2023-24)
  if (taxableIncome <= 300000) {
    tax = 0;
  } else if (taxableIncome <= 600000) {
    tax = (taxableIncome - 300000) * 0.05;
  } else if (taxableIncome <= 900000) {
    tax = 15000 + (taxableIncome - 600000) * 0.1;
  } else if (taxableIncome <= 1200000) {
    tax = 45000 + (taxableIncome - 900000) * 0.15;
  } else if (taxableIncome <= 1500000) {
    tax = 90000 + (taxableIncome - 1200000) * 0.2;
  } else {
    tax = 150000 + (taxableIncome - 1500000) * 0.3;
  }
  
  // Add cess
  const cess = tax * 0.04;
  
  return {
    taxableIncome,
    tax: tax + cess,
    totalDeductions: 0,
    netIncome: income - (tax + cess)
  };
};

export const getTaxRecommendation = (oldRegimeResult, newRegimeResult) => {
  if (oldRegimeResult.tax < newRegimeResult.tax) {
    return {
      recommended: 'old',
      savings: newRegimeResult.tax - oldRegimeResult.tax,
      reason: 'Old regime offers better tax savings due to available deductions.'
    };
  } else if (newRegimeResult.tax < oldRegimeResult.tax) {
    return {
      recommended: 'new',
      savings: oldRegimeResult.tax - newRegimeResult.tax,
      reason: 'New regime offers lower tax liability with simplified structure.'
    };
  } else {
    return {
      recommended: 'equal',
      savings: 0,
      reason: 'Both regimes result in similar tax liability.'
    };
  }
};