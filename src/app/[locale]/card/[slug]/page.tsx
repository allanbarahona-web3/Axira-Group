import Link from "next/link";
import QRCode from "react-qr-code";
import { notFound } from "next/navigation";
import { digitalCard } from "@/config/digitalCard";
import { getMessages, translate } from "@/i18n/utils";
import { type Locale } from "@/config/site";

export default function DigitalCardPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  if (params.slug !== digitalCard.slug) {
    notFound();
  }

  const messages = getMessages(params.locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
  const cardUrl = `${normalizedBaseUrl}/en/card/${digitalCard.slug}`;
  const whatsappNumber = digitalCard.whatsappE164.replace(/\D/g, "");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(digitalCard.message)}`;

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
          <a
            href={whatsappLink}
            className="btn-primary w-full text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            {translate(messages, "digitalCard.actions.whatsapp")}
          </a>

          <a
            href={`mailto:${digitalCard.email}`}
            className="btn-outline w-full text-base"
          >
            {translate(messages, "digitalCard.actions.email")}
          </a>

          <a
            href={digitalCard.website}
            className="btn-outline w-full text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            {translate(messages, "digitalCard.actions.website")}
          </a>

          <Link
            href={`/api/vcard/${digitalCard.slug}`}
            className="btn-accent w-full text-base"
          >
            {translate(messages, "digitalCard.actions.downloadContact")}
          </Link>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-6">
          <p className="text-sm text-center text-neutral-600 mb-4">
            {translate(messages, "digitalCard.scanToOpen")}
          </p>
          <div className="mx-auto w-fit rounded-xl border border-neutral-200 bg-white p-3">
            <QRCode value={cardUrl} size={168} />
          </div>
        </div>
      </div>
    </section>
  );
}
