import React, { useState } from 'react';
import { signInWithGoogle } from '../firebase-config';

const GoogleSignInForm = ({ onSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onSuccess();
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl text-white w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        <input
          type="text"
          placeholder="First Name"
          className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 rounded border-2 border-white text-white font-semibold relative overflow-hidden transition-all hover:bg-white hover:text-black"
        >
          <span className="absolute inset-0 border-2 border-white animate-pulse rounded-lg"></span>
          <span className="relative z-10">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default GoogleSignInForm;
