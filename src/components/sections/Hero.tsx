import { type Locale, siteConfig } from "@/config/site";
import { translate } from "@/i18n/utils";

interface HeroProps {
  locale: Locale;
  messages: Record<string, any>;
}

export default function Hero({ locale, messages }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-dark to-neutral-900 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMjB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10" />
      
      <div className="relative container-custom section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white mb-6 animate-fade-in">
            {translate(messages, "hero.headline")}
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-200 mb-12 leading-relaxed">
            {translate(messages, "hero.subheadline")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`/${locale}/services`} className="btn-accent text-lg px-8 py-4">
              {translate(messages, "hero.cta")}
            </a>
            <a href={`/${locale}/contact`} className="btn-outline text-white border-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              {translate(messages, "hero.ctaSecondary")}
            </a>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
            <div>
              <div className="text-4xl font-bold text-accent-light mb-2">15+</div>
              <div className="text-sm text-neutral-300 uppercase tracking-wide">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-light mb-2">500+</div>
              <div className="text-sm text-neutral-300 uppercase tracking-wide">Clients Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-light mb-2">30+</div>
              <div className="text-sm text-neutral-300 uppercase tracking-wide">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
