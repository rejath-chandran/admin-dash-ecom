import React, { useState } from "react";
import { useForm } from "react-hook-form";
import bgImage from "../assets/bg.png";
import api from "../api/axios";

export default function DashboardRegister() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPwd, setShowPwd] = useState(false);

  function onSubmit(data) {
    console.log(data);
     api.post("/auth/register", data)
      .then((res) => {
        console.log("Registration successful:", res.data);
        // Optionally redirect to login or dashboard
      })
      .catch((err) => {
        console.error("Registration error:", err.response?.data || err.message);
      });

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
      <main className="w-full max-w-6xl mx-auto p-6">
        <div className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-orange-100">

          {/* Left Illustration Section */}
          <section className="hidden md:flex flex-col justify-center px-12 py-16 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 text-white">
            <div className="max-w-sm">
              <h1 className="text-4xl font-bold tracking-tight">Create Account</h1>
              <p className="mt-3 text-sm opacity-90">
                Join us to unlock tools that empower your business growth.
              </p>
            </div>
          </section>

          {/* Right Form Section */}
          <section
            className="px-6 py-10 md:py-16 md:px-12 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>

            <div className="relative max-w-md mx-auto">
              <header className="mb-8 text-center md:text-left">
                <h2 className="text-3xl font-semibold text-gray-800">Get Started 🚀</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Create your account to access the dashboard.
                </p>
              </header>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={`mt-2 w-full rounded-xl border px-4 py-3 shadow-sm bg-white/90
                    ${errors.email ? "border-red-500" : "border-gray-200"}`}
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    className={`mt-2 w-full rounded-xl border px-4 py-3 shadow-sm bg-white/90
                    ${errors.phone ? "border-red-500" : "border-gray-200"}`}
                    {...register("phone", { required: "Phone is required" })}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>

                  <div className="mt-2 relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      placeholder="••••••••"
                      className={`block w-full rounded-xl border px-4 py-3 shadow-sm bg-white/90
                      ${errors.password ? "border-red-500" : "border-gray-200"}`}
                      {...register("password", { required: "Password is required" })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                    >
                      {showPwd ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full rounded-xl px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium shadow-md hover:from-orange-600 hover:to-amber-600 transition"
                >
                  Register
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Already have an account? <a className="text-orange-600 hover:underline">Login</a>.
                </p>

              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
