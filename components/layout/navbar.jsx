import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
            N
          </div>
          <div>
            <p className="font-semibold leading-none">NextEra Code</p>
            <p className="text-xs text-gray-500">Healthcare Staffing</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link
            href="/hospital/form"
            className="bg-teal-600 text-white px-4 py-2 rounded-md"
          >
            Request Nurses
          </Link>
          <Link href="/admin/login">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
