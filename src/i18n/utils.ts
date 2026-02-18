import { siteConfig, type Locale } from "@/config/site";

type Messages = Record<string, any>;

export function getMessages(locale: Locale): Messages {
  try {
    return require(`./messages/${locale}.json`);
  } catch {
    return require(`./messages/${siteConfig.defaultLocale}.json`);
  }
}

export function translate(messages: Messages, key: string): string {
  const keys = key.split(".");
  let value: any = messages;
  
  for (const k of keys) {
    if (value && typeof value === "object") {
      value = value[k];
    } else {
      return key;
    }
  }
  
  return typeof value === "string" ? value : key;
}
