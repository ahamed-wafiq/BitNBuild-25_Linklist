import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('taxwise-expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    } else {
      // Initialize with dummy data
      const dummyExpenses = [
        {
          id: 1,
          date: '2024-01-15',
          category: 'Food',
          amount: 2500,
          notes: 'Monthly groceries'
        },
        {
          id: 2,
          date: '2024-01-10',
          category: 'Transport',
          amount: 1200,
          notes: 'Fuel and maintenance'
        },
        {
          id: 3,
          date: '2024-01-05',
          category: 'Utilities',
          amount: 3500,
          notes: 'Electricity and water bill'
        },
        {
          id: 4,
          date: '2024-01-03',
          category: 'Entertainment',
          amount: 800,
          notes: 'Movie tickets and dinner'
        }
      ];
      setExpenses(dummyExpenses);
      localStorage.setItem('taxwise-expenses', JSON.stringify(dummyExpenses));
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever expenses change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('taxwise-expenses', JSON.stringify(expenses));
    }
  }, [expenses, loading]);

  const addExpense = (expense) => {
    const newExpense = { ...expense, id: Date.now() };
    setExpenses(prev => [...prev, newExpense]);
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === id ? { ...updatedExpense, id } : expense
      )
    );
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const getTotalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getExpensesByCategory = () => {
    const categories = {};
    expenses.forEach(expense => {
      categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
    });
    return categories;
  };

  const getMonthlyExpenses = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    }).reduce((sum, expense) => sum + expense.amount, 0);
  };

  const value = {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotalExpenses,
    getExpensesByCategory,
    getMonthlyExpenses,
    loading
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};