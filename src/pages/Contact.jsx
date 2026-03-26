import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Wire to your backend / EmailJS / Formspree here
    setSent(true);
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | FxBrokers.co.ke</title>
        <meta name="description" content="Get in touch with the FxBrokers.co.ke team. We welcome broker suggestions, partnership enquiries, and reader feedback." />
        <link rel="canonical" href="https://fxbrokers.co.ke/contact" />
      </Helmet>

      <div className="min-h-screen bg-[#07101E] pt-24 pb-16 px-4">
        <div className="max-w-xl mx-auto">
          <nav className="text-xs text-gray-600 mb-6 flex items-center gap-2">
            <Link to="/" className="hover:text-[#C9A84C]">Home</Link>
            <span>/</span>
            <span className="text-gray-400">Contact</span>
          </nav>

          <h1 className="text-4xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-gray-400 text-sm mb-8">Have a question, broker suggestion, or partnership enquiry? We would love to hear from you.</p>

          {!sent ? (
            <form onSubmit={handleSubmit} className="bg-[#0D1B2E] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs mb-1.5 block" htmlFor="name">Name</label>
                  <input
                    id="name" type="text" required
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#C9A84C]/50 text-white text-sm rounded-lg px-3 py-2.5 outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1.5 block" htmlFor="email">Email</label>
                  <input
                    id="email" type="email" required
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#C9A84C]/50 text-white text-sm rounded-lg px-3 py-2.5 outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block" htmlFor="subject">Subject</label>
                <select
                  id="subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required
                  className="w-full bg-[#0D1B2E] border border-white/10 focus:border-[#C9A84C]/50 text-gray-300 text-sm rounded-lg px-3 py-2.5 outline-none transition-colors"
                >
                  <option value="" disabled>Select a subject…</option>
                  <option value="broker-suggestion">Suggest a broker</option>
                  <option value="partnership">Partnership / IB enquiry</option>
                  <option value="correction">Report a factual error</option>
                  <option value="general">General question</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block" htmlFor="message">Message</label>
                <textarea
                  id="message" rows={5} required
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#C9A84C]/50 text-white text-sm rounded-lg px-3 py-2.5 outline-none transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button type="submit" className="bg-[#C9A84C] hover:bg-[#b8953e] text-[#07101E] font-bold text-sm py-3 rounded-xl transition-colors">
                Send Message
              </button>
            </form>
          ) : (
            <div className="bg-[#0D1B2E] border border-[#C9A84C]/20 rounded-2xl p-10 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-white font-bold text-xl mb-2">Message Sent!</h2>
              <p className="text-gray-400 text-sm mb-6">Thanks for reaching out. We will get back to you within 24 hours.</p>
              <Link to="/" className="text-[#C9A84C] text-sm hover:underline">← Back to home</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}