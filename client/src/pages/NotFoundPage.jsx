import React from "react";
import { Link } from "react-router-dom";
import { Home, HeartPulse, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}

        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">
            <HeartPulse className="text-white" size={40} />
          </div>
        </div>

        {/* 404 */}

        <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          404
        </h1>

        {/* Title */}

        <h2 className="mt-6 text-4xl font-extrabold text-slate-900">
          Oops! Page Not Found
        </h2>

        {/* Description */}

        <p className="mt-6 text-lg leading-8 text-slate-600 max-w-xl mx-auto">
          The page you're looking for doesn't exist, may have been removed, or
          the URL might be incorrect.
          <br />
          Let's get you back to VitalSync.
        </p>

        {/* Buttons */}

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Footer */}

        <p className="mt-16 text-sm text-slate-400">
          © {new Date().getFullYear()} VitalSync • AI Powered Healthcare
          Management System
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
