"use client";

import { useState } from "react";
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
  CheckCircle
} from "lucide-react";

export default function HospitalRequestForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const payload = {
      hospital_name: formData.get("hospital_name"),
      contact_person: formData.get("contact_person"),
      contact_number: formData.get("contact_number"),
      department: formData.get("department"),
      shift: formData.get("shift"),
      number_of_nurses: Number(formData.get("number_of_nurses")),
      date_required: formData.get("date_required"),
    };

    const { error } = await supabase
      .from("hospital_requests")
      .insert([payload]);

    setLoading(false);

    if (error) alert(error.message);
    else router.push("/hospital/success");
  };

  return (
    <form onSubmit={handleSubmit} className="req-form w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
      <div className="header bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-6 flex items-center gap-4 text-white">
        <div className="bg-white/20 p-3 rounded-lg"><ClipboardList /></div>
        <div>
          <h1 className="title text-xl font-semibold">Hospital Nurse Request</h1>
          <p className="text-sm opacity-90">Submit your staffing requirements</p>
        </div>
      </div>

      <div className="body p-6 flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <h2 className="font-semibold flex items-center gap-2"><ClipboardList size={18}/> Hospital Information</h2>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Hospital Name *</label>
            <input name="hospital_name" required className="input" />
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm">Contact Person</label>
              <div className="input flex items-center gap-2"><User size={16}/><input name="contact_person" className="flex-1 outline-none"/></div>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm">Contact Number</label>
              <div className="input flex items-center gap-2"><Phone size={16}/><input name="contact_number" className="flex-1 outline-none"/></div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-semibold flex items-center gap-2"><Stethoscope size={18}/> Staffing Requirements</h2>

          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 input flex items-center gap-2"><Stethoscope size={16}/><input name="department" required placeholder="Department" className="flex-1 outline-none"/></div>
            <div className="flex-1 input flex items-center gap-2"><Clock size={16}/><input name="shift" required placeholder="Shift" className="flex-1 outline-none"/></div>
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 input flex items-center gap-2"><Users size={16}/><input type="number" min="1" name="number_of_nurses" required placeholder="Number of Nurses Required" className="flex-1 outline-none"/></div>
            <div className="flex-1 input flex items-center gap-2"><Calendar size={16}/><input type="date" name="date_required" required className="flex-1 outline-none"/></div>
          </div>
        </section>

        <div className="info bg-teal-50 border border-teal-100 rounded-lg p-4 flex gap-3">
          <CheckCircle className="text-teal-600"/>
          <div>
            <p className="font-medium text-sm">Quick Response Guaranteed</p>
            <p className="text-xs text-gray-600">Requests reviewed within 1 hour during business hours</p>
          </div>
        </div>

        <button disabled={loading} className="submit-btn w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium">
          {loading ? "Submitting..." : "Submit Nurse Request"}
        </button>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .header { padding: 18px 16px; }
          .title { font-size: 18px; }
          .body { padding: 18px 14px; gap: 26px; }
          .info { flex-direction: column; }
        }

        @media (max-width: 480px) {
          .submit-btn { font-size: 14px; padding: 12px; }
        }
      `}</style>
    </form>
  );
}