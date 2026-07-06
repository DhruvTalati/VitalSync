import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, HeartPulse, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await login(data);

      toast.success("Login Successful");

      if (response.user.role === "doctor") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid email or password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* LEFT */}

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0F172A] via-[#16213E] to-[#2563EB] text-white p-16 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-3 rounded-xl">
              <HeartPulse className="text-white" size={32} />
            </div>

            <h1 className="text-4xl font-black">
              Vital<span className="text-blue-400">Sync</span>
            </h1>
          </div>

          <div className="mt-20">
            <p className="uppercase tracking-[4px] text-blue-300 text-sm">
              Welcome Back
            </p>

            <h2 className="mt-5 text-5xl font-black leading-tight">
              Your Healthcare
              <br />
              Journey Starts
              <br />
              Here.
            </h2>

            <p className="mt-8 text-slate-300 leading-8 text-lg">
              Securely access your appointments, prescriptions, medical history,
              wallet and health analytics from one intelligent platform.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white/10 backdrop-blur-md p-8">
          <h3 className="font-bold text-xl">Why Choose VitalSync?</h3>

          <ul className="mt-6 space-y-4 text-slate-200">
            <li>✔ Secure Medical Records</li>

            <li>✔ AI Health Monitoring</li>

            <li>✔ Doctor & Patient Dashboard</li>

            <li>✔ Video Consultation</li>

            <li>✔ Smart Appointment Booking</li>
          </ul>
        </div>
      </div>

      {/* RIGHT */}

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
          <div className="text-center">
            <h2 className="text-4xl font-black text-slate-900">Sign In</h2>

            <p className="mt-3 text-slate-500">Welcome back to VitalSync</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
            {/* Email */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-4 text-slate-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-4 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full border rounded-xl pl-12 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-slate-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me + Forgot Password */}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Remember Me
              </label>

              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition duration-300 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Divider */}

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-slate-400">OR</span>
              </div>
            </div>

            {/* Register */}

            <p className="text-center text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Register Here
              </Link>
            </p>

            {/* Back Home */}

            <div className="text-center">
              <Link
                to="/"
                className="text-slate-500 hover:text-blue-600 text-sm"
              >
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
