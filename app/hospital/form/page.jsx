import HospitalRequestForm from "@/components/forms/HospitalRequestForm";
import Navbar from "@/components/layout/navbar";

export default function HospitalFormPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex justify-center py-6 sm:py-10 md:py-14 px-3 sm:px-4">
        <HospitalRequestForm />
      </main>
    </div>
  );
}
