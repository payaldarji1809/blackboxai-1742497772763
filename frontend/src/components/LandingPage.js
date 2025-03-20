import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 font-['Poppins']">
            Secure Voting Solution
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            A revolutionary blockchain-based voting system ensuring transparency, security, and anonymity for all your voting needs.
          </p>
          <button
            onClick={() => navigate('/navigate')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-blue-600 mb-4">
              <i className="fas fa-shield-alt text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Anonymous</h3>
            <p className="text-gray-600">
              Advanced encryption ensures complete privacy and security of your vote
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-blue-600 mb-4">
              <i className="fas fa-check-double text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparent</h3>
            <p className="text-gray-600">
              Blockchain technology ensures transparent and tamper-proof voting
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-blue-600 mb-4">
              <i className="fas fa-bolt text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast & Efficient</h3>
            <p className="text-gray-600">
              Quick setup and real-time results verification
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-plus text-blue-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-2">Register</h3>
              <p className="text-gray-600">Create your secure account</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-vote-yea text-blue-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-2">Vote</h3>
              <p className="text-gray-600">Cast your secure vote</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check-circle text-blue-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-2">Verify</h3>
              <p className="text-gray-600">Confirm your vote</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-bar text-blue-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-2">Results</h3>
              <p className="text-gray-600">View real-time results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;