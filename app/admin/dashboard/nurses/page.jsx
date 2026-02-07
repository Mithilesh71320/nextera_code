"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Plus, Search, Mail, Phone, User } from "lucide-react";

export default function NursesPage() {
  const [showForm, setShowForm] = useState(false);
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchNurses() {
    const { data, error } = await supabase
      .from("nurses")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (!error) setNurses(data || []);
  }

  useEffect(() => { fetchNurses(); }, []);

  async function handleAddNurse(e) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const payload = {
      full_name: form.get("full_name"),
      email: form.get("email"),
      phone: form.get("phone"),
      department: form.get("department"),
      experience: Number(form.get("experience")),
      is_active: true,
    };

    const { error } = await supabase.from("nurses").insert([payload]);
    setLoading(false);

    if (error) { alert(error.message); return; }

    await fetchNurses();
    setShowForm(false);
    e.target.reset();
  }

  async function handleDeactivate(id) {
    const confirmDeactivate = window.confirm("Are you sure you want to deactivate this nurse?");
    if (!confirmDeactivate) return;

    const { error } = await supabase.from("nurses").update({ is_active: false }).eq("id", id);
    if (!error) fetchNurses();
  }

  return (
    <div className="nurses-wrapper flex flex-col gap-6">

      <div className="header flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Nurse Management</h2>
          <p className="text-sm text-gray-500">{nurses.length} active nurses · {nurses.length} total</p>
        </div>

        <button onClick={() => setShowForm(true)} className="add-btn bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={16} /> Add New Nurse
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-2 input flex-1">
          <Search size={16} />
          <input placeholder="Search by name or email..." className="flex-1 outline-none" />
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAddNurse} className="form-box bg-teal-50 border border-teal-200 rounded-xl p-6 flex flex-col gap-4">
          <h3 className="font-semibold">Add New Nurse</h3>

          <div className="flex gap-4 flex-col md:flex-row">
            <input name="full_name" required placeholder="Full Name" className="input flex-1" />
            <input name="email" type="email" required placeholder="Email Address" className="input flex-1" />
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            <input name="phone" required placeholder="Contact Number" className="input flex-1" />
            <input name="department" required placeholder="Department" className="input flex-1" />
          </div>

          <input name="experience" type="number" min="0" placeholder="Years of Experience" className="input exp-input w-48" />

          <div className="flex gap-3">
            <button disabled={loading} className="bg-teal-600 text-white px-6 py-2 rounded-lg">{loading ? "Adding..." : "Add Nurse"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="border px-6 py-2 rounded-lg">Cancel</button>
          </div>
        </form>
      )}

      <div className="cards flex gap-6 flex-wrap">
        {nurses.map((nurse) => (
          <div key={nurse.id} className="nurse-card bg-white rounded-xl shadow p-5 w-[300px] flex flex-col gap-3">
            <p className="font-semibold">{nurse.full_name}</p>
            <span className="text-xs bg-teal-100 text-teal-600 w-fit px-2 py-1 rounded-full">{nurse.department}</span>
            <div className="text-sm text-gray-600 flex items-center gap-2"><Mail size={14}/> {nurse.email}</div>
            <div className="text-sm text-gray-600 flex items-center gap-2"><Phone size={14}/> {nurse.phone}</div>
            <div className="text-sm text-gray-600 flex items-center gap-2"><User size={14}/> {nurse.experience} years experience</div>
            <button onClick={() => handleDeactivate(nurse.id)} className="mt-2 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100">Deactivate</button>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .header { flex-direction: column; align-items: flex-start; gap: 10px; }
          .add-btn { width: 100%; justify-content: center; }
          .exp-input { width: 100%; }
          .cards { gap: 16px; }
          .nurse-card { width: 100%; }
        }

        @media (max-width: 480px) {
          .form-box { padding: 18px 14px; }
        }
      `}</style>
    </div>
  );
}