import { type Locale } from "@/config/site";
import { getMessages, translate } from "@/i18n/utils";

export default function ServicesPage({ params }: { params: { locale: Locale } }) {
  const messages = getMessages(params.locale);
  
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="mb-6">{translate(messages, "services.title")}</h1>
          <p className="text-xl">{translate(messages, "services.subtitle")}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="group">
            <div className="bg-primary text-white p-12 rounded-2xl mb-6 group-hover:bg-primary-dark transition-colors">
              <h3 className="text-2xl text-white mb-4">{translate(messages, "services.companyFormation.title")}</h3>
              <p className="text-neutral-100 mb-6">{translate(messages, "services.companyFormation.description")}</p>
              <a 
                href={`/${params.locale}/services/company-formation`}
                className="inline-flex items-center text-accent-light hover:text-accent font-medium"
              >
                {translate(messages, "common.learnMore")} →
              </a>
            </div>
          </div>
          
          <div className="group">
            <div className="bg-primary text-white p-12 rounded-2xl mb-6 group-hover:bg-primary-dark transition-colors">
              <h3 className="text-2xl text-white mb-4">{translate(messages, "services.residencyBanking.title")}</h3>
              <p className="text-neutral-100 mb-6">{translate(messages, "services.residencyBanking.description")}</p>
              <a 
                href={`/${params.locale}/services/residency-banking`}
                className="inline-flex items-center text-accent-light hover:text-accent font-medium"
              >
                {translate(messages, "common.learnMore")} →
              </a>
            </div>
          </div>
          
          <div className="group">
            <div className="bg-primary text-white p-12 rounded-2xl mb-6 group-hover:bg-primary-dark transition-colors">
              <h3 className="text-2xl text-white mb-4">{translate(messages, "services.complianceAdvisory.title")}</h3>
              <p className="text-neutral-100 mb-6">{translate(messages, "services.complianceAdvisory.description")}</p>
              <a 
                href={`/${params.locale}/services/compliance-advisory`}
                className="inline-flex items-center text-accent-light hover:text-accent font-medium"
              >
                {translate(messages, "common.learnMore")} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
