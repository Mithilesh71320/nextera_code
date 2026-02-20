"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Users, CheckCircle, Clock3, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function LiveDashboard() {
  const [stats, setStats] = useState({
    activeNurses: 0,
    pendingRequests: 0,
    todayAssignments: 0,
    completionRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatedAt, setUpdatedAt] = useState(null);

  const loadStats = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setLoading(true);
    setError("");

    try {
      const [nurseRes, requestRes] = await Promise.all([
        supabase
          .from("nurses")
          .select("id", { count: "exact", head: true })
          .eq("is_active", true),
        supabase
          .from("hospital_requests")
          .select("status, date, assigned_nurses, required_nurses, number_of_nurses, created_at"),
      ]);

      if (nurseRes.error) throw nurseRes.error;
      if (requestRes.error) throw requestRes.error;

      const requests = requestRes.data || [];
      const today = new Date().toISOString().split("T")[0];

      const pendingRequests = requests.filter((req) => {
        const status = req.status || "pending";
        return status === "pending";
      }).length;

      const completedCount = requests.filter((req) => req.status === "completed").length;
      const completionRate = requests.length
        ? Math.round((completedCount / requests.length) * 100)
        : 0;

      const todayAssignments = requests.reduce((sum, req) => {
        const requestDate = req.date || req.created_at?.split("T")[0];
        const assigned = Number(req.assigned_nurses || 0);
        return requestDate === today ? sum + assigned : sum;
      }, 0);

      setStats({
        activeNurses: nurseRes.count || 0,
        pendingRequests,
        todayAssignments,
        completionRate,
      });
      setUpdatedAt(new Date());
    } catch (_err) {
      setError("Unable to load live stats.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStats();

    const interval = setInterval(() => {
      void loadStats({ silent: true });
    }, 30000);

    return () => clearInterval(interval);
  }, [loadStats]);

  const progressWidth = useMemo(() => {
    return `${Math.max(0, Math.min(100, stats.completionRate))}%`;
  }, [stats.completionRate]);

  return (
    <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border border-white p-6 w-full max-w-[360px] flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-slate-800">Live Dashboard</p>
        <button
          onClick={() => loadStats({ silent: true })}
          className="text-xs text-teal-700 flex items-center gap-1"
          aria-label="Refresh live dashboard"
        >
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
          Live
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        <StatTile
          icon={<Users size={16} />}
          label="Active Nurses"
          value={loading ? "--" : stats.activeNurses}
          iconColor="bg-teal-500"
          bgColor="bg-teal-50"
        />
        <StatTile
          icon={<Clock3 size={16} />}
          label="Pending"
          value={loading ? "--" : stats.pendingRequests}
          iconColor="bg-amber-500"
          bgColor="bg-amber-50"
        />
      </div>

      <div className="bg-indigo-50 rounded-xl p-4 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 text-white p-2 rounded-lg">
            <CheckCircle size={16} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Today&apos;s Assignments</p>
            <p className="text-xl font-bold text-slate-900">
              {loading ? "--" : stats.todayAssignments}
            </p>
          </div>
        </div>

        <div className="w-full h-2 bg-indigo-100 rounded">
          <div className="h-2 bg-indigo-500 rounded transition-all duration-500" style={{ width: progressWidth }} />
        </div>
        <p className="text-xs text-slate-500">
          Completion Rate: {loading ? "--" : `${stats.completionRate}%`}
        </p>
      </div>

      <p className="text-[11px] text-slate-400">
        {updatedAt ? `Updated at ${updatedAt.toLocaleTimeString()}` : "Syncing live data..."}
      </p>
    </div>
  );
}

function StatTile({ icon, label, value, iconColor, bgColor }) {
  return (
    <div className={`${bgColor} rounded-xl p-3 flex items-center gap-3`}>
      <div className={`${iconColor} text-white p-2 rounded-lg`}>{icon}</div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-lg font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
