"use client";

import Link from "next/link";
import { type Locale, siteConfig } from "@/config/site";
import { translate } from "@/i18n/utils";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useState } from "react";

interface HeaderProps {
  locale: Locale;
  messages: Record<string, any>;
}

export default function Header({ locale, messages }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <Link href={`/${locale}`} className="flex items-center space-x-3 group">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary group-hover:text-primary-dark transition-colors">
                {siteConfig.brandName}
              </span>
              <span className="text-xs text-accent tracking-wide uppercase">
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
                className="text-neutral-700 hover:text-primary font-medium transition-colors"
              >
                {translate(messages, `nav.${item.key}`)}
              </Link>
            ))}
          </nav>
          
          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher currentLocale={locale} />
            
            <button
              className="lg:hidden p-2 text-neutral-700 hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-neutral-200">
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
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
