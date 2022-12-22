import { SiteTranslation } from "i18n/translations";
import { NextIntlConfig } from "next-intl";

const config: NextIntlConfig = {
  locales: ["en", "de"],
  defaultLocale: "en",
  async getMessages({ locale }: { locale: keyof SiteTranslation }) {
    const translations = await (await import(`i18n/translations`)).translations;
    return translations[locale];
  },
};

export default config;
