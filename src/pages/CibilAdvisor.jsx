// CibilAdvisor.jsx
import React, { useState } from 'react';
import './CibilAdvisor.css';

const CibilAdvisor = () => {
  // Form state
  const [formData, setFormData] = useState({
    creditScore: '',
    creditUtilization: '',
    latePayments: '',
    creditAge: '',
    newAccounts: ''
  });

  // Result state
  const [advice, setAdvice] = useState(null);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear previous errors when user types
    if (error) setError('');
  };

  // Validate inputs
  const validateInputs = () => {
    const { creditScore, creditUtilization, latePayments, creditAge, newAccounts } = formData;
    
    if (!creditScore || creditScore < 300 || creditScore > 900) {
      return 'Credit Score must be between 300-900';
    }
    if (!creditUtilization || creditUtilization < 0 || creditUtilization > 100) {
      return 'Credit Utilization must be between 0-100%';
    }
    if (latePayments === '' || latePayments < 0) {
      return 'Late Payments must be a positive number';
    }
    if (!creditAge || creditAge <= 0) {
      return 'Credit Age must be greater than 0 years';
    }
    if (newAccounts === '' || newAccounts < 0) {
      return 'New Accounts must be a positive number';
    }
    return null;
  };

  // Generate personalized advice
  const generateAdvice = () => {
    const { creditScore, creditUtilization, latePayments, creditAge, newAccounts } = formData;
    const score = parseInt(creditScore);
    const utilization = parseInt(creditUtilization);
    const late = parseInt(latePayments);
    const age = parseFloat(creditAge);
    const newAcc = parseInt(newAccounts);

    let recommendations = [];
    let category = '';

    // Score category
    if (score >= 750) {
      category = 'Excellent';
      recommendations.push('Maintain your excellent payment history!');
    } else if (score >= 700) {
      category = 'Good';
      recommendations.push('Aim to reduce credit utilization below 30%');
    } else if (score >= 650) {
      category = 'Fair';
      recommendations.push('Avoid new credit applications for 6 months');
    } else {
      category = 'Poor';
      recommendations.push('Focus on clearing outstanding debts immediately');
    }

    // Utilization advice
    if (utilization > 30) {
      recommendations.push(`Your credit utilization is high (${utilization}%). Aim to keep it below 30%`);
    }

    // Payment history
    if (late > 0) {
      recommendations.push(`You have ${late} late payment(s). Set up automatic payments to avoid future delays`);
    }

    // Credit age
    if (age < 2) {
      recommendations.push('Your credit history is short. Keep oldest accounts active');
    }

    // New accounts
    if (newAcc > 2) {
      recommendations.push(`You've opened ${newAcc} new accounts recently. Avoid new credit for 6 months`);
    }

    return {
      score,
      category,
      recommendations
    };
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    
    if (validationError) {
      setError(validationError);
      return;
    }

    const result = generateAdvice();
    setAdvice(result);
    setError('');
  };

  return (
    <div className="cibil-advisor-container">
      <div className="card">
        <h1 className="title">CIBIL Score Advisor</h1>
        <p className="subtitle">Get personalized credit improvement tips</p>

        <form onSubmit={handleSubmit} className="advisor-form">
          <div className="form-group">
            <label htmlFor="creditScore">Current Credit Score *</label>
            <input
              type="number"
              id="creditScore"
              name="creditScore"
              value={formData.creditScore}
              onChange={handleChange}
              min="300"
              max="900"
              placeholder="e.g., 720"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="creditUtilization">Credit Utilization (%) *</label>
            <input
              type="number"
              id="creditUtilization"
              name="creditUtilization"
              value={formData.creditUtilization}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="e.g., 45"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="latePayments">Late Payments (Last 12 Months) *</label>
            <input
              type="number"
              id="latePayments"
              name="latePayments"
              value={formData.latePayments}
              onChange={handleChange}
              min="0"
              placeholder="e.g., 2"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="creditAge">Credit History Length (Years) *</label>
            <input
              type="number"
              id="creditAge"
              name="creditAge"
              value={formData.creditAge}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="e.g., 3.5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="newAccounts">New Credit Accounts (Last 6 Months) *</label>
            <input
              type="number"
              id="newAccounts"
              name="newAccounts"
              value={formData.newAccounts}
              onChange={handleChange}
              min="0"
              placeholder="e.g., 1"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn">
            Get My Advice
          </button>
        </form>

        {advice && (
          <div className="results">
            <h2>Your Credit Profile</h2>
            <div className={`score-badge ${advice.category.toLowerCase()}`}>
              {advice.score} ({advice.category})
            </div>
            
            <h3>Recommended Actions:</h3>
            <ul className="recommendations">
              {advice.recommendations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <div className="disclaimer">
              <p><strong>Note:</strong> This is simulated advice. For actual credit reports, contact official bureaus like CIBIL™.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CibilAdvisor;