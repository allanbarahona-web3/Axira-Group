import { type Locale } from "@/config/site";
import { getMessages, translate } from "@/i18n/utils";
import HomeHero from "@/components/sections/HomeHero";

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const messages = getMessages(params.locale);
  
  return (
    <div>
      <HomeHero locale={params.locale} messages={messages} />

      <section className="bg-neutral-50 border-b border-neutral-200">
        <div className="container-custom py-12 md:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="rounded-xl bg-white p-6 border border-neutral-200">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">15+</div>
              <div className="text-sm text-neutral-600 uppercase tracking-wide">{translate(messages, "hero.metrics.yearsExperience")}</div>
            </div>
            <div className="rounded-xl bg-white p-6 border border-neutral-200">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">500+</div>
              <div className="text-sm text-neutral-600 uppercase tracking-wide">{translate(messages, "hero.metrics.clientsServed")}</div>
            </div>
            <div className="rounded-xl bg-white p-6 border border-neutral-200">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">30+</div>
              <div className="text-sm text-neutral-600 uppercase tracking-wide">{translate(messages, "hero.metrics.countries")}</div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="mb-6">{translate(messages, "services.title")}</h2>
            <p className="text-lg mb-12">{translate(messages, "services.subtitle")}</p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl mb-4">{translate(messages, "services.companyFormation.title")}</h3>
                <p className="mb-6">{translate(messages, "services.companyFormation.description")}</p>
                <a href={`/${params.locale}/services/company-formation`} className="text-accent hover:text-accent-light font-medium">
                  {translate(messages, "common.learnMore")} →
                </a>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl mb-4">{translate(messages, "services.residencyBanking.title")}</h3>
                <p className="mb-6">{translate(messages, "services.residencyBanking.description")}</p>
                <a href={`/${params.locale}/services/residency-banking`} className="text-accent hover:text-accent-light font-medium">
                  {translate(messages, "common.learnMore")} →
                </a>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl mb-4">{translate(messages, "services.complianceAdvisory.title")}</h3>
                <p className="mb-6">{translate(messages, "services.complianceAdvisory.description")}</p>
                <a href={`/${params.locale}/services/compliance-advisory`} className="text-accent hover:text-accent-light font-medium">
                  {translate(messages, "common.learnMore")} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
