import { type Locale } from "@/config/site";
import { getMessages, translate } from "@/i18n/utils";

export default function ComplianceAdvisoryPage({ params }: { params: { locale: Locale } }) {
  const messages = getMessages(params.locale);
  
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6">{translate(messages, "services.complianceAdvisory.title")}</h1>
          <p className="text-xl mb-12">{translate(messages, "services.complianceAdvisory.description")}</p>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl mb-4">Compliance & Strategic Advisory</h2>
            <p>Stay compliant with evolving international regulations while optimizing your business operations. Our expert advisory team provides strategic guidance tailored to your needs.</p>
            
            <div className="bg-neutral-50 p-8 rounded-xl my-8">
              <h3 className="text-xl mb-4">Advisory Services:</h3>
              <ul className="space-y-3 text-neutral-700">
                <li>Regulatory compliance assessment</li>
                <li>Tax optimization strategies</li>
                <li>Ongoing compliance monitoring</li>
                <li>Corporate governance advisory</li>
                <li>Risk management consultation</li>
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
