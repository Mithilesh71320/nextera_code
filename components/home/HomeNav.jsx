"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function HomeNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/60 bg-white/85 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-white font-bold">
              N
            </div>
            <div>
              <p className="font-semibold leading-none text-slate-900">NextEra Code</p>
              <p className="text-xs text-gray-500">Healthcare Staffing</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
            <Link href="#about" className="hover:text-teal-600 transition">About</Link>
            <Link href="#features" className="hover:text-teal-600 transition">Features</Link>
            <Link href="#contact" className="hover:text-teal-600 transition">Contact</Link>
            <Link href="/hospital/form" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition">
              Request Nurses
            </Link>
            <Link href="/admin/login" className="bg-gray-100 px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-teal-600">
              Admin
            </Link>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-700"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <nav className="md:hidden py-3 pb-4 flex flex-col gap-2 text-sm font-medium text-gray-700">
            <Link href="#about" className="px-3 py-2 rounded-lg hover:bg-slate-100" onClick={() => setOpen(false)}>About</Link>
            <Link href="#features" className="px-3 py-2 rounded-lg hover:bg-slate-100" onClick={() => setOpen(false)}>Features</Link>
            <Link href="#contact" className="px-3 py-2 rounded-lg hover:bg-slate-100" onClick={() => setOpen(false)}>Contact</Link>
            <Link href="/hospital/form" className="px-3 py-2 rounded-lg bg-teal-500 text-white" onClick={() => setOpen(false)}>Request Nurses</Link>
            <Link href="/admin/login" className="px-3 py-2 rounded-lg bg-slate-100" onClick={() => setOpen(false)}>Admin</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
