import QRCode from "react-qr-code";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { digitalCard } from "@/config/digitalCard";
import { getMessages, translate } from "@/i18n/utils";
import { type Locale } from "@/config/site";
import InvestmentCTAForm from "@/components/digital-card/InvestmentCTAForm";

function normalizeHttpsBaseUrl(url: string): string {
  const trimmedUrl = url.trim().replace(/\/+$/, "");
  if (!trimmedUrl) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl.replace(/^http:\/\//i, "https://");
  }

  return `https://${trimmedUrl}`;
}

function getSafeHttpUrl(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:") {
      return parsedUrl.toString();
    }
    return null;
  } catch {
    return null;
  }
}

export default function DigitalCardPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  if (params.slug !== digitalCard.slug) {
    notFound();
  }

  const messages = getMessages(params.locale);
  const siteUrlFromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "";
  const isProduction = process.env.NODE_ENV === "production";

  let baseUrl = "";

  if (isProduction) {
    baseUrl = normalizeHttpsBaseUrl(siteUrlFromEnv);
  } else {
    if (siteUrlFromEnv) {
      baseUrl = normalizeHttpsBaseUrl(siteUrlFromEnv);
    } else {
      const requestHeaders = headers();
      const forwardedHost = requestHeaders.get("x-forwarded-host");
      const host = forwardedHost ?? requestHeaders.get("host") ?? "";
      baseUrl = normalizeHttpsBaseUrl(host);
    }
  }

  const showQrFallback = isProduction && !baseUrl;
  const whatsappNumber = digitalCard.whatsappE164.replace(/\D/g, "");
  const hasValidWhatsapp = whatsappNumber.length > 0;
  const whatsappLink = hasValidWhatsapp
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(digitalCard.message)}`
    : null;
  const safeWebsiteUrl = getSafeHttpUrl(digitalCard.website);
  const safeSocialUrls = {
    tiktok: getSafeHttpUrl(digitalCard.socials.tiktok),
    instagram: getSafeHttpUrl(digitalCard.socials.instagram),
    facebook: getSafeHttpUrl(digitalCard.socials.facebook),
  };

  if (!showQrFallback && !baseUrl) {
    baseUrl = "https://localhost:3000";
  }

  const ctaLabels = {
    fullName: translate(messages, "digitalCard.cta.form.fullName"),
    email: translate(messages, "digitalCard.cta.form.email"),
    budget: translate(messages, "digitalCard.cta.form.budget"),
    goal: translate(messages, "digitalCard.cta.form.goal"),
    notes: translate(messages, "digitalCard.cta.form.notes"),
    submit: translate(messages, "digitalCard.cta.form.submit"),
    viewProperties: translate(messages, "digitalCard.cta.form.viewProperties"),
    requiredName: translate(
      messages,
      "digitalCard.cta.validation.requiredName",
    ),
    requiredEmail: translate(
      messages,
      "digitalCard.cta.validation.requiredEmail",
    ),
    invalidEmail: translate(
      messages,
      "digitalCard.cta.validation.invalidEmail",
    ),
    budgetPlaceholder: translate(
      messages,
      "digitalCard.cta.form.budgetPlaceholder",
    ),
    goalPlaceholder: translate(
      messages,
      "digitalCard.cta.form.goalPlaceholder",
    ),
  };
  const cardUrl = `${baseUrl}/en/card/${digitalCard.slug}`;

  return (
    <section className="bg-neutral-50 py-10 px-4 sm:px-6">
      <div className="max-w-md mx-auto bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="text-center">
          <p className="text-sm font-medium text-accent mb-2">
            {digitalCard.company}
          </p>
          <h1 className="text-3xl leading-tight">{digitalCard.fullName}</h1>
          <p className="mt-2 text-base text-neutral-700">{digitalCard.title}</p>
          {digitalCard.location ? (
            <p className="mt-1 text-sm text-neutral-500">
              {digitalCard.location}
            </p>
          ) : null}
        </div>

        <div className="mt-8 grid gap-3">
          {whatsappLink ? (
            <a
              href={whatsappLink}
              className="btn-primary w-full text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              {translate(messages, "digitalCard.actions.whatsapp")}
            </a>
          ) : null}

          <a
            href={`mailto:${digitalCard.email}`}
            className="btn-outline w-full text-base"
          >
            {translate(messages, "digitalCard.actions.email")}
          </a>

          {safeWebsiteUrl ? (
            <a
              href={safeWebsiteUrl}
              className="btn-outline w-full text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              {translate(messages, "digitalCard.actions.website")}
            </a>
          ) : null}

          <div className="border border-neutral-200 rounded-xl p-3 sm:p-4 bg-neutral-50">
            <p className="text-sm font-semibold text-primary mb-3">
              {translate(messages, "digitalCard.social.title")}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {safeSocialUrls.tiktok ? (
                <a
                  href={safeSocialUrls.tiktok}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-white text-center bg-[#000000]"
                >
                  TikTok
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-white text-center bg-[#000000] opacity-75 cursor-not-allowed"
                >
                  TikTok
                  <span className="ml-2 inline-flex rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium">
                    {translate(messages, "digitalCard.social.comingSoon")}
                  </span>
                </button>
              )}

              {safeSocialUrls.instagram ? (
                <a
                  href={safeSocialUrls.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-white text-center bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4]"
                >
                  Instagram
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-white text-center bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] opacity-75 cursor-not-allowed"
                >
                  Instagram
                  <span className="ml-2 inline-flex rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium">
                    {translate(messages, "digitalCard.social.comingSoon")}
                  </span>
                </button>
              )}

              {safeSocialUrls.facebook ? (
                <a
                  href={safeSocialUrls.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-white text-center bg-[#1877F2] col-span-2 md:col-span-1"
                >
                  Facebook
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-white text-center bg-[#1877F2] opacity-75 cursor-not-allowed col-span-2 md:col-span-1"
                >
                  Facebook
                  <span className="ml-2 inline-flex rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium">
                    {translate(messages, "digitalCard.social.comingSoon")}
                  </span>
                </button>
              )}
            </div>
          </div>

          <a
            href={`/api/vcard/${digitalCard.slug}`}
            className="btn-accent w-full text-base"
          >
            {translate(messages, "digitalCard.actions.downloadContact")}
          </a>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-6">
          <p className="text-sm text-center text-neutral-600 mb-4">
            {translate(messages, "digitalCard.scanToOpen")}
          </p>
          {showQrFallback ? (
            <p className="text-sm text-center text-neutral-500">
              QR unavailable: missing NEXT_PUBLIC_SITE_URL in production.
            </p>
          ) : (
            <div className="mx-auto w-fit rounded-xl border border-neutral-200 bg-white p-3">
              <QRCode value={cardUrl} size={168} />
            </div>
          )}
        </div>

        {digitalCard.cta.enabled ? (
          <InvestmentCTAForm
            whatsappE164={digitalCard.whatsappE164}
            defaultMessage={digitalCard.cta.defaultMessage}
            headline={digitalCard.cta.headline}
            subheadline={digitalCard.cta.subheadline}
            labels={ctaLabels}
          />
        ) : null}
      </div>
    </section>
  );
}
