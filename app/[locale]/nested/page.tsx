import { LocalizedLink, useTranslations } from "next-intl";

export default function NestedPage() {
  const t = useTranslations("test");

  return (
    <>
      <h2>{t("bar")}</h2>
      <LocalizedLink href="/">Go home</LocalizedLink>
    </>
  );
}
