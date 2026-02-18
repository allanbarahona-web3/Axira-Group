import { type Locale, siteConfig } from "@/config/site";
import { getMessages, translate } from "@/i18n/utils";

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const messages = getMessages(params.locale);
  
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="mb-6">{translate(messages, "contact.title")}</h1>
            <p className="text-xl">{translate(messages, "contact.subtitle")}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-primary text-white p-12 rounded-2xl">
              <h2 className="text-2xl text-white mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg text-accent-light mb-2">{translate(messages, "contact.whatsapp")}</h3>
                  <a 
                    href={siteConfig.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl hover:text-accent-light transition-colors"
                  >
                    {siteConfig.whatsappNumber}
                  </a>
                </div>
                
                <div>
                  <h3 className="text-lg text-accent-light mb-2">{translate(messages, "contact.email")}</h3>
                  <a 
                    href={`mailto:${siteConfig.primaryEmail}`}
                    className="text-xl hover:text-accent-light transition-colors"
                  >
                    {siteConfig.primaryEmail}
                  </a>
                </div>
              </div>
              
              <div className="mt-12 pt-12 border-t border-white/20">
                <h3 className="text-lg mb-4">Office Hours</h3>
                <p className="text-neutral-100">
                  Monday - Friday: 9:00 AM - 6:00 PM GMT<br />
                  Saturday: By Appointment<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
            
            <div className="bg-neutral-50 p-12 rounded-2xl">
              <h2 className="text-2xl mb-6">Send a Message</h2>
              <p className="text-neutral-600 mb-8">
                For inquiries, please contact us via WhatsApp or email. We typically respond within 24 hours.
              </p>
              
              <div className="space-y-4">
                <a 
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent w-full"
                >
                  Contact via {translate(messages, "contact.whatsapp")}
                </a>
                
                <a 
                  href={`mailto:${siteConfig.primaryEmail}`}
                  className="btn-outline w-full"
                >
                  Send {translate(messages, "contact.email")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
