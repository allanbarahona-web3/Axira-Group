"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type InvestmentCTAFormProps = {
  whatsappE164: string;
  defaultMessage: string;
  headline: string;
  subheadline: string;
  labels: {
    fullName: string;
    email: string;
    budget: string;
    goal: string;
    notes: string;
    submit: string;
    viewProperties: string;
    requiredName: string;
    requiredEmail: string;
    invalidEmail: string;
    budgetPlaceholder: string;
    goalPlaceholder: string;
  };
};

type FormDataState = {
  fullName: string;
  email: string;
  budget: string;
  goal: string;
  notes: string;
};

type FormErrors = {
  fullName?: string;
  email?: string;
};

function normalizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

function buildWhatsAppMessage(
  defaultMessage: string,
  formData: FormDataState,
): string {
  const budget = formData.budget || "-";
  const goal = formData.goal || "-";
  const notes = formData.notes.trim() || "-";

  return [
    defaultMessage,
    "",
    `Name: ${formData.fullName.trim()}`,
    `Email: ${formData.email.trim()}`,
    `Budget: ${budget}`,
    `Goal: ${goal}`,
    `Notes: ${notes}`,
    "Source: Digital Card QR",
  ].join("\n");
}

export default function InvestmentCTAForm({
  whatsappE164,
  defaultMessage,
  headline,
  subheadline,
  labels,
}: InvestmentCTAFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataState>({
    fullName: "",
    email: "",
    budget: "",
    goal: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappNumber = useMemo(
    () => normalizePhoneNumber(whatsappE164),
    [whatsappE164],
  );

  const budgetOptions = [
    "Under 500k AED",
    "500k–1M AED",
    "1M–2M AED",
    "2M+ AED",
  ];

  const goalOptions = ["Investment", "Residence", "Off-plan", "Ready property"];

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = labels.requiredName;
    }

    if (!formData.email.trim()) {
      nextErrors.email = labels.requiredEmail;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      nextErrors.email = labels.invalidEmail;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const message = buildWhatsAppMessage(defaultMessage, formData);
    const encodedMessage = encodeURIComponent(message);

    if (whatsappNumber) {
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
        "_blank",
        "noopener,noreferrer",
      );
    }

    setTimeout(() => {
      router.push("/en/real-estate");
      setIsSubmitting(false);
    }, 550);
  };

  return (
    <section className="mt-8 border-t border-neutral-200 pt-6">
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:p-5">
        <h2 className="text-xl sm:text-2xl mb-2">{headline}</h2>
        <p className="text-sm sm:text-base mb-5">{subheadline}</p>

        <form className="grid gap-3" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              {labels.fullName}
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  fullName: event.target.value,
                }))
              }
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            {errors.fullName ? (
              <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              {labels.email}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, email: event.target.value }))
              }
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            {errors.email ? (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              {labels.budget}
            </label>
            <select
              value={formData.budget}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, budget: event.target.value }))
              }
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">{labels.budgetPlaceholder}</option>
              {budgetOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              {labels.goal}
            </label>
            <select
              value={formData.goal}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, goal: event.target.value }))
              }
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">{labels.goalPlaceholder}</option>
              {goalOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              {labels.notes}
            </label>
            <textarea
              value={formData.notes}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, notes: event.target.value }))
              }
              rows={4}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full mt-1"
            disabled={isSubmitting}
          >
            {labels.submit}
          </button>
        </form>

        <a
          href="/en/real-estate"
          className="btn-outline w-full mt-3 text-sm sm:text-base"
        >
          {labels.viewProperties}
        </a>
      </div>
    </section>
  );
}
