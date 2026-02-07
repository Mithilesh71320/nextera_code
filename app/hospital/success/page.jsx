import Link from "next/link";

export default function RequestSubmitted() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* CENTER CONTENT */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-8 text-center">

          {/* CHECK ICON */}
          <div className="mx-auto w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* TITLE */}
          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            Request Submitted!
          </h2>

          <p className="mt-2 text-gray-600">
            Your nurse staffing request has been received and is being processed.
          </p>

          {/* INFO BOX */}
          <div className="mt-6 bg-teal-50 border border-teal-100 rounded-xl p-5 text-left">
            <h3 className="font-semibold text-gray-800 mb-3">
              What happens next?
            </h3>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm">
                  ✓
                </span>
                <p className="text-gray-600">
                  Our admin team will review your request within 1 hour
                </p>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm">
                  ✓
                </span>
                <p className="text-gray-600">
                  Qualified nurses will be assigned based on availability
                </p>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm">
                  ✓
                </span>
                <p className="text-gray-600">
                  You'll receive a confirmation with nurse details
                </p>
              </li>
            </ul>
          </div>

          {/* ACTIONS */}
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href="/"
              className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:text-teal-600"
            >
              Back to Home
            </Link>

            <Link
              href="/admin/login"
              className="px-5 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        © 2026 NextEra Code. All rights reserved.
        <p className="text-xs mt-1">
          Empowering Healthcare Through Technology
        </p>
      </footer>
    </div>
  );
}
