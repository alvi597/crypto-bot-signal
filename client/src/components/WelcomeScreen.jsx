import React, { useState } from 'react';
import GoogleSignInForm from './GoogleSignInForm';

const WelcomeScreen = ({ onSignIn }) => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    onSignIn();
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Hasnain Crypto Signal Bot</h1>
      <button
        onClick={handleButtonClick}
        className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition duration-300"
      >
        Sign in to get signals
      </button>

      {showForm && <GoogleSignInForm onSuccess={handleSuccess} />}
    </div>
  );
};

export default WelcomeScreen;
