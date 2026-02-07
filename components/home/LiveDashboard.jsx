"use client";

import { Users, CheckCircle } from "lucide-react";

export default function LiveDashboard() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-[320px] flex flex-col gap-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <p className="font-semibold text-slate-800">Live Dashboard</p>
        <span className="text-xs text-green-600 flex items-center gap-1">
          ● Live
        </span>
      </div>

      {/* AVAILABLE NURSES */}
      <div className="bg-teal-50 rounded-xl p-4 flex items-center gap-4">
        <div className="bg-teal-500 text-white p-3 rounded-lg">
          <Users size={18} />
        </div>
        <div>
          <p className="text-sm text-slate-500">Available Nurses</p>
          <p className="text-2xl font-bold text-slate-900">124</p>
        </div>
      </div>

      {/* ASSIGNMENTS */}
      <div className="bg-indigo-50 rounded-xl p-4 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 text-white p-2 rounded-lg">
            <CheckCircle size={16} />
          </div>
          <div>
            <p className="text-sm text-slate-500">
              Today’s Assignments
            </p>
            <p className="text-xl font-bold text-slate-900">43</p>
          </div>
        </div>

        <div className="w-full h-2 bg-indigo-100 rounded">
          <div
            className="h-2 bg-indigo-500 rounded"
            style={{ width: "78%" }}
          />
        </div>
      </div>
    </div>
  );
}
