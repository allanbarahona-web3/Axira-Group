import { type Locale } from "@/config/site";
import { getMessages, translate } from "@/i18n/utils";

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const messages = getMessages(params.locale);
  
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="mb-6">{translate(messages, "about.title")}</h1>
            <p className="text-xl">{translate(messages, "about.subtitle")}</p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-neutral-50 p-12 rounded-2xl mb-12">
              <h2 className="text-3xl mb-6">Premier Advisory Excellence</h2>
              <p className="text-lg">
                Axira Group provides comprehensive advisory and property services for discerning clients 
                seeking international business solutions and exclusive real estate opportunities.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-5xl font-bold text-accent mb-3">15+</div>
                <div className="text-neutral-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-accent mb-3">500+</div>
                <div className="text-neutral-600">Successful Formations</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-accent mb-3">30+</div>
                <div className="text-neutral-600">Countries Served</div>
              </div>
            </div>
            
            <h2 className="text-2xl mb-4">Our Expertise</h2>
            <p>
              With deep expertise in international business formation, residency solutions, and premium 
              real estate, we guide our clients through complex regulatory landscapes to achieve their 
              strategic objectives.
            </p>
            
            <h2 className="text-2xl mb-4 mt-8">Our Approach</h2>
            <p>
              We combine local knowledge with global perspective, providing personalized service and 
              strategic insights that ensure optimal outcomes for every client engagement.
            </p>
            
            <div className="mt-12 text-center">
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
