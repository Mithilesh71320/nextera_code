"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LiveDashboard from "./LiveDashboard";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-slate-50 overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="lg:pl-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/90 shadow-sm border border-teal-100">
              <span className="text-teal-500 text-sm">*</span>
              <span className="text-sm font-medium text-teal-700">
                Trusted by 200+ Healthcare Facilities
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl leading-tight font-extrabold text-slate-900">
              Smarter Staffing for
              <span className="text-teal-500"> Modern Care Teams</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-700 leading-relaxed">
              NextEra connects hospitals with qualified nurses quickly, reducing staffing
              gaps and helping healthcare teams stay focused on patient outcomes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/hospital/form" className="px-6 py-3 rounded-xl bg-teal-500 text-white font-semibold shadow-md hover:bg-teal-600 transition inline-flex items-center gap-2">
                Request Nurses <ArrowRight size={16} />
              </Link>
              <Link href="/admin/login" className="px-6 py-3 rounded-xl bg-white text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 transition">
                Admin Portal
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-3 gap-6 max-w-xl">
              <HeroStat value="500+" label="Qualified Nurses" />
              <HeroStat value="10K+" label="Assignments" />
              <HeroStat value="99.8%" label="Success Rate" />
            </div>
          </div>

          <div className="flex justify-center lg:justify-end lg:pr-4">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-teal-200/30 blur-3xl rounded-full" />
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

function HeroStat({ value, label }) {
  return (
    <div>
      <p className="text-2xl sm:text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-xs sm:text-sm text-slate-500 mt-1">{label}</p>
    </div>
  );
}
