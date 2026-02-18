import QRCode from "react-qr-code";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { digitalCard } from "@/config/digitalCard";
import { getMessages, translate } from "@/i18n/utils";
import { type Locale } from "@/config/site";

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

function getSafeWebsiteUrl(url: string): string | null {
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
  const safeWebsiteUrl = getSafeWebsiteUrl(digitalCard.website);

  if (!showQrFallback && !baseUrl) {
    baseUrl = "https://localhost:3000";
  }
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
      </div>
    </section>
  );
}
