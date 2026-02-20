"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Plus, Search, Mail, Phone, User, RefreshCw, Building2 } from "lucide-react";

export default function NursesPage() {
  const [showForm, setShowForm] = useState(false);
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function fetchNurses({ silent = false } = {}) {
    if (silent) setRefreshing(true);
    else setLoading(true);

    setError("");

    const { data, error } = await supabase
      .from("nurses")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message || "Unable to load nurses.");
    } else {
      setNurses(data || []);
    }

    if (silent) setRefreshing(false);
    else setLoading(false);
  }

  useEffect(() => {
    let active = true;

    supabase
      .from("nurses")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;

        if (error) {
          setError(error.message || "Unable to load nurses.");
        } else {
          setNurses(data || []);
        }

        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleAddNurse(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

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
    setSaving(false);

    if (error) {
      setError(error.message || "Could not add nurse.");
      return;
    }

    setMessage("Nurse added successfully.");
    await fetchNurses({ silent: true });
    setShowForm(false);
    e.target.reset();
  }

  async function handleDeactivate(id) {
    const confirmDeactivate = window.confirm("Are you sure you want to deactivate this nurse?");
    if (!confirmDeactivate) return;

    setError("");
    setMessage("");

    const { error } = await supabase
      .from("nurses")
      .update({ is_active: false })
      .eq("id", id);

    if (error) {
      setError(error.message || "Could not deactivate nurse.");
      return;
    }

    setMessage("Nurse deactivated.");
    await fetchNurses({ silent: true });
  }

  const departments = useMemo(() => {
    return Array.from(
      new Set(
        nurses
          .map((nurse) => nurse.department)
          .filter(Boolean)
      )
    ).sort();
  }, [nurses]);

  const filteredNurses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = nurses.filter((nurse) => {
      const matchesDepartment = departmentFilter === "all"
        ? true
        : nurse.department === departmentFilter;

      const searchable = [
        nurse.full_name,
        nurse.email,
        nurse.phone,
        nurse.department,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalizedQuery ? searchable.includes(normalizedQuery) : true;
      return matchesDepartment && matchesQuery;
    });

    if (sortBy === "name") {
      return [...filtered].sort((a, b) => (a.full_name || "").localeCompare(b.full_name || ""));
    }

    if (sortBy === "experience") {
      return [...filtered].sort((a, b) => Number(b.experience || 0) - Number(a.experience || 0));
    }

    return filtered;
  }, [nurses, query, departmentFilter, sortBy]);

  const averageExperience = useMemo(() => {
    if (!nurses.length) return 0;
    const sum = nurses.reduce((acc, nurse) => acc + Number(nurse.experience || 0), 0);
    return (sum / nurses.length).toFixed(1);
  }, [nurses]);

  if (loading) return <p className="text-sm text-gray-500">Loading nurses...</p>;

  return (
    <div className="nurses-wrapper flex flex-col gap-6">
      <div className="header flex justify-between items-start gap-4 flex-col lg:flex-row lg:items-center">
        <div>
          <h2 className="text-xl font-semibold">Nurse Management</h2>
          <p className="text-sm text-gray-500">
            {filteredNurses.length} shown of {nurses.length} active nurses
          </p>
        </div>

        <div className="flex gap-2 w-full lg:w-auto">
          <button
            onClick={() => fetchNurses({ silent: true })}
            disabled={refreshing}
            className="border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>

          <button
            onClick={() => setShowForm(true)}
            className="add-btn bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={16} /> Add New Nurse
          </button>
        </div>
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

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard label="Active Nurses" value={nurses.length} icon={<User size={16} />} />
        <SummaryCard label="Departments" value={departments.length} icon={<Building2 size={16} />} />
        <SummaryCard label="Avg Experience" value={`${averageExperience} yrs`} icon={<Plus size={16} />} />
      </div>

      <div className="filters grid gap-3 md:grid-cols-3">
        <div className="flex items-center gap-2 input">
          <Search size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="flex-1 outline-none"
          />
        </div>

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="input"
        >
          <option value="all">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input"
        >
          <option value="latest">Latest Added</option>
          <option value="name">Name A-Z</option>
          <option value="experience">Highest Experience</option>
        </select>
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

          <input
            name="experience"
            type="number"
            min="0"
            placeholder="Years of Experience"
            className="input exp-input w-48"
            required
          />

          <div className="flex gap-3">
            <button disabled={saving} className="bg-teal-600 text-white px-6 py-2 rounded-lg">
              {saving ? "Adding..." : "Add Nurse"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="border px-6 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </form>
      )}

      {!filteredNurses.length && (
        <p className="text-sm text-gray-500 bg-white rounded-xl shadow px-4 py-6 text-center">
          No nurses matched your filters.
        </p>
      )}

      <div className="cards grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredNurses.map((nurse) => (
          <div key={nurse.id} className="nurse-card bg-white rounded-xl shadow p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold">{nurse.full_name}</p>
              <span className="text-xs bg-teal-100 text-teal-700 w-fit px-2 py-1 rounded-full">
                {nurse.department || "General"}
              </span>
            </div>

            <div className="text-sm text-gray-600 flex items-center gap-2">
              <Mail size={14} /> {nurse.email}
            </div>
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <Phone size={14} /> {nurse.phone}
            </div>
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <User size={14} /> {Number(nurse.experience || 0)} years experience
            </div>

            <button
              onClick={() => handleDeactivate(nurse.id)}
              className="mt-2 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100"
            >
              Deactivate
            </button>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .exp-input {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .form-box {
            padding: 18px 14px;
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
