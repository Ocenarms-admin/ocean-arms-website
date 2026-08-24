"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const contactDetails = [
  {
    label: "Phone",
    primary: "+971 56 744 4837",
    secondary: null,
    href: "tel:+971567444837",
  },
  {
    label: "Email",
    primary: "info@oceanarms.ae",
    secondary: null,
    href: "mailto:info@oceanarms.ae",
  },
  {
    label: "Address",
    primary: "Office No. 21MF, Nusrat Rahmanian Bldg",
    secondary: "Dubai, UAE",
    href: "https://maps.google.com/?q=Office+No.+21MF,+Nusrat+Rahmanian+Bldg,+Dubai,+UAE",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setAttachment(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("submitting");
    setErrorMsg("");

    try {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("phone", formData.phone);
      body.append("message", formData.message);
      if (attachment) body.append("attachment", attachment);

      const res = await fetch("/api/contact", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setSubmitState("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
      setSubmitState("error");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-surface/50 px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 focus:border-foreground/30 focus:bg-white placeholder:text-muted-foreground/50";

  const labelClass =
    "block text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground mb-2";

  return (
    <>
      {/* ── Split layout ── */}
      <div className="flex flex-col lg:flex-row">

        {/* Left image panel — sticky on desktop */}
        <div className="relative w-full h-[56vw] max-h-[420px] lg:max-h-none lg:h-[calc(100vh-65px)] lg:sticky lg:top-[65px] lg:w-[44%] shrink-0 overflow-hidden">
          <Image
            src="/assets/marine.jpg"
            alt="Ocean Arms marine and industrial operations"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-navy/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 xl:p-16">
            <motion.h2
              className="font-display font-bold text-navy-foreground leading-none mb-4"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Always ready<br />
              for your next<br />
              project.
            </motion.h2>
            <motion.p
              className="text-sm text-navy-foreground/55 max-w-xs leading-relaxed mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              24/7 emergency response and project enquiries across the UAE and beyond.
            </motion.p>

            {/* Contact details — icon row */}
            <motion.div
              className="border-t border-navy-foreground/15 pt-6 flex items-start gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              {/* Phone */}
              <a href="tel:+971567444837" className="group flex flex-col items-center gap-1.5 min-w-0">
                <svg className="h-4 w-4 text-navy-foreground/50 group-hover:text-sky transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                </svg>
                <p className="text-xs font-medium text-navy-foreground group-hover:text-sky transition-colors leading-snug">+971 56 744 4837</p>
              </a>

              <div className="w-px self-stretch bg-navy-foreground/10 shrink-0" />

              {/* Email */}
              <a href="mailto:info@oceanarms.ae" className="group flex flex-col items-center gap-1.5 min-w-0">
                <svg className="h-4 w-4 text-navy-foreground/50 group-hover:text-sky transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <p className="text-xs font-medium text-navy-foreground group-hover:text-sky transition-colors leading-snug break-all">info@oceanarms.ae</p>
              </a>

              <div className="w-px self-stretch bg-navy-foreground/10 shrink-0" />

              {/* Address */}
              <a href="https://maps.google.com/?q=Office+No.+21MF,+Nusrat+Rahmanian+Bldg,+Dubai,+UAE" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5 min-w-0">
                <svg className="h-4 w-4 text-navy-foreground/50 group-hover:text-sky transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p className="text-xs font-medium text-navy-foreground group-hover:text-sky transition-colors leading-snug text-center">Office No. 21MF, Nusrat Rahmanian Bldg</p>
                <p className="text-[0.65rem] text-navy-foreground/40">Dubai, UAE</p>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right scrollable panel */}
        <div className="w-full lg:w-[56%] flex flex-col bg-background lg:rounded-tl-3xl shadow-[-12px_0_40px_rgba(0,0,0,0.06)]">
          <main className="flex-1 px-6 py-12 sm:px-10 lg:px-14 xl:px-20">

            {/* Heading */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <p className="section-eyebrow text-muted-foreground mb-3">Contact us</p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-none mb-3">
                Get in touch
              </h1>
              <p className="text-sm text-muted-foreground">
                Fill out the form and we&apos;ll respond within 24 hours.
              </p>
            </motion.div>

            {/* Form */}
            <AnimatePresence mode="wait">
              {submitState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-16 text-center max-w-sm mx-auto"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16 }}
                    className="grid h-14 w-14 place-items-center bg-foreground rounded-full mx-auto mb-6"
                  >
                    <svg className="h-7 w-7 text-background" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <h2 className="font-display text-2xl font-bold text-foreground uppercase mb-3">Message sent</h2>
                  <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                    Thank you for reaching out. Our team will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitState("idle");
                      setFormData({ name: "", email: "", phone: "", message: "" });
                      setAttachment(null);
                    }}
                    className="bg-foreground px-7 py-3 text-xs font-semibold uppercase tracking-widest text-background hover:opacity-80 transition-opacity rounded-lg"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Contact no. */}
                  <div>
                    <label className={labelClass}>Contact no.</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 XX XXX XXXX"
                      className={inputClass}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelClass}>Message *</label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or enquiry"
                      rows={5}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Attachment */}
                  <div>
                    <label className={labelClass}>Attachment</label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full rounded-lg border border-dashed border-border bg-surface/30 px-4 py-4 flex items-center gap-3 cursor-pointer hover:border-foreground/30 hover:bg-surface/60 transition-all duration-200 group"
                    >
                      <svg className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                      </svg>
                      <div className="min-w-0 flex-1">
                        {attachment ? (
                          <p className="text-sm text-foreground font-medium truncate">{attachment.name}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground/60">
                            Click to attach a file
                            <span className="ml-1.5 text-[0.65rem] text-muted-foreground/40">PDF, DOC, JPG up to 10MB</span>
                          </p>
                        )}
                      </div>
                      {attachment && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setAttachment(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  {/* Error message */}
                  {submitState === "error" && (
                    <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                      {errorMsg}
                    </p>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={submitState === "submitting"}
                    whileHover={{ opacity: 0.88 }}
                    whileTap={{ scale: 0.985 }}
                    className="w-full bg-foreground py-3.5 text-xs font-semibold uppercase tracking-widest text-background disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-opacity rounded-lg mt-2"
                  >
                    {submitState === "submitting" ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="inline-block h-3.5 w-3.5 rounded-full border-2 border-background/30 border-t-background"
                        />
                        Sending...
                      </>
                    ) : (
                      "Send message"
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

          </main>
        </div>
      </div>
    </>
  );
}
