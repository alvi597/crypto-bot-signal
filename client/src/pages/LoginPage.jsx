// client/src/pages/LoginPage.jsx
import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md shadow-2xl text-center">
        <h1 className="text-3xl mb-6 font-bold">Welcome to Hasnain Crypto Signal Bot</h1>
        <button
          onClick={handleGoogleSignIn}
          className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:scale-105 transform transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
