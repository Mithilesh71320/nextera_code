import Navbar from "@/components/layout/navbar";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-6 py-8 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col gap-6">

          {/* DASHBOARD HEADER */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl px-8 py-6">
            <h1 className="text-2xl font-semibold">
              Welcome to Admin Dashboard
            </h1>
            <p className="text-sm opacity-90">
              Manage your nurse staffing operations efficiently
            </p>
          </div>

          {/* DASHBOARD NAV TABS */}
          <div className="bg-white rounded-xl shadow px-6">
            <div className="flex gap-6 text-sm font-medium border-b">
              <DashboardTab href="/admin/dashboard" label="Overview" />
              <DashboardTab href="/admin/dashboard/nurses" label="Nurses" />
              <DashboardTab href="/admin/dashboard/requests" label="Requests" />
              <DashboardTab href="/admin/dashboard/schedule" label="Daily Schedule" />
            </div>
          </div>

          {/* PAGE CONTENT */}
          <div>
            {children}
          </div>

        </div>
      </main>
    </>
  );
}

function DashboardTab({ href, label }) {
  return (
    <Link
      href={href}
      className="py-4 border-b-2 border-transparent hover:border-teal-500 hover:text-teal-600 transition"
    >
      {label}
    </Link>
  );
}
