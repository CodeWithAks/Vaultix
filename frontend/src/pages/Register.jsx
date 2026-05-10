import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">

      {/* Register Card */}
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

        {/* Heading */}
        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold text-white mb-2">
            Create Account
          </h1>

          <p className="text-zinc-400">
            Fill in the details to create your account
          </p>

        </div>

        {/* Email Input */}
        <div className="mb-5">

          <label className="block text-sm text-zinc-400 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition"
          />

        </div>

        {/* Password Input */}
        <div className="mb-6">

          <label className="block text-sm text-zinc-400 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition"
          />

        </div>

        {/* Register Button */}
        <button
          className="w-full bg-cyan-400 text-black font-semibold py-3 rounded-2xl hover:bg-cyan-300 transition-all duration-300"
        >
          Register
        </button>

        {/* Register Text */}
        <p className="text-zinc-500 mt-5 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-400 hover:text-cyan-300 transition">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}