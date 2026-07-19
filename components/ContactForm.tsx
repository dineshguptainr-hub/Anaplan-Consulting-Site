"use client";

import { useState, type FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  tool: string;
  painPoint: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  tool: "",
  painPoint: "",
};

const TOOL_OPTIONS = [
  { value: "", label: "Select your current tool…" },
  { value: "excel", label: "Excel / Spreadsheets" },
  { value: "legacy-erp", label: "Legacy ERP Planning Module" },
  { value: "anaplan", label: "Anaplan (needs optimization)" },
  { value: "other", label: "Other Planning Tool" },
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Corporate email is required.";
    else if (!isValidEmail(form.email)) next.email = "Enter a valid email address.";
    if (!form.tool) next.tool = "Let us know your current planning tool.";
    if (!form.painPoint.trim())
      next.painPoint = "Tell us your primary planning pain point.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setForm(INITIAL_STATE);
    } catch {
      setStatus("idle");
      setSubmitError(
        "Something went wrong sending your request. Please try again or email directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center gap-4 p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-signal-green/10 text-signal-green">
          <svg width="26" height="26" viewBox="0 0 20 20" fill="none">
            <path
              d="m4 10.5 4 4 8-9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="font-display text-xl font-semibold text-white">
          Request received.
        </h3>
        <p className="max-w-sm text-sm text-mist-300">
          Thanks — I&apos;ll personally review your details and follow up
          within one business day to schedule your Strategy Call.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-secondary mt-2 !px-5 !py-2.5 text-sm"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card space-y-5 p-8 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-mist-200">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Jane Whitfield"
            className="w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white placeholder:text-mist-400/60 outline-none transition focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20"
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-signal-red">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-mist-200">
            Corporate Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="jane@company.com"
            className="w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white placeholder:text-mist-400/60 outline-none transition focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-signal-red">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="tool" className="mb-1.5 block text-sm font-medium text-mist-200">
          Current Planning Tool
        </label>
        <select
          id="tool"
          value={form.tool}
          onChange={(e) => update("tool", e.target.value)}
          className="w-full appearance-none rounded-lg border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white outline-none transition focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20"
        >
          {TOOL_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-ink-900">
              {opt.label}
            </option>
          ))}
        </select>
        {errors.tool && (
          <p className="mt-1.5 text-xs text-signal-red">{errors.tool}</p>
        )}
      </div>

      <div>
        <label htmlFor="painPoint" className="mb-1.5 block text-sm font-medium text-mist-200">
          Primary Planning Pain Point
        </label>
        <textarea
          id="painPoint"
          rows={4}
          value={form.painPoint}
          onChange={(e) => update("painPoint", e.target.value)}
          placeholder="e.g. Our workforce plan breaks every time HR changes headcount assumptions…"
          className="w-full resize-none rounded-lg border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white placeholder:text-mist-400/60 outline-none transition focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20"
        />
        {errors.painPoint && (
          <p className="mt-1.5 text-xs text-signal-red">{errors.painPoint}</p>
        )}
      </div>

      {submitError && (
        <p className="text-center text-sm text-signal-red">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Submitting…" : "Book a Strategy Call"}
      </button>

      <p className="text-center text-xs text-mist-400">
        No spam, no sales sequence. A direct reply from Marcus, within one
        business day.
      </p>
    </form>
  );
}
