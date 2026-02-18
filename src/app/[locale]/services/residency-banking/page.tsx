import { type Locale } from "@/config/site";
import { getMessages, translate } from "@/i18n/utils";

export default function ResidencyBankingPage({ params }: { params: { locale: Locale } }) {
  const messages = getMessages(params.locale);
  
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6">{translate(messages, "services.residencyBanking.title")}</h1>
          <p className="text-xl mb-12">{translate(messages, "services.residencyBanking.description")}</p>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl mb-4">Residency & Banking Solutions</h2>
            <p>Secure your international residency and banking requirements with our expert guidance. We streamline complex processes to ensure smooth transitions.</p>
            
            <div className="bg-neutral-50 p-8 rounded-xl my-8">
              <h3 className="text-xl mb-4">Key Services:</h3>
              <ul className="space-y-3 text-neutral-700">
                <li>Residency program evaluation and application</li>
                <li>International banking account setup</li>
                <li>Investment residency programs</li>
                <li>Golden visa consultancy</li>
                <li>Documentation and legal support</li>
              </ul>
            </div>
            
            <div className="mt-12">
              <a href={`/${params.locale}/contact`} className="btn-primary">
                {translate(messages, "common.getInTouch")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
