export default function Features() {
  return (
    <section id="features" className="w-full bg-white py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-teal-700 bg-teal-100 rounded-full">
            <ActivityIcon />
            Platform Features
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900">
            Everything You Need in One Place
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            A complete workflow for nurse staffing, assignment, and coordination.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, gradient, Icon }) {
  return (
    <div className="bg-slate-50/90 rounded-3xl p-8 border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition">
      <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-sm mb-6 text-white`}>
        <Icon />
      </div>

      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

const FEATURES = [
  {
    title: "Hospital Portal",
    description: "Submit staffing requests quickly with a simple workflow for hospital operations teams.",
    gradient: "from-teal-400 to-cyan-500",
    Icon: BuildingIcon,
  },
  {
    title: "Nurse Directory",
    description: "Access verified nurse profiles with experience, department, and availability details.",
    gradient: "from-sky-500 to-blue-600",
    Icon: UsersIcon,
  },
  {
    title: "Smart Matching",
    description: "Match staffing demand to the right nurses by department and shift requirements.",
    gradient: "from-indigo-500 to-slate-700",
    Icon: ZapIcon,
  },
  {
    title: "Request Tracking",
    description: "Track pending and completed requests in real time with clear assignment progress.",
    gradient: "from-emerald-400 to-green-600",
    Icon: CalendarIcon,
  },
  {
    title: "Conflict Prevention",
    description: "Reduce assignment errors and avoid overbooking with structured allocation controls.",
    gradient: "from-orange-400 to-red-500",
    Icon: ShieldIcon,
  },
  {
    title: "Analytics Dashboard",
    description: "Monitor performance using live metrics, demand trends, and fulfillment insights.",
    gradient: "from-cyan-400 to-teal-600",
    Icon: ActivityIcon,
  },
];

function ActivityIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 12h4" />
      <path d="M10 8h4" />
      <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
      <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
      <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}
