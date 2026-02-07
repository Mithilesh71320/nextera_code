"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Clock,
  CheckCircle,
  ClipboardList,
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

  useEffect(() => {
    async function loadData() {
      const statsData = await getDashboardStats();
      const recentData = await getRecentRequests();
      const deptData = await getNursesByDepartment();

      setStats(statsData);
      setRecent(recentData);
      setDeptStats(deptData);
    }

    loadData();
  }, []);

  if (!stats) return null;

  return (
    <div className="dashboard-wrapper flex flex-col gap-8">

      {/* STATS */}
      <div className="stats-grid flex gap-6 flex-wrap">
        <StatCard icon={<Users />} label="Active Nurses" value={stats.activeNurses} />
        <StatCard icon={<Clock />} label="Pending Requests" value={stats.pendingRequests} />
        <StatCard icon={<CheckCircle />} label="Completed" value={stats.completedRequests} sub="of total" />
        <StatCard icon={<ClipboardList />} label="Total Assignments" value={stats.totalAssignments} />
      </div>

      {/* MIDDLE SECTION */}
      <div className="middle-section flex gap-6 flex-col lg:flex-row">

        <div className="dept-card flex-1 bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <h2 className="font-semibold">Nurses by Department</h2>

          {deptStats.length === 0 && (
            <p className="text-sm text-gray-500">No active nurses found</p>
          )}

          {deptStats.map((dept) => (
            <ProgressRow key={dept.department} label={dept.department} value={dept.count} max={stats.activeNurses} />
          ))}
        </div>

        <div className="recent-card flex-1 bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <h2 className="font-semibold">Recent Requests</h2>

          {recent.length === 0 && (
            <p className="text-sm text-gray-500">No recent requests</p>
          )}

          {recent.map((req) => (
            <div key={req.id} className="recent-row flex justify-between items-start border-b pb-3 last:border-none">
              <div>
                <p className="font-medium text-sm">{req.hospital_name}</p>
                <p className="text-xs text-gray-500">{req.department} · {req.shift} · {req.number_of_nurses} nurses</p>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Pending</span>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="quick-actions bg-teal-50 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="font-semibold">Quick Actions</h2>

        <div className="actions-grid flex gap-4 flex-col md:flex-row">
          <ActionCard title="Add New Nurse" desc="Register a new nurse in the system" />
          <ActionCard title="Process Requests" desc="Assign nurses to pending requests" />
          <ActionCard title="View Schedule" desc="Check daily assignments" />
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .stats-grid { gap: 14px; }
          .stats-grid > div { min-width: 100%; }

          .middle-section { gap: 18px; }
          .dept-card, .recent-card { padding: 18px; }

          .recent-row { flex-direction: column; gap: 6px; }

          .actions-grid { gap: 12px; }
        }

        @media (max-width: 480px) {
          .quick-actions { padding: 18px 14px; }
        }
      `}</style>
    </div>
  );
}

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex gap-4 items-center min-w-[220px]">
      <div className="bg-teal-100 text-teal-600 p-3 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold">{value} {sub && <span className="text-xs text-gray-400">{sub}</span>}</p>
      </div>
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

function ActionCard({ title, desc }) {
  return (
    <div className="flex-1 bg-white rounded-xl p-4 shadow">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
