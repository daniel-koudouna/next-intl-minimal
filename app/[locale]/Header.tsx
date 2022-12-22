import { LocalizedLink, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const t = useTranslations("header");

  const pathname = usePathname() || "";

  return (
    <>
      <h1>{t("title")}</h1>
      <div style={{ padding: "10px", display: "flex" }}>
        <div style={{ width: "100px" }}>
          <Link href="/en" locale="en">
            English
          </Link>
        </div>
        <div style={{ width: "100px" }}>
          <Link href="/de">German</Link>
        </div>
      </div>
    </>
  );
}
