import { type Locale } from "@/config/site";
import { getMessages, translate } from "@/i18n/utils";

export default function CompanyFormationPage({ params }: { params: { locale: Locale } }) {
  const messages = getMessages(params.locale);
  
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6">{translate(messages, "services.companyFormation.title")}</h1>
          <p className="text-xl mb-12">{translate(messages, "services.companyFormation.description")}</p>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl mb-4">Expert Company Formation Services</h2>
            <p>Navigate the complexities of international business formation with our comprehensive advisory services. We provide strategic guidance for establishing your business in optimal jurisdictions.</p>
            
            <div className="bg-neutral-50 p-8 rounded-xl my-8">
              <h3 className="text-xl mb-4">Our Services Include:</h3>
              <ul className="space-y-3 text-neutral-700">
                <li>Jurisdiction analysis and selection</li>
                <li>Corporate structure optimization</li>
                <li>Registration and documentation</li>
                <li>Banking relationship establishment</li>
                <li>Ongoing compliance support</li>
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
