import Image from "next/image";

export default function Contact() {
  return (
    <section id="contact" className="bg-gradient-to-b from-emerald-50 to-white py-20 px-6 scroll-mt-24 w-full bg-white py-24">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white shadow text-emerald-600 text-sm font-medium mb-4">
            <Image src="/phone.svg" width={16} height={16} alt="Phone" />
            Get In Touch
          </span>

          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            We're Here to Help
          </h2>

          <p className="text-slate-600 text-lg">
            Have questions or need assistance? Our friendly team is ready to
            support you.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* CONTACT INFO */}
          <div className="rounded-3xl border bg-white p-8 shadow-md">
            <h3 className="text-xl font-semibold mb-6">
              Contact Information
            </h3>

            <div className="space-y-6">
              <InfoItem
                icon="/phone.svg"
                bg="bg-emerald-50"
                title="Phone"
                main="+1 (800) 555-6877"
                sub="24/7 Support Line"
              />

              <InfoItem
                icon="/mail.svg"
                bg="bg-blue-50"
                title="Email"
                main="support@nexteracode.com"
                sub="Reply within 1 hour"
              />

              <InfoItem
                icon="/location.svg"
                bg="bg-purple-50"
                title="Address"
                main={
                  <>
                    123 Healthcare Plaza <br />
                    New York, NY 10001
                  </>
                }
              />

              <InfoItem
                icon="/clock.svg"
                bg="bg-green-50"
                title="Hours"
                main="24/7 Platform Access"
                sub="Mon–Fri, 8AM–6PM"
              />
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="rounded-3xl border bg-white p-8 shadow-md">
            <h3 className="text-xl font-semibold mb-6">
              Send a Message
            </h3>

            <form className="space-y-4">
              <input
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Your Name"
              />
              <input
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Email Address"
              />
              <textarea
                rows="4"
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Message"
              />
              <button
                type="button"
                className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ======================
   SMALL REUSABLE BLOCK
   ====================== */
function InfoItem({ icon, bg, title, main, sub }) {
  return (
    <div className="flex gap-4">
      <div
        className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center`}
      >
        <Image src={icon} width={24} height={24} alt={title} />
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-slate-600">{main}</p>
        {sub && (
          <p className="text-xs text-slate-500">{sub}</p>
        )}
      </div>
    </div>
  );
}
