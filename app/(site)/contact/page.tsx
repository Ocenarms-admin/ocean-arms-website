"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  service: string;
  message: string;
};

const industryOptions = [
  "Oil & Gas",
  "Marine & Shipping",
  "Power & Energy",
  "Civil & Construction",
  "Other",
];

const serviceOptions = [
  "Rope Access Services",
  "Industrial Painting & Protective Coating",
  "Mechanical Maintenance",
  "Shutdown & Turnaround Support",
  "Ship Repair & Vessel Maintenance",
  "Hull Maintenance",
  "Tank Cleaning",
  "NDT Inspection Support",
  "Facade & High-Rise Maintenance",
  "Manpower Supply",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputClass =
    "w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground";

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy pt-[65px]">
        <div className="absolute inset-0 hero-grid" />
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32 text-center">
          <motion.p
            className="section-eyebrow text-sky"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get in Touch
          </motion.p>
          <motion.h1
            className="mt-5 font-display text-4xl font-bold uppercase leading-[1.05] text-navy-foreground sm:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Contact Our Team
          </motion.h1>
          <motion.p
            className="mt-5 max-w-lg mx-auto text-base text-navy-foreground/75"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
          >
            Tell us about your project — our experts will respond within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-sky-soft py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10">
            {/* Info sidebar */}
            <div className="space-y-6">
              <FadeUp>
                <h2 className="font-display text-2xl font-bold uppercase text-navy">
                  Let&apos;s Talk
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Available 24/7 for emergency support and project inquiries. Reach us through
                  any of the channels below.
                </p>
              </FadeUp>

              {[
                {
                  label: "Office",
                  lines: ["Office No. 21MF, Nusrat Rahmanian Building", "Dubai, United Arab Emirates"],
                },
                {
                  label: "Phone",
                  lines: ["+971 56 744 4837", "24/7 Emergency Response"],
                },
                {
                  label: "Email",
                  lines: ["info@oceanarms.ae"],
                },
              ].map((item, i) => (
                <FadeUp key={item.label} delay={0.1 + i * 0.08}>
                  <div className="bg-card p-6 shadow-panel">
                    <p className="section-eyebrow text-primary mb-3">{item.label}</p>
                    {item.lines.map((line, j) => (
                      <p key={j} className={`text-sm ${j === 0 ? "text-foreground font-medium" : "text-muted-foreground mt-0.5"}`}>
                        {line}
                      </p>
                    ))}
                  </div>
                </FadeUp>
              ))}

              <FadeUp delay={0.35}>
                <div className="bg-navy p-6 text-navy-foreground shadow-panel">
                  <p className="section-eyebrow text-sky mb-4">Coverage</p>
                  <div className="flex flex-wrap gap-2">
                    {["Dubai, UAE (HQ)", "Mumbai, India", "Cochin, India"].map((city) => (
                      <span
                        key={city}
                        className="border border-navy-foreground/20 px-3 py-1.5 text-xs text-navy-foreground/75"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Form */}
            <FadeUp delay={0.1}>
              <div className="bg-card p-8 shadow-panel sm:p-10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                        className="grid h-16 w-16 place-items-center bg-primary mb-6"
                      >
                        <svg className="h-8 w-8 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                      <h3 className="font-display text-2xl font-bold uppercase text-navy mb-3">
                        Message Sent!
                      </h3>
                      <p className="text-sm text-muted-foreground mb-8 max-w-xs">
                        Thank you for reaching out. Our team will get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: "", company: "", email: "", phone: "", industry: "", service: "", message: "" });
                        }}
                        className="bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:opacity-90 transition-opacity"
                      >
                        Send Another Message
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
                      <div>
                        <h3 className="font-display text-xl font-bold uppercase text-navy">
                          Send Us a Message
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Fill in the details below and we&apos;ll be in touch shortly.
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="section-eyebrow text-muted-foreground mb-2 block">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Smith"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="section-eyebrow text-muted-foreground mb-2 block">
                            Company Name
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your Company LLC"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="section-eyebrow text-muted-foreground mb-2 block">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="section-eyebrow text-muted-foreground mb-2 block">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+971 XX XXX XXXX"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="section-eyebrow text-muted-foreground mb-2 block">
                            Industry
                          </label>
                          <select
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className={inputClass}
                          >
                            <option value="">Select Industry</option>
                            {industryOptions.map((ind) => (
                              <option key={ind} value={ind}>{ind}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="section-eyebrow text-muted-foreground mb-2 block">
                            Service Required
                          </label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className={inputClass}
                          >
                            <option value="">Select Service</option>
                            {serviceOptions.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="section-eyebrow text-muted-foreground mb-2 block">
                          Project Details <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please describe your project requirements, location, timeline, and any specific technical details..."
                          rows={5}
                          className={`${inputClass} resize-none`}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ opacity: 0.9 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full bg-primary py-4 text-sm font-semibold uppercase tracking-wide text-primary-foreground disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-opacity"
                      >
                        {submitting ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          "Send Enquiry →"
                        )}
                      </motion.button>

                      <p className="text-center text-xs text-muted-foreground">
                        We&apos;ll respond within 24 hours.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
