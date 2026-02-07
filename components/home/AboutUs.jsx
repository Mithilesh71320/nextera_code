import Image from "next/image";

export default function AboutUs() {
  return (
    <section id="AboutUs" className="bg-white py-20 px-6 scroll-mt-24 w-full bg-white py-24">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-4">
            <Image
              src="/heart.svg"
              alt="About Us"
              width={16}
              height={16}
            />
            About Us
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Healthcare Staffing Made Simple
          </h1>

          <p className="text-slate-600 text-lg">
            We're on a mission to transform how hospitals and nurses connect,
            making healthcare staffing effortless, reliable, and human-centered.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Our Story
            </h2>

            <p className="text-slate-600 mb-4 leading-relaxed">
              Founded in 2024, NextEra Code emerged from a simple observation:
              healthcare facilities struggled with last-minute staffing needs,
              while qualified nurses faced challenges finding consistent work.
            </p>

            <p className="text-slate-600 mb-8 leading-relaxed">
              Today, we've built a platform that brings peace of mind to both
              hospitals and nursing professionals, ensuring better patient care.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-emerald-50 p-6">
                <Image
                  src="/target.svg"
                  alt="Mission"
                  width={32}
                  height={32}
                />
                <h3 className="font-semibold text-slate-900 mt-3 mb-2">
                  Our Mission
                </h3>
                <p className="text-slate-600 text-sm">
                  Ensuring every hospital has the nursing staff they need,
                  exactly when they need it.
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 p-6">
                <Image
                  src="/sparkles.svg"
                  alt="Vision"
                  width={32}
                  height={32}
                />
                <h3 className="font-semibold text-slate-900 mt-3 mb-2">
                  Our Vision
                </h3>
                <p className="text-slate-600 text-sm">
                  A world where healthcare staffing is never a barrier to care.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <Feature
              icon="/shield.svg"
              title="Verified Excellence"
              text="Every nurse is thoroughly verified with background checks,
              license validation, and experience confirmation."
            />

            <Feature
              icon="/bolt.svg"
              title="Instant Matching"
              text="Our intelligent system matches nurses to requests in seconds,
              considering expertise and availability."
            />

            <Feature
              icon="/heart.svg"
              title="Human-Centered"
              text="We prioritize nurse well-being and quality patient care in every
              decision we make."
            />
          </div>

        </div>
      </div>
    </section>
  );
}

/* Small reusable block */
function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
      <Image src={icon} alt={title} width={24} height={24} />
      <h3 className="font-semibold text-slate-900 mt-4 mb-2">
        {title}
      </h3>
      <p className="text-slate-600 text-sm">{text}</p>
    </div>
  );
}
