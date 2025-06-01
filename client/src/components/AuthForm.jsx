// client/src/components/AuthForm.jsx
import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const AuthForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      // Save token in localStorage
      localStorage.setItem("token", token);

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
      alert("Sign-in failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        className="w-full p-2 mb-3 rounded bg-gray-800 outline-none"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        className="w-full p-2 mb-3 rounded bg-gray-800 outline-none"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 mb-4 rounded bg-gray-800 outline-none"
        value={formData.email}
        onChange={handleChange}
      />

      <button
        onClick={handleGoogleLogin}
        className={`w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-white font-semibold rounded ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  );
};

export default AuthForm;
