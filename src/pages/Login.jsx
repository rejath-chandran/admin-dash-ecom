import React, { useState } from "react";
import bgImage from "../assets/bg.png"

export default function DashboardLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ email, password, remember });
    alert("Submitted (check console).");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
      <main className="w-full max-w-6xl mx-auto p-6">
        <div className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-orange-100">

          {/* Left Section */}
          <section className="hidden md:flex flex-col justify-center px-12 py-16 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 text-white">
            <div className="max-w-sm">
              <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Acme Commerce</h1>
                <p className="mt-3 text-sm opacity-90">Empower your business with insights and tools to drive growth.</p>
              </div>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-4 border border-white/30 rounded-xl p-4 bg-white/10">
                  <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center font-semibold text-lg">$</div>
                  <div>
                    <div className="text-xs opacity-80">Monthly Revenue</div>
                    <div className="text-xl font-semibold">$24.3k</div>
                  </div>
                </div>
                <p className="text-xs opacity-70">Tip: Enable 2-factor authentication for enhanced security.</p>
              </div>
            </div>
          </section>

          {/* Right Section with Background Image */}
          <section
            className="px-6 py-10 md:py-16 md:px-12 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>

            <div className="relative max-w-md mx-auto">
              <header className="mb-8 text-center md:text-left">
                <h2 className="text-3xl font-semibold text-gray-800">Welcome back 👋</h2>
                <p className="mt-2 text-sm text-gray-600">Log in to your account and manage your business effortlessly.</p>
              </header>

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition duration-150 placeholder-gray-400 bg-white/90"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <a href="#" className="text-sm text-orange-600 hover:underline">Forgot password?</a>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPwd ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition duration-150 placeholder-gray-400 bg-white/90"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      aria-label={showPwd ? "Hide password" : "Show password"}
                      onClick={() => setShowPwd((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                    >
                      {showPwd ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Options */}
                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center text-sm">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-gray-700">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-gray-500 hover:text-orange-600">Need help?</a>
                </div>

                {/* Login button */}
                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-xl px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium shadow-md hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 transition duration-150"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 00.293.707l2 2a1 1 0 001.414-1.414L11 9.586V7z" clipRule="evenodd" />
                    </svg>
                    Login
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <div className="text-xs text-gray-400">OR</div>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button type="button" className="w-full inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 hover:bg-orange-50 transition">
                    Continue with Google
                  </button>
                  <button type="button" className="w-full inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 hover:bg-orange-50 transition">
                    Create account
                  </button>
                </div>

                <p className="text-center text-xs text-gray-400">By signing in you agree to our <a href="#" className="text-orange-600 hover:underline">Terms</a> and <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>.</p>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}