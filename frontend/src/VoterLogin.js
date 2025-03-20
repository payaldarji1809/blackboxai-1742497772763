import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VoterLogin = () => {
  const [govID, setGovID] = useState("");
  const [voterId, setVoterId] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [registrationToken, setRegistrationToken] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!govID) {
      alert("Please enter your Government ID.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/register_voter", {
        gov_ids: govID,
      });

      setRegistrationToken(response.data.token);
      setQrCode(`http://127.0.0.1:5000${response.data.qr_code}`);
      alert("Registration successful! Please save your Voter ID and QR Code.");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleLogin = async () => {
    if (!voterId) {
      alert("Please enter your Voter ID.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/voter_login", {
        voter_id: voterId,
      });

      localStorage.setItem("voter_token", response.data.token);
      alert("Login successful!");
      navigate("/vote");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please check your Voter ID.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isRegistering ? "Voter Registration" : "Voter Login"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isRegistering ? "Already have a voter ID? " : "Don't have a voter ID? "}
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setQrCode("");
              setRegistrationToken("");
            }}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {isRegistering ? "Login here" : "Register here"}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isRegistering ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="govId" className="block text-sm font-medium text-gray-700">
                  Government ID
                </label>
                <div className="mt-1">
                  <input
                    id="govId"
                    name="govId"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your Government ID"
                    value={govID}
                    onChange={(e) => setGovID(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleRegister}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <i className="fas fa-user-plus mr-2"></i>
                  Register as Voter
                </button>
              </div>

              {registrationToken && (
                <div className="mt-4 p-4 bg-green-50 rounded-md">
                  <h3 className="text-lg font-medium text-green-800 mb-2">Registration Successful!</h3>
                  <p className="text-sm text-green-700 mb-2">
                    Your Voter ID: <strong>{registrationToken}</strong>
                  </p>
                  <p className="text-sm text-green-700 mb-4">
                    Please save this ID and QR code. You'll need them to login and vote.
                  </p>
                  {qrCode && (
                    <div className="flex justify-center">
                      <img src={qrCode} alt="Voter QR Code" className="w-48 h-48" />
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label htmlFor="voterId" className="block text-sm font-medium text-gray-700">
                  Voter ID
                </label>
                <div className="mt-1">
                  <input
                    id="voterId"
                    name="voterId"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your Voter ID"
                    value={voterId}
                    onChange={(e) => setVoterId(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleLogin}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Login to Vote
                </button>
              </div>
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Secure and Anonymous Voting
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterLogin;
