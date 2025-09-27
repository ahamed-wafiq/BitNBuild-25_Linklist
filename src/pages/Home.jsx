import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Receipt, 
  Calculator, 
  TrendingUp, 
  Shield, 
  Target,
  BarChart3,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Receipt,
      title: 'Smart Expense Tracking',
      description: 'Track and categorize your expenses with intelligent insights and spending patterns.',
      color: 'text-blue-600'
    },
    {
      icon: Calculator,
      title: 'Tax Optimization',
      description: 'Compare old vs new tax regimes and find the best way to minimize your tax liability.',
      color: 'text-green-600'
    },
    {
      icon: TrendingUp,
      title: 'CIBIL Score Advisor',
      description: 'Get personalized recommendations to improve your credit score and financial health.',
      color: 'text-purple-600'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and stored securely with complete privacy.',
      color: 'text-red-600'
    }
  ];

  const benefits = [
    'Save up to ₹50,000 annually on taxes',
    'Improve CIBIL score by 100+ points',
    'Track expenses with 99% accuracy',
    'Get personalized financial insights',
    'Access expert tax planning advice',
    'Mobile-friendly responsive design'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Take Control of Your
            <span className="block text-yellow-300">Financial Future</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100 leading-relaxed">
            TaxWise is your AI-powered companion for smart expense tracking, 
            tax optimization, and CIBIL score improvement. Make every rupee count.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/dashboard"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/expenses"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center"
            >
              Track Expenses
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-300">₹50,000+</div>
              <div className="text-blue-200">Average Tax Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">100+</div>
              <div className="text-blue-200">CIBIL Score Improvement</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">10,000+</div>
              <div className="text-blue-200">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

            {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <feature.icon className={`w-12 h-12 mb-4 ${feature.color}`} />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Why Choose TaxWise?</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to take control?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join thousands of users who are saving taxes, improving their CIBIL scores, and managing expenses smarter with TaxWise.
          </p>
          <Link
            to="/dashboard"
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} TaxWise. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/privacy" className="hover:text-white mx-2">Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-white mx-2">Terms of Service</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
