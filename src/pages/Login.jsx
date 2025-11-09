import React, { useState } from "react";
import { useForm } from "react-hook-form";
import bgImage from "../assets/bg.png";
import { useNavigate,Link } from "react-router"; // ✅ FIXED
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import DashboardMeta from "../components/meta/Login";

export default function DashboardLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();
  // ✅ Access the IN-MEMORY AUTH store
  const setAuth = useAuthStore((state) => state.setAuth);

  async function onSubmit(data) {
    try {
      const res = await api.post("/auth/login", data);

      // ✅ Store accessToken & user only in Zustand (not in localStorage)
      setAuth({ token: res.data.accessToken, user: res.data.user });

      // ✅ Navigate to dashboard
      navigate("/");
    } catch (err) {
      console.error("Login error:", err?.response?.data || err?.message);
      alert(err?.response?.data?.message || "Login Failed");
    }
  }

  return (
   <>
   <DashboardMeta />
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
            </div>
          </section>

          {/* Right Section */}
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
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full rounded-xl px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium shadow-md hover:from-orange-600 hover:to-amber-600 transition"
                >
                  Login
                </button>

                {/* OR Divider */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <div className="text-xs text-gray-400">OR</div>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Register Link */}
                <Link
                  className="block border border-gray-200 rounded-xl px-4 py-2 text-sm hover:bg-orange-50 text-center"
                  to="/register"
                >
                  Create account
                </Link>

              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
   </>
  );
}
