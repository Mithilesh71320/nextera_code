"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  Building2,
  Calendar,
  Users,
  Phone,
  Search,
  RefreshCw,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [availableNurses, setAvailableNurses] = useState([]);
  const [selectedNurses, setSelectedNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function fetchRequests({ silent = false } = {}) {
    if (silent) setRefreshing(true);
    else setLoading(true);

    setError("");

    const { data, error } = await supabase
      .from("hospital_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message || "Unable to load requests.");
    } else {
      setRequests(data || []);
    }

    if (silent) setRefreshing(false);
    else setLoading(false);
  }

  useEffect(() => {
    let active = true;

    supabase
      .from("hospital_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;

        if (error) {
          setError(error.message || "Unable to load requests.");
        } else {
          setRequests(data || []);
        }

        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function openAssignMode(request) {
    setActiveRequestId(request.id);
    setSelectedNurses([]);
    setError("");
    setMessage("");

    const { data, error } = await supabase
      .from("nurses")
      .select("*")
      .eq("is_active", true)
      .eq("department", request.department);

    if (error) {
      setError(error.message || "Unable to fetch matching nurses.");
      setAvailableNurses([]);
      return;
    }

    setAvailableNurses(data || []);
  }

  async function assignNurses(request) {
    if (selectedNurses.length === 0) return;

    const required = Number(request.required_nurses ?? request.number_of_nurses ?? 0);
    const assigned = Number(request.assigned_nurses || 0);
    const remaining = Math.max(0, required - assigned);

    if (selectedNurses.length > remaining) {
      setError(`You can assign only ${remaining} nurse(s) for this request.`);
      return;
    }

    setAssigning(true);
    setError("");
    setMessage("");

    const assignedCount = assigned + selectedNurses.length;
    const newStatus = assignedCount >= required ? "completed" : "pending";

    const { error } = await supabase
      .from("hospital_requests")
      .update({ assigned_nurses: assignedCount, status: newStatus })
      .eq("id", request.id);

    setAssigning(false);

    if (error) {
      setError(error.message || "Failed to assign nurses.");
      return;
    }

    setMessage(`Assigned ${selectedNurses.length} nurse(s) successfully.`);
    setActiveRequestId(null);
    setAvailableNurses([]);
    setSelectedNurses([]);
    await fetchRequests({ silent: true });
  }

  const normalizedRequests = useMemo(() => {
    return requests.map((request) => {
      const required = Number(request.required_nurses ?? request.number_of_nurses ?? 0);
      const assigned = Number(request.assigned_nurses || 0);
      const normalizedStatus = request.status || "pending";
      return {
        ...request,
        required,
        assigned,
        normalizedStatus,
      };
    });
  }, [requests]);

  const requestStats = useMemo(() => {
    const pending = normalizedRequests.filter((r) => r.normalizedStatus === "pending").length;
    const completed = normalizedRequests.filter((r) => r.normalizedStatus === "completed").length;
    const totalRequired = normalizedRequests.reduce((sum, r) => sum + r.required, 0);
    const totalAssigned = normalizedRequests.reduce((sum, r) => sum + r.assigned, 0);
    return { pending, completed, totalRequired, totalAssigned };
  }, [normalizedRequests]);

  const filteredRequests = useMemo(() => {
    const q = query.trim().toLowerCase();

    return normalizedRequests.filter((request) => {
      const matchesStatus = statusFilter === "all"
        ? true
        : request.normalizedStatus === statusFilter;

      const matchesQuery = q
        ? `${request.hospital_name || ""} ${request.department || ""} ${request.shift || ""}`
          .toLowerCase()
          .includes(q)
        : true;

      return matchesStatus && matchesQuery;
    });
  }, [normalizedRequests, statusFilter, query]);

  if (loading) return <p className="text-sm text-gray-500">Loading requests...</p>;

  return (
    <div className="requests-wrapper flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Request Management</h2>
          <p className="text-sm text-gray-500">
            {filteredRequests.length} shown of {normalizedRequests.length} requests
          </p>
        </div>

        <button
          onClick={() => fetchRequests({ silent: true })}
          disabled={refreshing}
          className="border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2 w-fit"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      {message && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-4 py-2">
          {message}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        <SummaryCard label="Pending" value={requestStats.pending} icon={<Clock3 size={16} />} />
        <SummaryCard label="Completed" value={requestStats.completed} icon={<CheckCircle2 size={16} />} />
        <SummaryCard label="Total Required" value={requestStats.totalRequired} icon={<Users size={16} />} />
        <SummaryCard label="Total Assigned" value={requestStats.totalAssigned} icon={<Users size={16} />} />
      </div>

      <div className="filters grid gap-3 md:grid-cols-3">
        <div className="flex items-center gap-2 input">
          <Search size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by hospital, department, shift..."
            className="flex-1 outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {filteredRequests.length === 0 && (
        <p className="text-sm text-gray-500 bg-white rounded-xl shadow px-4 py-6 text-center">
          No requests matched your filters.
        </p>
      )}

      <div className="requests-list flex flex-col gap-6">
        {filteredRequests.map((req) => {
          const progress = req.required > 0
            ? Math.min(100, (req.assigned / req.required) * 100)
            : 0;

          const remaining = Math.max(0, req.required - req.assigned);
          const isCompleted = req.normalizedStatus === "completed";
          const isOpenForAssignment = !isCompleted && remaining > 0;

          return (
            <div key={req.id} className="request-card bg-white rounded-xl shadow p-6 flex flex-col gap-4">
              <div className="top-row flex justify-between items-center gap-3">
                <div className="flex items-center gap-2 font-medium">
                  <Building2 size={18} /> {req.hospital_name || "Unknown hospital"}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${isCompleted ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {isCompleted ? "Completed" : "Pending"}
                </span>
              </div>

              <div className="details flex flex-wrap gap-6 text-sm text-gray-600">
                <span>Department: {req.department || "General"}</span>
                <span>Shift: {req.shift || "N/A"}</span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {req.date || "N/A"}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} /> {req.assigned} / {req.required}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={14} /> {req.contact_name || "N/A"} - {req.contact_phone || "N/A"}
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-500">Assignment Progress</p>
                <div className="w-full h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-teal-500 rounded" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {activeRequestId !== req.id && isOpenForAssignment && (
                <button
                  onClick={() => openAssignMode(req)}
                  className="assign-btn bg-teal-600 text-white px-4 py-2 rounded-lg w-fit"
                >
                  Assign Nurses ({remaining} needed)
                </button>
              )}

              {activeRequestId === req.id && (
                <div className="assign-box bg-teal-50 border border-teal-200 rounded-xl p-4 flex flex-col gap-4">
                  <p className="font-medium">Available Nurses ({availableNurses.length} matching)</p>

                  {availableNurses.length === 0 && (
                    <p className="text-sm text-gray-500">No active nurses available in this department.</p>
                  )}

                  <div className="nurse-options flex gap-4 flex-wrap">
                    {availableNurses.map((nurse) => {
                      const reachedLimit = selectedNurses.length >= remaining && !selectedNurses.includes(nurse.id);
                      return (
                        <label key={nurse.id} className="option bg-white rounded-lg p-3 shadow cursor-pointer flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={selectedNurses.includes(nurse.id)}
                            disabled={reachedLimit}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedNurses((prev) => [...prev, nurse.id]);
                              } else {
                                setSelectedNurses((prev) => prev.filter((id) => id !== nurse.id));
                              }
                            }}
                          />
                          <div>
                            <p className="font-medium">{nurse.full_name}</p>
                            <p className="text-xs text-gray-500">
                              {Number(nurse.experience || 0)} years - {nurse.phone}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  <div className="flex gap-3 flex-col sm:flex-row">
                    <button
                      onClick={() => assignNurses(req)}
                      disabled={assigning || selectedNurses.length === 0}
                      className="bg-teal-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
                    >
                      {assigning ? "Assigning..." : `Assign ${selectedNurses.length} Nurse(s)`}
                    </button>
                    <button
                      onClick={() => setActiveRequestId(null)}
                      className="border px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .top-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .details {
            gap: 10px;
          }

          .assign-btn {
            width: 100%;
            text-align: center;
          }

          .option {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .request-card {
            padding: 18px 14px;
          }

          .assign-box {
            padding: 14px;
          }
        }
      `}</style>
    </div>
  );
}

function SummaryCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
      <div className="p-2 rounded-lg bg-teal-100 text-teal-700">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
