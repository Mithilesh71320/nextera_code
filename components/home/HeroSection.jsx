"use client";

import Link from "next/link";
import LiveDashboard from "./LiveDashboard";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="lg:pl-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white shadow-sm border border-teal-100">
              <span className="text-teal-500 text-sm">✦</span>
              <span className="text-sm font-medium text-teal-700">
                Trusted by 200+ Healthcare Facilities
              </span>
            </div>

            <h1 className="text-5xl leading-tight font-extrabold text-slate-900">
              Welcome to <br />
              <span className="text-teal-500">NextEra Code</span>
            </h1>

            <p className="mt-6 max-w-md text-lg text-slate-800 leading-relaxed">
              Simplifying healthcare staffing with intelligent nurse management
              solutions. Connect qualified nurses with hospitals seamlessly and
              efficiently.
            </p>

            <p className="mt-4 max-w-md text-base text-slate-500 leading-relaxed">
              We believe in creating a stress-free environment for both healthcare
              providers and nursing professionals through smart technology and
              compassionate service.
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex items-center gap-4">
              
              {/* Hospital Form */}
              <Link href="/hospital/form">
                <button className="px-6 py-3 rounded-xl bg-teal-500 text-white font-semibold shadow-md hover:bg-teal-600 transition">
                  Request Nurses →
                </button>
              </Link>

              {/* Admin Login */}
              <Link href="/admin/login">
                <button className="px-6 py-3 rounded-xl bg-white text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 transition">
                  Admin Portal
                </button>
              </Link>
            </div>

            {/* STATS */}
            <div className="mt-12 pt-6 border-t border-slate-200 flex gap-12">
              <div>
                <p className="text-3xl font-bold text-slate-900">500+</p>
                <p className="text-sm text-slate-500 mt-1">
                  Qualified Nurses
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-slate-900">10K+</p>
                <p className="text-sm text-slate-500 mt-1">
                  Assignments
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-slate-900">99.8%</p>
                <p className="text-sm text-slate-500 mt-1">
                  Success Rate
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT DASHBOARD */}
          <div className="flex justify-center lg:justify-end lg:pr-8">
            <div className="relative">
              <div className="absolute -inset-6 bg-teal-200/20 blur-3xl rounded-full" />
              <div className="relative">
                <LiveDashboard />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
