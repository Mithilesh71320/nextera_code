"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import Navbar from "@/components/layout/navbar";
import AuthGate from "@/components/auth/AuthGate";
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
  Users,
  ClipboardCheck,
  CalendarCheck,
  Mail,
  KeyRound,
} from "lucide-react";

export default function AdminSignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <AuthGate requireAuth={false}>
      <>
        <Navbar />

        <main className="login-main min-h-screen bg-gray-50 flex justify-center px-6 py-12">
          <div className="login-container w-full max-w-6xl flex flex-col lg:flex-row gap-10">
            <div className="login-left flex-1 flex flex-col gap-6">
              <div className="flex items-center gap-2 text-teal-600 text-sm font-medium">
                <ShieldCheck size={16} />
                Secure Admin Access
              </div>

              <h1 className="login-title text-3xl font-bold text-gray-900">
                Admin Portal
              </h1>

              <p className="login-desc text-gray-600 max-w-lg">
                Access the comprehensive nurse staffing management dashboard
                to manage nurses, handle hospital requests, and coordinate
                assignments efficiently.
              </p>

              <div className="feature-list flex flex-col gap-4 max-w-md">
                <FeatureCard
                  icon={<Users />}
                  title="Manage Nurses"
                  desc="Add, edit, and manage nurse profiles with department assignments"
                />
                <FeatureCard
                  icon={<ClipboardCheck />}
                  title="Process Requests"
                  desc="Review and assign nurses to hospital staffing requests"
                />
                <FeatureCard
                  icon={<CalendarCheck />}
                  title="Track Assignments"
                  desc="View daily schedules and monitor all active assignments"
                />
              </div>
            </div>

            <div className="login-right flex-1 flex justify-center">
              <form
                onSubmit={handleLogin}
                className="login-form w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-teal-100 p-3 rounded-xl text-teal-600">
                    <Lock />
                  </div>
                  <h2 className="text-xl font-semibold">Sign In</h2>
                  <p className="text-sm text-gray-500 text-center">
                    Enter your credentials to continue
                  </p>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">
                    {error}
                  </p>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    Email Address
                  </label>
                  <div className="input flex items-center gap-2">
                    <Mail size={16} />
                    <input
                      type="email"
                      name="email"
                      placeholder="admin@nexteracode.com"
                      required
                      className="flex-1 outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    Password
                  </label>
                  <div className="input flex items-center gap-2">
                    <KeyRound size={16} />
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      required
                      className="flex-1 outline-none"
                    />
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium"
                >
                  {loading ? "Signing in..." : "Sign In to Dashboard"}
                </button>

                <Link
                  href="/admin/login"
                  className="text-sm text-teal-700 hover:text-teal-800 inline-flex items-center gap-2 justify-center"
                >
                  <ArrowLeft size={14} />
                  Back to options
                </Link>
              </form>
            </div>
          </div>
        </main>

        <style jsx global>{`
        @media (max-width: 768px) {
          .login-main {
            padding: 20px 14px;
          }

          .login-container {
            gap: 32px;
          }

          .login-title {
            font-size: 24px;
            line-height: 1.3;
          }

          .login-desc {
            font-size: 14px;
          }

          .feature-list {
            max-width: 100%;
          }

          .login-form {
            padding: 20px;
            border-radius: 18px;
          }

          .input {
            padding: 10px 12px;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
          }

          .login-right {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .login-title {
            font-size: 22px;
          }

          .login-form {
            padding: 18px 16px;
          }

          .login-desc {
            font-size: 13px;
          }
        }
      `}</style>
      </>
    </AuthGate>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex gap-4 items-start">
      <div className="bg-teal-100 text-teal-600 p-2 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
