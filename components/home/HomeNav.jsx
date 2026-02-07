"use client";

import Link from "next/link";

export default function HomeNav() {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-white font-bold">
              N
            </div>
            <div>
              <p className="font-semibold leading-none">NextEra Code</p>
              <p className="text-xs text-gray-500">Healthcare Staffing</p>
            </div>
          </div>

          {/* LINKS */}
          <nav className="flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="#AboutUs" className="hover:text-teal-600 transition">
              About
            </Link>
            <Link href="#features" className="hover:text-teal-600 transition">
              Features
            </Link>
            <Link href="#contact" className="hover:text-teal-600 transition">
              Contact
            </Link>

            <Link
              href="/hospital/form"
              className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
            >
              Request Nurses
            </Link>

            <Link
              href="/admin/login"
              className="bg-gray-100 px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-teal-600"
            >
              Admin
            </Link>
          </nav>

        </div>
      </div>
    </div>
  );
}
