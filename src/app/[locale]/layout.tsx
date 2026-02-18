import { notFound } from "next/navigation";
import { siteConfig, type Locale } from "@/config/site";
import { getMessages } from "@/i18n/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppBubble from "@/components/ui/WhatsAppBubble";

export async function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!siteConfig.locales.includes(params.locale as Locale)) {
    notFound();
  }
  
  const locale = params.locale as Locale;
  const messages = getMessages(locale);
  
  return (
    <html lang={locale}>
      <body>
        <Header locale={locale} messages={messages} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer locale={locale} messages={messages} />
        <WhatsAppBubble />
      </body>
    </html>
  );
}
