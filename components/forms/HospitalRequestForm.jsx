"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import {
  ClipboardList,
  User,
  Phone,
  Stethoscope,
  Clock,
  Users,
  Calendar,
  AlertCircle,
} from "lucide-react";

const INITIAL_VALUES = {
  hospital_name: "",
  contact_person: "",
  contact_number: "",
  department: "",
  shift: "",
  number_of_nurses: 1,
  date_required: "",
};

export default function HospitalRequestForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState(INITIAL_VALUES);
  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const updateField = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!values.hospital_name.trim()) return "Hospital name is required.";
    if (!values.department.trim()) return "Department is required.";
    if (!values.shift.trim()) return "Shift is required.";

    const nurses = Number(values.number_of_nurses);
    if (!Number.isInteger(nurses) || nurses < 1 || nurses > 200) {
      return "Number of nurses must be between 1 and 200.";
    }

    if (!values.date_required) return "Date required is mandatory.";
    if (values.date_required < minDate) return "Date required cannot be in the past.";

    if (values.contact_number.trim() && !/^[+]?[\d\s\-()]{7,20}$/.test(values.contact_number.trim())) {
      return "Contact number format looks invalid.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      hospital_name: values.hospital_name.trim(),
      contact_person: values.contact_person.trim(),
      contact_number: values.contact_number.trim(),
      department: values.department.trim(),
      shift: values.shift.trim(),
      number_of_nurses: Number(values.number_of_nurses),
      date_required: values.date_required,
    };

    const { error } = await supabase.from("hospital_requests").insert([payload]);
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/hospital/success");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-6xl bg-white rounded-3xl shadow-[0_8px_24px_rgba(15,23,42,0.08)] overflow-hidden border border-slate-100"
    >
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-5 sm:px-8 py-6 sm:py-7 flex items-center gap-4 text-white">
        <div className="bg-white/20 p-3 rounded-xl">
          <ClipboardList size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Hospital Nurse Request</h1>
          <p className="text-sm opacity-90">Submit your staffing requirements</p>
        </div>
      </div>

      <div className="p-5 sm:p-8 flex flex-col gap-7">
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <ClipboardList size={18} className="text-teal-600" />
            Hospital Information
          </h2>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-700">Hospital Name *</label>
            <input
              required
              value={values.hospital_name}
              onChange={(e) => updateField("hospital_name", e.target.value)}
              className="h-12 rounded-xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter hospital name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-700">Contact Person</label>
              <div className="h-12 rounded-xl border border-slate-200 px-4 flex items-center gap-2 focus-within:ring-2 focus-within:ring-teal-500">
                <User size={16} className="text-slate-400" />
                <input
                  value={values.contact_person}
                  onChange={(e) => updateField("contact_person", e.target.value)}
                  className="flex-1 outline-none"
                  placeholder="Contact person name"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-700">Contact Number</label>
              <div className="h-12 rounded-xl border border-slate-200 px-4 flex items-center gap-2 focus-within:ring-2 focus-within:ring-teal-500">
                <Phone size={16} className="text-slate-400" />
                <input
                  value={values.contact_number}
                  onChange={(e) => updateField("contact_number", e.target.value)}
                  className="flex-1 outline-none"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-slate-100" />

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Stethoscope size={18} className="text-teal-600" />
            Staffing Requirements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-700">Department *</label>
              <div className="h-12 rounded-xl border border-slate-200 px-4 flex items-center gap-2 focus-within:ring-2 focus-within:ring-teal-500">
                <Stethoscope size={16} className="text-slate-400" />
                <input
                  required
                  value={values.department}
                  onChange={(e) => updateField("department", e.target.value)}
                  className="flex-1 outline-none"
                  placeholder=""
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-700">Shift *</label>
              <div className="h-12 rounded-xl border border-slate-200 px-4 flex items-center gap-2 focus-within:ring-2 focus-within:ring-teal-500">
                <Clock size={16} className="text-slate-400" />
                <input
                  required
                  value={values.shift}
                  onChange={(e) => updateField("shift", e.target.value)}
                  className="flex-1 outline-none"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-700">Number of Nurses Required *</label>
              <div className="h-12 rounded-xl border border-slate-200 px-4 flex items-center gap-2 focus-within:ring-2 focus-within:ring-teal-500">
                <Users size={16} className="text-slate-400" />
                <input
                  type="number"
                  min="1"
                  max="200"
                  required
                  value={values.number_of_nurses}
                  onChange={(e) => updateField("number_of_nurses", e.target.value)}
                  className="flex-1 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-700">Date Required *</label>
              <div className="h-12 rounded-xl border border-slate-200 px-4 flex items-center gap-2 focus-within:ring-2 focus-within:ring-teal-500">
                <Calendar size={16} className="text-slate-400" />
                <input
                  type="date"
                  min={minDate}
                  required
                  value={values.date_required}
                  onChange={(e) => updateField("date_required", e.target.value)}
                  className="flex-1 outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700 flex items-start gap-2">
            <AlertCircle size={16} className="mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:opacity-95 disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Submit Nurse Request"}
        </button>
      </div>
    </form>
  );
}
