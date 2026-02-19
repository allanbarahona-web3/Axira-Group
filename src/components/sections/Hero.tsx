import HomeHero from "@/components/sections/HomeHero";
import { type Locale } from "@/config/site";

interface HeroProps {
  locale: Locale;
  messages: Record<string, any>;
}

export default function Hero({ locale, messages }: HeroProps) {
  return <HomeHero locale={locale} messages={messages} />;
}
