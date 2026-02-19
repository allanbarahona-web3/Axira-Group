"use client";

import Link from "next/link";
import { type Locale, siteConfig } from "@/config/site";
import { translate } from "@/i18n/utils";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useEffect, useState } from "react";
import { digitalCard } from "@/config/digitalCard";
import { usePathname } from "next/navigation";

interface HeaderProps {
  locale: Locale;
  messages: Record<string, any>;
}

function getSafeHttpUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:") {
      return parsedUrl.toString();
    }
  } catch {
    return null;
  }
  return null;
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="w-5 h-5"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.24V2h-3.1v12.4a2.31 2.31 0 1 1-1.6-2.2V9.07a5.41 5.41 0 1 0 4.69 5.35V8.15a7.9 7.9 0 0 0 4.77 1.61V6.69z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="w-5 h-5"
    >
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7.3A4.7 4.7 0 1 1 7.3 12 4.7 4.7 0 0 1 12 7.3zm0 1.8A2.9 2.9 0 1 0 14.9 12 2.9 2.9 0 0 0 12 9.1z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="w-5 h-5"
    >
      <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.7-1.6h1.8V4.1A24.9 24.9 0 0 0 14.4 4c-2.6 0-4.4 1.6-4.4 4.6v2H7v3.2h3v8.2h3.5z" />
    </svg>
  );
}

export default function Header({ locale, messages }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [onHero, setOnHero] = useState(false);
  const pathname = usePathname();

  const normalizedPathname = (pathname || "").replace(/\/+$/, "") || "/";
  const isHomeRoute =
    normalizedPathname === "/" || normalizedPathname === `/${locale}`;
  const isHeroTheme = isHomeRoute && onHero && !mobileMenuOpen;

  useEffect(() => {
    if (!isHomeRoute) {
      setOnHero(false);
      return;
    }

    const updateHeaderZone = () => {
      const heroElement = document.getElementById("home-hero");

      if (!heroElement) {
        setOnHero(false);
        return;
      }

      const scrollY = window.scrollY;
      const isAtTop = scrollY <= 8;
      const heroRect = heroElement.getBoundingClientRect();
      const heroTop = scrollY + heroRect.top;
      const heroBottom = heroTop + heroRect.height;
      const headerLine = scrollY + 80;
      const isInsideHero = headerLine >= heroTop && headerLine < heroBottom;

      setOnHero(!isAtTop && isInsideHero);
    };

    updateHeaderZone();
    window.addEventListener("scroll", updateHeaderZone, { passive: true });
    window.addEventListener("resize", updateHeaderZone);

    return () => {
      window.removeEventListener("scroll", updateHeaderZone);
      window.removeEventListener("resize", updateHeaderZone);
    };
  }, [isHomeRoute]);

  const socials = {
    tiktok: getSafeHttpUrl(digitalCard.socials.tiktok),
    instagram: getSafeHttpUrl(digitalCard.socials.instagram),
    facebook: getSafeHttpUrl(digitalCard.socials.facebook),
  };

  const linkTextClass = isHeroTheme
    ? "text-white hover:text-white"
    : "text-neutral-700 hover:text-primary";

  const brandTitleClass = isHeroTheme
    ? "text-white group-hover:text-white/90"
    : "text-primary group-hover:text-primary-dark";

  const socialActiveClass = isHeroTheme
    ? "text-white hover:text-white"
    : "text-neutral-700 hover:text-primary-dark";

  const socialInactiveClass = isHeroTheme
    ? "text-white/75 bg-white/15"
    : "text-neutral-600 bg-neutral-100";

  const menuButtonClass = isHeroTheme
    ? "text-white hover:text-white"
    : "text-neutral-700 hover:text-primary";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isHeroTheme
          ? "bg-gradient-to-r from-[#0a1b38]/96 via-[#10284f]/92 to-[#0d2346]/94 border-b border-white/15 backdrop-blur-md"
          : "bg-white/76 border-b border-neutral-200/80 backdrop-blur-[2px]"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <Link
            href={`/${locale}`}
            className="flex items-center space-x-3 group"
          >
            <div className="flex flex-col">
              <span
                className={`text-2xl font-bold transition-colors ${brandTitleClass}`}
              >
                {siteConfig.brandName}
              </span>
              <span
                className={`text-xs tracking-wide uppercase ${
                  isHeroTheme ? "text-accent-light" : "text-accent"
                }`}
              >
                {siteConfig.brandTagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`font-medium transition-colors ${linkTextClass}`}
              >
                {translate(messages, `nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center gap-2">
              {socials.tiktok ? (
                <a
                  href={socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-full transition-colors ${socialActiveClass}`}
                  aria-label="TikTok"
                >
                  <TikTokIcon />
                </a>
              ) : (
                <span
                  className={`p-2.5 rounded-full ${socialInactiveClass}`}
                  aria-label="TikTok unavailable"
                >
                  <TikTokIcon />
                </span>
              )}
              {socials.instagram ? (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-full transition-colors ${socialActiveClass}`}
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              ) : (
                <span
                  className={`p-2.5 rounded-full ${socialInactiveClass}`}
                  aria-label="Instagram unavailable"
                >
                  <InstagramIcon />
                </span>
              )}
              {socials.facebook ? (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-full transition-colors ${socialActiveClass}`}
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              ) : (
                <span
                  className={`p-2.5 rounded-full ${socialInactiveClass}`}
                  aria-label="Facebook unavailable"
                >
                  <FacebookIcon />
                </span>
              )}
            </div>
            <LanguageSwitcher
              currentLocale={locale}
              variant={isHeroTheme ? "hero" : "default"}
            />

            <button
              className={`lg:hidden p-2 transition-colors ${menuButtonClass}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-neutral-200 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-4">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className="text-neutral-700 hover:text-primary font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {translate(messages, `nav.${item.key}`)}
                </Link>
              ))}
              <div className="pt-2 flex items-center gap-2">
                {socials.tiktok ? (
                  <a
                    href={socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full text-neutral-700 hover:text-primary-dark transition-colors"
                    aria-label="TikTok"
                  >
                    <TikTokIcon />
                  </a>
                ) : (
                  <span
                    className="p-2.5 rounded-full text-neutral-600 bg-neutral-100"
                    aria-label="TikTok unavailable"
                  >
                    <TikTokIcon />
                  </span>
                )}
                {socials.instagram ? (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full text-neutral-700 hover:text-primary-dark transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                ) : (
                  <span
                    className="p-2.5 rounded-full text-neutral-600 bg-neutral-100"
                    aria-label="Instagram unavailable"
                  >
                    <InstagramIcon />
                  </span>
                )}
                {socials.facebook ? (
                  <a
                    href={socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full text-neutral-700 hover:text-primary-dark transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </a>
                ) : (
                  <span
                    className="p-2.5 rounded-full text-neutral-600 bg-neutral-100"
                    aria-label="Facebook unavailable"
                  >
                    <FacebookIcon />
                  </span>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
