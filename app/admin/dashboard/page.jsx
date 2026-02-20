"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Users,
  Clock,
  CheckCircle,
  ClipboardList,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import {
  getDashboardStats,
  getRecentRequests,
  getNursesByDepartment,
} from "@/lib/dashboard";

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [deptStats, setDeptStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [statsData, recentData, deptData] = await Promise.all([
        getDashboardStats(),
        getRecentRequests(),
        getNursesByDepartment(),
      ]);

      setStats(statsData);
      setRecent(recentData);
      setDeptStats(deptData);
      setLastUpdated(new Date());
    } catch (_error) {
      setError("Unable to load dashboard data right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const topDepartment = useMemo(() => {
    if (!deptStats.length) return null;
    return deptStats[0];
  }, [deptStats]);

  const pendingDemand = useMemo(() => {
    return recent.reduce((total, req) => {
      const required = Number(req.required_nurses ?? req.number_of_nurses ?? 0);
      const assigned = Number(req.assigned_nurses || 0);
      const left = Math.max(0, required - assigned);
      return total + left;
    }, 0);
  }, [recent]);

  if (loading && !stats) {
    return <p className="text-sm text-gray-500">Loading dashboard...</p>;
  }

  if (error && !stats) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="dashboard-wrapper flex flex-col gap-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
          <p className="text-sm text-gray-500">
            {lastUpdated
              ? `Last updated: ${lastUpdated.toLocaleTimeString()}`
              : "Live operations snapshot"}
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="bg-white border border-gray-200 hover:border-teal-500 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 w-fit"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <div className="stats-grid grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<Users />} label="Active Nurses" value={stats.activeNurses} />
        <StatCard icon={<Clock />} label="Pending Requests" value={stats.pendingRequests} />
        <StatCard icon={<CheckCircle />} label="Completed Requests" value={stats.completedRequests} />
        <StatCard icon={<ClipboardList />} label="Assigned Nurses" value={stats.totalAssignments} />
      </div>

      <div className="kpi-row grid gap-4 lg:grid-cols-3">
        <KpiCard
          title="Fill Rate"
          value={`${stats.fillRate}%`}
          hint={`${stats.totalAssignments}/${stats.totalRequested} requested filled`}
          icon={<TrendingUp size={16} />}
        />
        <KpiCard
          title="Top Department"
          value={topDepartment?.department || "No data"}
          hint={topDepartment ? `${topDepartment.count} active nurses` : "Add nurses to see trends"}
          icon={<Users size={16} />}
        />
        <KpiCard
          title="Open Demand"
          value={pendingDemand}
          hint="Unassigned nurses needed across recent requests"
          icon={<Clock size={16} />}
        />
      </div>

      <div className="middle-section grid gap-6 lg:grid-cols-2">
        <div className="dept-card bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <h3 className="font-semibold">Nurses by Department</h3>

          {!deptStats.length && (
            <p className="text-sm text-gray-500">No active nurses found.</p>
          )}

          {deptStats.map((dept) => (
            <ProgressRow
              key={dept.department}
              label={dept.department}
              value={dept.count}
              max={stats.activeNurses}
            />
          ))}
        </div>

        <div className="recent-card bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <h3 className="font-semibold">Latest Requests</h3>

          {recent.length === 0 && (
            <p className="text-sm text-gray-500">No requests yet.</p>
          )}

          {recent.slice(0, 6).map((req) => {
            const required = Number(req.required_nurses ?? req.number_of_nurses ?? 0);
            const assigned = Number(req.assigned_nurses || 0);
            const isCompleted = (req.status || "pending") === "completed";

            return (
              <div key={req.id} className="recent-row flex justify-between gap-3 border-b pb-3 last:border-none">
                <div>
                  <p className="font-medium text-sm">{req.hospital_name || "Unknown hospital"}</p>
                  <p className="text-xs text-gray-500">
                    {req.department || "General"} - {req.shift || "N/A"} - {assigned}/{required}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full h-fit ${isCompleted ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {isCompleted ? "Completed" : "Pending"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="quick-actions bg-teal-50 rounded-xl p-6 flex flex-col gap-4">
        <h3 className="font-semibold">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <ActionCard
            href="/admin/dashboard/nurses"
            title="Manage Nurses"
            desc="Add staff, review departments, and deactivate unavailable profiles."
          />
          <ActionCard
            href="/admin/dashboard/requests"
            title="Process Requests"
            desc="Assign nurses to hospitals and close pending staffing demand."
          />
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .dept-card,
          .recent-card,
          .quick-actions {
            padding: 18px 14px;
          }
        }
      `}</style>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex gap-4 items-center">
      <div className="bg-teal-100 text-teal-600 p-3 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

function KpiCard({ title, value, hint, icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
      <div className="text-teal-600 mb-2">{icon}</div>
      <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{hint}</p>
    </div>
  );
}

function ProgressRow({ label, value, max }) {
  const percentage = max ? (value / max) * 100 : 0;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{value} nurses</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div className="h-2 rounded bg-teal-500" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function ActionCard({ href, title, desc }) {
  return (
    <Link href={href} className="bg-white rounded-xl p-4 shadow hover:shadow-md transition">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-600">{desc}</p>
    </Link>
  );
}
