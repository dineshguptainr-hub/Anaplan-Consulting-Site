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

const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Shared field chrome: the ring animates in on focus. */
const FIELD =
  "w-full rounded-lg border bg-paper px-4 py-3 text-sm text-ink-900 outline-none transition-all duration-200 placeholder:text-ink-400/70 focus:border-trust-600 focus:bg-surface focus:ring-4 focus:ring-trust-600/15";

/** Mono micro-label, matching the label language used across the site. */
function Label({
  htmlFor,
  children,
  filled,
}: {
  htmlFor: string;
  children: React.ReactNode;
  filled: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${
        filled ? "text-trust-700" : "text-ink-500"
      }`}
    >
      {/* Fills in as the field is completed — the form visibly accumulates. */}
      <span
        aria-hidden
        className={`h-2 w-[7px] shrink-0 transition-colors duration-300 ${
          filled ? "bg-trust-600" : "bg-ink-200"
        }`}
        style={{ clipPath: HEX_CLIP }}
      />
      {children}
    </label>
  );
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
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <span
          className="flex h-16 w-16 items-center justify-center bg-success-600 text-white"
          style={{ clipPath: HEX_CLIP }}
        >
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
        <h3 className="font-display text-xl font-bold text-ink-900">
          Request received.
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-ink-500">
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

  const errorClass = (key: keyof FormState) =>
    errors[key] ? "border-alert-600" : "border-ink-900/10";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" filled={form.name.trim().length > 0}>
            Full Name
          </Label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Jane Whitfield"
            className={`${FIELD} ${errorClass("name")}`}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-alert-600">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" filled={isValidEmail(form.email)}>
            Corporate Email
          </Label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="jane@company.com"
            className={`${FIELD} ${errorClass("email")}`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-alert-600">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="tool" filled={form.tool.length > 0}>
          Current Planning Tool
        </Label>
        <select
          id="tool"
          value={form.tool}
          onChange={(e) => update("tool", e.target.value)}
          className={`${FIELD} ${errorClass("tool")} cursor-pointer appearance-none`}
        >
          {TOOL_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface">
              {opt.label}
            </option>
          ))}
        </select>
        {errors.tool && (
          <p className="mt-1.5 text-xs text-alert-600">{errors.tool}</p>
        )}
      </div>

      <div>
        <Label htmlFor="painPoint" filled={form.painPoint.trim().length > 0}>
          Primary Planning Pain Point
        </Label>
        <textarea
          id="painPoint"
          rows={4}
          value={form.painPoint}
          onChange={(e) => update("painPoint", e.target.value)}
          placeholder="e.g. Our workforce plan breaks every time HR changes headcount assumptions…"
          className={`${FIELD} ${errorClass("painPoint")} resize-none`}
        />
        {errors.painPoint && (
          <p className="mt-1.5 text-xs text-alert-600">{errors.painPoint}</p>
        )}
      </div>

      {submitError && (
        <p className="text-center text-sm text-alert-600">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary group w-full transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {status === "submitting" ? "Submitting…" : "Book a Strategy Call"}
        {status !== "submitting" && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          >
            <path
              d="M3.5 8h9m0 0L8.5 4m4 4L8.5 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <p className="text-center text-xs text-ink-400">
        No spam, no sales sequence. A direct reply from EPM Journey, within one
        business day.
      </p>
    </form>
  );
}
