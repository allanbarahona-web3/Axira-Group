import Link from "next/link";
import { type Locale, siteConfig } from "@/config/site";
import { translate } from "@/i18n/utils";
import { digitalCard } from "@/config/digitalCard";

interface FooterProps {
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
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.24V2h-3.1v12.4a2.31 2.31 0 1 1-1.6-2.2V9.07a5.41 5.41 0 1 0 4.69 5.35V8.15a7.9 7.9 0 0 0 4.77 1.61V6.69z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7.3A4.7 4.7 0 1 1 7.3 12 4.7 4.7 0 0 1 12 7.3zm0 1.8A2.9 2.9 0 1 0 14.9 12 2.9 2.9 0 0 0 12 9.1z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
      <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.7-1.6h1.8V4.1A24.9 24.9 0 0 0 14.4 4c-2.6 0-4.4 1.6-4.4 4.6v2H7v3.2h3v8.2h3.5z" />
    </svg>
  );
}

export default function Footer({ locale, messages }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const socials = {
    tiktok: getSafeHttpUrl(digitalCard.socials.tiktok),
    instagram: getSafeHttpUrl(digitalCard.socials.instagram),
    facebook: getSafeHttpUrl(digitalCard.socials.facebook),
  };
  
  return (
    <footer className="bg-primary-dark text-white">
      <div className="container-custom">
        <div className="py-12 md:py-16">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href={`/${locale}`} className="inline-block mb-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">
                    {siteConfig.brandName}
                  </span>
                  <span className="text-xs text-accent-light tracking-wide uppercase">
                    {siteConfig.brandTagline}
                  </span>
                </div>
              </Link>
              <p className="text-neutral-300 text-sm mt-4">
                Premier advisory and property services for international business.
              </p>
              <div className="flex items-center gap-2 mt-5">
                {socials.tiktok ? (
                  <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full text-neutral-100 hover:text-accent-light transition-colors" aria-label="TikTok">
                    <TikTokIcon />
                  </a>
                ) : (
                  <span className="p-2.5 rounded-full text-neutral-300 bg-white/10" aria-label="TikTok unavailable">
                    <TikTokIcon />
                  </span>
                )}
                {socials.instagram ? (
                  <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full text-neutral-100 hover:text-accent-light transition-colors" aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                ) : (
                  <span className="p-2.5 rounded-full text-neutral-300 bg-white/10" aria-label="Instagram unavailable">
                    <InstagramIcon />
                  </span>
                )}
                {socials.facebook ? (
                  <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full text-neutral-100 hover:text-accent-light transition-colors" aria-label="Facebook">
                    <FacebookIcon />
                  </a>
                ) : (
                  <span className="p-2.5 rounded-full text-neutral-300 bg-white/10" aria-label="Facebook unavailable">
                    <FacebookIcon />
                  </span>
                )}
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {translate(messages, "nav.services")}
              </h3>
              <ul className="space-y-3">
                {siteConfig.services.map((service) => (
                  <li key={service.key}>
                    <Link
                      href={`/${locale}${service.href}`}
                      className="text-neutral-300 hover:text-accent-light transition-colors text-sm"
                    >
                      {translate(messages, `services.${service.key}.title`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Navigation */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={`/${locale}/real-estate`}
                    className="text-neutral-300 hover:text-accent-light transition-colors text-sm"
                  >
                    {translate(messages, "nav.realEstate")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/about`}
                    className="text-neutral-300 hover:text-accent-light transition-colors text-sm"
                  >
                    {translate(messages, "nav.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/contact`}
                    className="text-neutral-300 hover:text-accent-light transition-colors text-sm"
                  >
                    {translate(messages, "nav.contact")}
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {translate(messages, "contact.title")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={siteConfig.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-accent-light transition-colors text-sm flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {siteConfig.whatsappNumber}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.primaryEmail}`}
                    className="text-neutral-300 hover:text-accent-light transition-colors text-sm"
                  >
                    {siteConfig.primaryEmail}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
            <p>© {currentYear} {siteConfig.brandName}. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href={`/${locale}/privacy`} className="hover:text-accent-light transition-colors">
                Privacy Policy
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-accent-light transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
