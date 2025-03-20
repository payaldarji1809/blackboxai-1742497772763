import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Choose Your Role
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Client Block */}
          <div 
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300 cursor-pointer"
            onClick={() => navigate('/client')}
          >
            <div className="text-blue-600 mb-6">
              <i className="fas fa-user-tie text-5xl"></i>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Client Access</h2>
            <p className="text-gray-600 mb-6">
              Create and manage voting events, monitor results, and analyze voting data.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                <span>Create voting events</span>
              </div>
              <div className="flex items-center text-gray-700">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                <span>Manage voter access</span>
              </div>
              <div className="flex items-center text-gray-700">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                <span>View real-time analytics</span>
              </div>
            </div>
            <button className="mt-8 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Login as Client
            </button>
          </div>

          {/* Voter Block */}
          <div 
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300 cursor-pointer"
            onClick={() => navigate('/voter')}
          >
            <div className="text-blue-600 mb-6">
              <i className="fas fa-user text-5xl"></i>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Voter Access</h2>
            <p className="text-gray-600 mb-6">
              Participate in voting events securely and verify your vote with complete anonymity.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                <span>Cast secure votes</span>
              </div>
              <div className="flex items-center text-gray-700">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                <span>Verify your vote</span>
              </div>
              <div className="flex items-center text-gray-700">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                <span>View election results</span>
              </div>
            </div>
            <button className="mt-8 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Login as Voter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationPage;