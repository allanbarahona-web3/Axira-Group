import Image from "next/image";
import Link from "next/link";
import { type Locale } from "@/config/site";
import { translate } from "@/i18n/utils";

interface HomeHeroProps {
  locale: Locale;
  messages: Record<string, any>;
}

export default function HomeHero({ locale, messages }: HomeHeroProps) {
  const schedulerUrl = process.env.NEXT_PUBLIC_SCHEDULER_URL;
  const isValidSchedulerUrl =
    typeof schedulerUrl === "string" &&
    /^https?:\/\//i.test(schedulerUrl.trim());

  return (
    <section id="home-hero" className="relative min-h-[100svh] overflow-hidden">
      <Image
        src="/hero/hero-dubai-skyline.webp"
        alt="Dubai skyline at night"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/92 via-[#0b1220]/65 to-[#0b1220]/38" />
      <div className="absolute inset-0 bg-[#0b1220]/30" />
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#112b52]/78 via-[#1a3e6a]/42 to-transparent" />

      <div className="relative min-h-[100svh] flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-white font-semibold leading-[1.05] text-[2.4rem] sm:text-[3.21rem] lg:text-[4.01rem]">
              {translate(messages, "hero.headline")}
            </h1>

            <p className="mt-6 text-white/80 text-lg sm:text-xl">
              {translate(messages, "hero.subheadline")}
            </p>

            <div className="mt-8 inline-flex items-center rounded-xl border border-white/28 bg-white/12 backdrop-blur-sm px-4 py-2 text-white/85 text-sm sm:text-base">
              {translate(messages, "hero.badge")}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {isValidSchedulerUrl ? (
                <a
                  href={schedulerUrl}
                  className="inline-flex items-center justify-center rounded-xl px-7 py-4 text-lg font-semibold bg-[#b8860b] hover:bg-[#a17809] text-white transition-colors"
                >
                  {translate(messages, "hero.cta")}
                </a>
              ) : (
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center rounded-xl px-7 py-4 text-lg font-semibold bg-[#b8860b] hover:bg-[#a17809] text-white transition-colors"
                >
                  {translate(messages, "hero.cta")}
                </Link>
              )}
              <Link
                href={`/${locale}/real-estate`}
                className="inline-flex items-center justify-center rounded-xl px-7 py-4 text-lg font-semibold border border-white/30 bg-transparent text-white hover:bg-white/10 transition-colors"
              >
                {translate(messages, "hero.ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
