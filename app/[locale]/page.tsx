import { LocalizedLink, useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("test");
  return (
    <>
      <div>
        <h2>{t("foo")}</h2>
        <LocalizedLink href="/nested">Go to nested page</LocalizedLink>
      </div>
    </>
  );
}
