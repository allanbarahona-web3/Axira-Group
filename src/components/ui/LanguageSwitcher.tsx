"use client";

import { usePathname } from "next/navigation";
import { type Locale, siteConfig } from "@/config/site";
import { useState } from "react";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  variant?: "default" | "hero";
}

const localeNames: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  de: "DE",
  pt: "PT",
};

export default function LanguageSwitcher({
  currentLocale,
  variant = "default",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const triggerClassName =
    variant === "hero"
      ? "flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white hover:text-white border border-white/35 rounded-lg hover:border-white/60 bg-white/10 hover:bg-white/15 transition-colors"
      : "flex items-center space-x-1 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary border border-neutral-300 rounded-lg hover:border-primary transition-colors";
  
  const switchLocale = (newLocale: Locale) => {
    // Remove current locale from pathname and add new locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "");
    const newPath = `/${newLocale}${pathWithoutLocale || ""}`;
    window.location.href = newPath;
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={triggerClassName}
        aria-label="Select language"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span>{localeNames[currentLocale]}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-32 bg-white border border-neutral-200 rounded-lg shadow-lg z-20">
            {siteConfig.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => {
                  switchLocale(locale);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                  locale === currentLocale
                    ? "text-primary font-semibold bg-neutral-50"
                    : "text-neutral-700"
                }`}
              >
                {localeNames[locale]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
