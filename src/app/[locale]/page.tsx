import { type Locale } from "@/config/site";
import { getMessages, translate } from "@/i18n/utils";
import Hero from "@/components/sections/Hero";

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const messages = getMessages(params.locale);
  
  return (
    <div>
      <Hero locale={params.locale} messages={messages} />
      
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
