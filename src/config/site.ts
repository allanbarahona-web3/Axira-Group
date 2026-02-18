export const siteConfig = {
  brandName: "Axira Group",
  brandTagline: "Advisory & Property Services",
  
  // Contact
  whatsappNumber: "+447735701311",
  whatsappLink: `https://wa.me/447735701311`,
  primaryEmail: "info@axiragroup.com",
  
  // Internationalization
  locales: ["en", "es", "de", "pt"] as const,
  defaultLocale: "en" as const,
  
  // Navigation
  navigation: [
    { key: "home", href: "/" },
    { key: "services", href: "/services" },
    { key: "realEstate", href: "/real-estate" },
    { key: "about", href: "/about" },
    { key: "contact", href: "/contact" },
  ],
  
  // Services
  services: [
    {
      key: "companyFormation",
      href: "/services/company-formation",
    },
    {
      key: "residencyBanking",
      href: "/services/residency-banking",
    },
    {
      key: "complianceAdvisory",
      href: "/services/compliance-advisory",
    },
  ],
} as const;

export type Locale = (typeof siteConfig.locales)[number];
