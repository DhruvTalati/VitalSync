import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Lock, Eye, EyeOff, HeartPulse } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../services/authService";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const { data } = await registerUser(formData);

      toast.success("Registration Successful");

      login({
        token: data.token,
        user: data.user,
      });

      if (data.user.role === "doctor") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* LEFT PANEL */}

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#2563EB] text-white p-16 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-3 rounded-xl">
              <HeartPulse size={32} />
            </div>

            <h1 className="text-4xl font-black">
              Vital<span className="text-blue-300">Sync</span>
            </h1>
          </div>

          <h2 className="mt-20 text-5xl font-black leading-tight">
            Create Your
            <br />
            Healthcare
            <br />
            Account.
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-200">
            Join thousands of patients and doctors already using VitalSync to
            manage health, appointments, prescriptions and medical records from
            anywhere.
          </p>
        </div>

        <div className="rounded-3xl bg-white/10 backdrop-blur-md p-8">
          <h3 className="font-bold text-xl">Why VitalSync?</h3>

          <ul className="mt-6 space-y-3 text-slate-200">
            <li>✔ Digital Health Records</li>

            <li>✔ AI Health Analytics</li>

            <li>✔ Video Consultation</li>

            <li>✔ Appointment Booking</li>

            <li>✔ Smart Medical Wallet</li>
          </ul>
        </div>
      </div>

      {/* RIGHT */}

      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10">
          <div className="text-center">
            <h2 className="text-4xl font-black">Create Account</h2>

            <p className="mt-3 text-slate-500">
              Register to start using VitalSync
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 grid md:grid-cols-2 gap-6"
          >
            {/* Full Name */}

            <div>
              <label className="font-semibold text-sm">Full Name</label>

              <div className="relative mt-2">
                <User
                  className="absolute left-4 top-4 text-slate-400"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border rounded-xl py-3 pl-12 pr-4"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
              </div>

              {errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}

            <div>
              <label className="font-semibold text-sm">Email</label>

              <div className="relative mt-2">
                <Mail
                  className="absolute left-4 top-4 text-slate-400"
                  size={18}
                />

                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full border rounded-xl py-3 pl-12 pr-4"
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

            {/* Phone */}

            <div>
              <label className="font-semibold text-sm">Phone Number</label>

              <div className="relative mt-2">
                <Phone
                  className="absolute left-4 top-4 text-slate-400"
                  size={18}
                />

                <input
                  type="tel"
                  placeholder="9876543210"
                  className="w-full border rounded-xl py-3 pl-12 pr-4"
                  {...register("phone")}
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="font-semibold text-sm">Password</label>

              <div className="relative mt-2">
                <Lock
                  className="absolute left-4 top-4 text-slate-400"
                  size={18}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border rounded-xl py-3 pl-12 pr-12"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3"
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

            {/* Confirm Password */}

            <div className="md:col-span-2">
              <label className="font-semibold text-sm">Confirm Password</label>

              <div className="relative mt-2">
                <Lock
                  className="absolute left-4 top-4 text-slate-400"
                  size={18}
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full border rounded-xl py-3 pl-12 pr-12"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Age */}

            <div>
              <label className="font-semibold text-sm">Age</label>

              <input
                type="number"
                placeholder="25"
                className="w-full mt-2 border rounded-xl py-3 px-4"
                {...register("age", {
                  required: "Age is required",
                })}
              />

              {errors.age && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* Gender */}

            <div>
              <label className="font-semibold text-sm">Gender</label>

              <select
                className="w-full mt-2 border rounded-xl py-3 px-4"
                {...register("gender", {
                  required: "Gender is required",
                })}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              {errors.gender && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.gender.message}
                </p>
              )}
            </div>

            {/* Blood Group */}

            <div>
              <label className="font-semibold text-sm">Blood Group</label>

              <select
                className="w-full mt-2 border rounded-xl py-3 px-4"
                {...register("bloodGroup")}
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            {/* Role */}

            <div>
              <label className="font-semibold text-sm">Register As</label>

              <select
                className="w-full mt-2 border rounded-xl py-3 px-4"
                {...register("role")}
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            {/* Address */}

            <div className="md:col-span-2">
              <label className="font-semibold text-sm">Address</label>

              <textarea
                rows={4}
                placeholder="Enter your address"
                className="w-full mt-2 border rounded-xl py-3 px-4 resize-none"
                {...register("address")}
              />
            </div>

            {/* Submit */}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl py-3 font-semibold hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            {/* Login */}

            <div className="md:col-span-2 text-center">
              <p className="text-slate-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>

            {/* Back Home */}

            <div className="md:col-span-2 text-center">
              <Link
                to="/"
                className="text-sm text-slate-500 hover:text-blue-600"
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

export default RegisterPage;
