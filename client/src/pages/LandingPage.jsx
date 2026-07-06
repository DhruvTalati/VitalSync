import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  PlayCircle,
  ChevronRight,
  Activity,
  Shield,
  Smartphone,
  Calendar,
  FileHeart,
  Brain,
} from "lucide-react";

const partnerLogos = [
  "CLINIC+",
  "MEDICARE",
  "HEALTHHUB",
  "VITALCARE",
  "BIOCARE",
  "PUREHEALTH",
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white overflow-x-hidden">
      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 bg-[#121C34]/95 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
              <Heart size={20} fill="white" className="text-white" />
            </div>

            <h1 className="text-3xl font-extrabold text-white">
              Vital<span className="text-blue-500">Sync</span>
            </h1>
          </div>

          {/* Navigation */}

          <div className="hidden lg:flex items-center gap-10 text-white">
            <a href="#home" className="hover:text-blue-400 transition">
              Home
            </a>

            <a href="#features" className="hover:text-blue-400 transition">
              Features
            </a>

            <a href="#works" className="hover:text-blue-400 transition">
              How It Works
            </a>

            <a href="#faq" className="hover:text-blue-400 transition">
              FAQ
            </a>

            <button
              onClick={() => navigate("/login")}
              className="hover:text-blue-400 transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold hover:scale-105 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}

      <section id="home" className="bg-[#111A32] text-white">
        <div className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT */}

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/10 px-5 py-2 text-blue-400 font-semibold">
              🏥 THE FUTURE OF HEALTHCARE
            </div>

            <h1 className="mt-10 text-6xl leading-tight font-black">
              Your Health Data,
              <br />
              <span className="text-blue-500">Perfectly In Sync.</span>
            </h1>

            <p className="mt-8 text-xl leading-9 text-slate-300 max-w-xl">
              VitalSync bridges the gap between patient vitals and professional
              care. Real-time monitoring, AI-driven insights and seamless
              communication for a healthier tomorrow.
            </p>

            <div className="mt-12 flex flex-wrap gap-5">
              <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
              >
                🚀 Start Your Journey
              </button>

              <button className="flex items-center gap-3 text-white font-semibold">
                <PlayCircle size={24} />
                Watch How It Works
              </button>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">
            <div className="absolute -inset-8 blur-3xl rounded-full bg-blue-600/20" />

            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200"
                alt="Dashboard"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= PARTNERS ================= */}

      <section className="bg-white">
        <div className="max-w-7xl mx-auto py-14 px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partnerLogos.map((item) => (
              <div
                key={item}
                className="text-center text-slate-400 font-bold tracking-wider text-lg"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY VITALSYNC ================= */}

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}

          <div>
            <p className="text-blue-600 font-semibold uppercase tracking-wider">
              WHY VITALSYNC
            </p>

            <h2 className="text-5xl font-black mt-4 text-slate-900 leading-tight">
              Healthcare That
              <br />
              Works Together.
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-8">
              We connect patients and healthcare professionals through
              intelligent digital tools that simplify monitoring, improve
              collaboration and provide actionable health insights.
            </p>

            <div className="mt-12 space-y-8">
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  1
                </div>

                <div>
                  <h3 className="font-bold text-2xl">Real-Time Sync</h3>

                  <p className="text-slate-500 mt-2 leading-7">
                    Instantly synchronize patient vitals across doctors,
                    dashboards and monitoring devices.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  2
                </div>

                <div>
                  <h3 className="font-bold text-2xl">Centralized Records</h3>

                  <p className="text-slate-500 mt-2 leading-7">
                    Store appointments, prescriptions, reports and medical
                    history securely in one place.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  3
                </div>

                <div>
                  <h3 className="font-bold text-2xl">Proactive Monitoring</h3>

                  <p className="text-slate-500 mt-2 leading-7">
                    AI-assisted health monitoring helps identify abnormalities
                    before they become serious.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}

          <div>
            <div className="bg-[#13213C] rounded-3xl p-10 shadow-2xl text-white relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-blue-500/20 blur-3xl" />

              <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center">
                <Brain size={40} />
              </div>

              <h3 className="text-3xl font-bold mt-8">
                Bridging the Communication Gap
              </h3>

              <p className="mt-6 text-slate-300 leading-8">
                VitalSync enables hospitals, doctors and patients to stay
                connected with continuous health monitoring and instant data
                access.
              </p>

              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <h4 className="text-4xl font-black text-blue-400">98%</h4>

                  <p className="text-sm text-slate-400 mt-2">Accuracy</p>
                </div>

                <div>
                  <h4 className="text-4xl font-black text-blue-400">2.5s</h4>

                  <p className="text-sm text-slate-400 mt-2">Avg Sync</p>
                </div>

                <div>
                  <h4 className="text-4xl font-black text-blue-400">24/7</h4>

                  <p className="text-sm text-slate-400 mt-2">Monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE FEATURES ================= */}

      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <p className="text-blue-600 font-semibold uppercase tracking-wider">
              CORE CAPABILITIES
            </p>

            <h2 className="text-5xl font-black mt-4">
              Everything You Need
              <br />
              For Modern Healthcare
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {[
              {
                icon: Activity,
                title: "Real-Time Vitals",
                desc: "Monitor heart rate, oxygen, blood pressure and temperature live.",
              },
              {
                icon: Calendar,
                title: "Smart Scheduling",
                desc: "Book appointments effortlessly with intelligent doctor availability.",
              },
              {
                icon: FileHeart,
                title: "Digital History",
                desc: "Access complete patient records, prescriptions and reports anytime.",
              },
              {
                icon: Shield,
                title: "Military Grade Security",
                desc: "JWT authentication with encrypted medical records and secure APIs.",
              },
              {
                icon: Brain,
                title: "Predictive Analytics",
                desc: "AI-powered insights help doctors identify health risks earlier.",
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                desc: "Fully responsive platform accessible across every modern device.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <Icon className="text-blue-600" size={32} />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold">{item.title}</h3>

                  <p className="mt-4 leading-8 text-slate-500">{item.desc}</p>

                  <button className="mt-8 flex items-center gap-2 text-blue-600 font-semibold">
                    Learn More
                    <ChevronRight size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section id="works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <p className="uppercase tracking-widest text-blue-600 font-semibold">
              SEAMLESS ONBOARDING
            </p>

            <h2 className="text-5xl font-black mt-4 text-slate-900">
              Get Started
              <br />
              In Four Simple Steps
            </h2>

            <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-500 leading-8">
              Setting up VitalSync takes only a few minutes. Connect with
              healthcare professionals and begin tracking your health
              effortlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {[
              {
                number: "01",
                title: "Setup Account",
                description:
                  "Create your secure patient or doctor account using your email.",
              },
              {
                number: "02",
                title: "Connect Devices",
                description:
                  "Sync health devices or manually log your daily vital signs.",
              },
              {
                number: "03",
                title: "Find Specialists",
                description:
                  "Book appointments and communicate with trusted healthcare professionals.",
              },
              {
                number: "04",
                title: "Live Better",
                description:
                  "Track health progress with AI-powered insights and reminders.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200"
              >
                <div className="absolute -top-5 left-8 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.number}
                </div>

                <h3 className="mt-10 text-2xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-5 text-slate-500 leading-8">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}

      <section id="faq" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center">
            <p className="uppercase tracking-widest text-blue-600 font-semibold">
              FAQ
            </p>

            <h2 className="text-5xl font-black mt-4 text-slate-900">
              Frequently Asked Questions
            </h2>

            <p className="mt-6 text-lg text-slate-500">
              Everything you need to know about VitalSync.
            </p>
          </div>

          <div className="mt-16 space-y-6">
            <details className="group bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-xl font-semibold">
                  Is my medical information secure?
                </span>

                <ChevronRight
                  className="group-open:rotate-90 transition"
                  size={22}
                />
              </summary>

              <p className="mt-5 text-slate-500 leading-8">
                Yes. VitalSync uses secure authentication, encrypted
                communication, and protected APIs to keep your healthcare data
                private and safe.
              </p>
            </details>

            <details className="group bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-xl font-semibold">
                  Can I book appointments online?
                </span>

                <ChevronRight
                  className="group-open:rotate-90 transition"
                  size={22}
                />
              </summary>

              <p className="mt-5 text-slate-500 leading-8">
                Absolutely. Patients can search doctors, choose available time
                slots, book appointments, and receive confirmation instantly.
              </p>
            </details>

            <details className="group bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-xl font-semibold">
                  Does VitalSync support video consultations?
                </span>

                <ChevronRight
                  className="group-open:rotate-90 transition"
                  size={22}
                />
              </summary>

              <p className="mt-5 text-slate-500 leading-8">
                Yes. Doctors and patients can connect through secure real-time
                video consultations directly within the platform using
                integrated meeting rooms.
              </p>
            </details>

            <details className="group bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-xl font-semibold">
                  Can doctors manage prescriptions digitally?
                </span>

                <ChevronRight
                  className="group-open:rotate-90 transition"
                  size={22}
                />
              </summary>

              <p className="mt-5 text-slate-500 leading-8">
                Yes. Doctors can generate prescriptions, maintain patient
                medical records, and patients can download them as PDFs.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="py-24 bg-gradient-to-r from-[#111A32] via-[#1A2B50] to-[#224C8C] text-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-14 text-center">
            <p className="uppercase tracking-[4px] text-blue-300 font-semibold">
              READY TO GET STARTED?
            </p>

            <h2 className="mt-5 text-5xl font-black leading-tight">
              Empower Your
              <br />
              Health Journey
            </h2>

            <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-300 leading-8">
              Join thousands of patients and healthcare professionals already
              using VitalSync to simplify healthcare, improve communication and
              monitor health in real-time.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-5">
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold transition"
              >
                Join VitalSync Now
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 font-semibold transition"
              >
                Developer Docs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="bg-[#0F172A] text-slate-300">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand */}

            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Heart fill="white" className="text-white" size={22} />
                </div>

                <h2 className="text-3xl font-black text-white">
                  Vital<span className="text-blue-500">Sync</span>
                </h2>
              </div>

              <p className="mt-6 leading-8">
                AI-powered Healthcare Management System that connects patients
                and doctors through real-time health monitoring, appointments
                and digital records.
              </p>

              <div className="flex gap-4 mt-8">
                {["𝕏", "in", "f", "◎"].map((item, index) => (
                  <div
                    key={index}
                    className="w-11 h-11 rounded-full bg-white/10 hover:bg-blue-600 transition flex items-center justify-center cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Product */}

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Product</h3>

              <ul className="space-y-4">
                <li>
                  <Link to="/" className="hover:text-blue-400 transition">
                    Home
                  </Link>
                </li>

                <li>
                  <a
                    href="#features"
                    className="hover:text-blue-400 transition"
                  >
                    Features
                  </a>
                </li>

                <li>
                  <a href="#works" className="hover:text-blue-400 transition">
                    How It Works
                  </a>
                </li>

                <li>
                  <a href="#faq" className="hover:text-blue-400 transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Company</h3>

              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => navigate("/login")}
                    className="hover:text-blue-400 transition"
                  >
                    Login
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => navigate("/register")}
                    className="hover:text-blue-400 transition"
                  >
                    Register
                  </button>
                </li>

                <li>
                  <a href="#home" className="hover:text-blue-400 transition">
                    Contact
                  </a>
                </li>

                <li>
                  <a href="#home" className="hover:text-blue-400 transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Newsletter</h3>

              <p className="leading-7">
                Subscribe to receive healthcare updates, product news and future
                releases.
              </p>

              <div className="mt-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl bg-white/10 border border-white/10 px-5 py-3 outline-none focus:border-blue-500"
                />

                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-semibold transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} VitalSync. All rights reserved.
            </p>

            <p className="text-sm text-slate-500">
              Developed by{" "}
              <span className="text-white font-semibold">Dhruv Talati</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
