import Image from "next/image";

export default function AboutUs() {
  return (
    <section id="about" className="bg-white py-24 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-4">
            <Image src="/heart.svg" alt="About Us" width={16} height={16} />
            About Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Healthcare Staffing Made Simple
          </h2>

          <p className="text-slate-600 text-lg">
            We are building a system where hospitals and nurses connect faster,
            with clarity, reliability, and care.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">Our Story</h3>

            <p className="text-slate-600 mb-4 leading-relaxed">
              Founded in 2024, NextEra Code started from one clear problem:
              hospitals struggle with urgent staffing needs while skilled nurses
              struggle to find stable opportunities.
            </p>

            <p className="text-slate-600 mb-8 leading-relaxed">
              Today, we bring both sides together through a streamlined digital
              platform that supports better staffing decisions and better patient care.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-emerald-50 p-6 border border-emerald-100">
                <Image src="/target.svg" alt="Mission" width={32} height={32} />
                <h4 className="font-semibold text-slate-900 mt-3 mb-2">Our Mission</h4>
                <p className="text-slate-600 text-sm">
                  Ensure every hospital has the nursing support it needs, exactly when needed.
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 p-6 border border-blue-100">
                <Image src="/sparkles.svg" alt="Vision" width={32} height={32} />
                <h4 className="font-semibold text-slate-900 mt-3 mb-2">Our Vision</h4>
                <p className="text-slate-600 text-sm">
                  A healthcare ecosystem where staffing never blocks quality care.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <Feature
              icon="/shield.svg"
              title="Verified Excellence"
              text="Every nurse profile is validated with license checks, background review, and experience verification."
            />
            <Feature
              icon="/bolt.svg"
              title="Instant Matching"
              text="Requests are matched with suitable nurses quickly using department and availability-based logic."
            />
            <Feature
              icon="/heart.svg"
              title="Human-Centered"
              text="We design every workflow to protect nurse well-being while improving patient outcomes."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <Image src={icon} alt={title} width={24} height={24} />
      <h3 className="font-semibold text-slate-900 mt-4 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
