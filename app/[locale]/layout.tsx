import { ReactNode } from "react";
import { NextIntlServerProvider } from "next-intl/server";
import i18n from "next-intl/config";
import { LocalizedLink, useTranslations } from "next-intl";
import Header from "./Header";

interface Props {
  children: ReactNode;
  params: { locale: string };
}
export default function LocaleLayout({ children, params: { locale } }: Props) {
  return (
    <NextIntlServerProvider locale={locale}>
      <Header />
      <main>{children}</main>
    </NextIntlServerProvider>
  );
}

export function generateStaticParams() {
  return i18n.locales.map((l) => {
    return {
      locale: l,
    };
  });
}
