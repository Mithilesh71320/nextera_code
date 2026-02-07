"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Building2, Calendar, Users, Phone } from "lucide-react";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [availableNurses, setAvailableNurses] = useState([]);
  const [selectedNurses, setSelectedNurses] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchRequests() {
    setLoading(true);
    const { data, error } = await supabase
      .from("hospital_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      const pending = (data || []).filter((r) => r.status === "pending" || r.status === null);
      setRequests(pending);
    }
    setLoading(false);
  }

  useEffect(() => { fetchRequests(); }, []);

  async function openAssignMode(request) {
    setActiveRequestId(request.id);
    setSelectedNurses([]);

    const { data } = await supabase
      .from("nurses")
      .select("*")
      .eq("is_active", true)
      .eq("department", request.department);

    setAvailableNurses(data || []);
  }

  async function assignNurses(request) {
    if (selectedNurses.length === 0) return;

    const assignedCount = (request.assigned_nurses || 0) + selectedNurses.length;
    const newStatus = assignedCount >= request.required_nurses ? "completed" : "pending";

    await supabase
      .from("hospital_requests")
      .update({ assigned_nurses: assignedCount, status: newStatus })
      .eq("id", request.id);

    setActiveRequestId(null);
    fetchRequests();
  }

  if (loading) return <p className="text-sm text-gray-500">Loading requests...</p>;

  return (
    <div className="requests-wrapper flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Request Management</h2>
        <p className="text-sm text-gray-500">{requests.length} pending · 0 completed</p>
      </div>

      {requests.length === 0 && <p className="text-sm text-gray-500">No pending requests found.</p>}

      <div className="requests-list flex flex-col gap-6">
        {requests.map((req) => {
          const progress = ((req.assigned_nurses || 0) / req.required_nurses) * 100;

          return (
            <div key={req.id} className="request-card bg-white rounded-xl shadow p-6 flex flex-col gap-4">
              <div className="top-row flex justify-between items-center">
                <div className="flex items-center gap-2 font-medium"><Building2 size={18}/> {req.hospital_name}</div>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Pending</span>
              </div>

              <div className="details flex flex-wrap gap-6 text-sm text-gray-600">
                <span>Department: {req.department}</span>
                <span>Shift: {req.shift}</span>
                <span className="flex items-center gap-1"><Calendar size={14}/> {req.date}</span>
                <span className="flex items-center gap-1"><Users size={14}/> {req.assigned_nurses || 0} / {req.required_nurses}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600"><Phone size={14}/> {req.contact_name} · {req.contact_phone}</div>

              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-500">Assignment Progress</p>
                <div className="w-full h-2 bg-gray-200 rounded"><div className="h-2 bg-teal-500 rounded" style={{ width: `${progress}%` }}/></div>
              </div>

              {activeRequestId !== req.id && (
                <button onClick={() => openAssignMode(req)} className="assign-btn bg-teal-600 text-white px-4 py-2 rounded-lg w-fit">
                  Assign Nurses ({req.required_nurses - (req.assigned_nurses || 0)} needed)
                </button>
              )}

              {activeRequestId === req.id && (
                <div className="assign-box bg-teal-50 border border-teal-200 rounded-xl p-4 flex flex-col gap-4">
                  <p className="font-medium">Available Nurses ({availableNurses.length} matching)</p>

                  <div className="nurse-options flex gap-4 flex-wrap">
                    {availableNurses.map((nurse) => (
                      <label key={nurse.id} className="option bg-white rounded-lg p-3 shadow cursor-pointer flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedNurses.includes(nurse.id)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedNurses((prev) => [...prev, nurse.id]);
                            else setSelectedNurses((prev) => prev.filter((id) => id !== nurse.id));
                          }}
                        />
                        <div>
                          <p className="font-medium">{nurse.full_name}</p>
                          <p className="text-xs text-gray-500">{nurse.experience} years · {nurse.phone}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => assignNurses(req)} className="bg-teal-600 text-white px-4 py-2 rounded-lg">Assign {selectedNurses.length} Nurses</button>
                    <button onClick={() => setActiveRequestId(null)} className="border px-4 py-2 rounded-lg">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .top-row { flex-direction: column; align-items: flex-start; gap: 8px; }
          .details { gap: 10px; }
          .assign-btn { width: 100%; text-align: center; }
          .option { width: 100%; }
        }

        @media (max-width: 480px) {
          .request-card { padding: 18px 14px; }
          .assign-box { padding: 14px; }
        }
      `}</style>
    </div>
  );
}