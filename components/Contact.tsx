"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_munh7wj";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      if (!templateId || !publicKey) {
        throw new Error("EmailJS environment variables missing!");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: unknown) {
      const msg =
        error instanceof Error
          ? error.message
          : typeof error === "object" && error !== null && "text" in error
          ? String((error as { text: string }).text)
          : "Unknown error";
      console.error("Failed to send message:", msg, error);
      setStatus("error");
      setErrorMessage(`Failed to send message: ${msg}`);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#090d16]/70 border-t border-slate-800/60">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="space-y-3 text-center sm:text-left"
        >
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
            04. Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Let&apos;s Connect
          </h2>
          <p className="text-slate-400 max-w-2xl text-base">
            I am actively looking for software engineering internship opportunities. Feel free to reach out via the form below or through direct social links.
          </p>
          <div className="w-12 h-1 bg-emerald-500 rounded-full mx-auto sm:mx-0" />
        </motion.div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Direct Info Sidebar */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0e1526] border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-white">Contact Info</h3>
              
              <div className="space-y-4 text-sm text-slate-300">
                <a
                  href="mailto:saadkashif770@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-emerald-400 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-slate-400">Direct Email</p>
                    <p className="text-xs sm:text-sm font-semibold truncate">saadkashif770@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://github.com/code-with-saad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-emerald-400 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">GitHub Profile</p>
                    <p className="text-xs sm:text-sm font-semibold">github.com/code-with-saad</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/codewithsaad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-emerald-400 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">LinkedIn Profile</p>
                    <p className="text-xs sm:text-sm font-semibold">linkedin.com/in/codewithsaad</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-[#0e1526] border border-slate-800 space-y-5"
            >
              <h3 className="text-lg font-bold text-white">Send a Message</h3>

              {/* Name Field */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-semibold text-slate-300">
                  Your Name <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-semibold text-slate-300">
                  Your Email <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-semibold text-slate-300">
                  Message <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Saad, I'd like to discuss an internship opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                />
              </div>

              {/* Status Alert Messages */}
              {status === "success" && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-rose-400 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600/50 text-slate-950 font-bold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-lg shadow-emerald-500/20"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
