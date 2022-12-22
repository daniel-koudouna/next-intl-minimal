/* istanbul ignore file */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const HEADER_NAME = "x-next-intl-locale";

const locales = ["en", "de"];

function resolveLocale(request: NextRequest) {
  const reqUrl = new URL(request.url);

  const searchLocale = reqUrl.searchParams.get("lang");
  if (searchLocale != null && locales.includes(searchLocale)) {
    return searchLocale;
  }

  const hasCookie = request.cookies.has(HEADER_NAME);
  if (hasCookie) {
    const cookieLocale = request.cookies.get(HEADER_NAME)?.value || "";
    if (locales.includes(cookieLocale)) {
      return cookieLocale;
    }
  }

  for (const lang of locales) {
    if (reqUrl.pathname.startsWith("/" + lang + "/")) {
      return lang;
    }
  }

  return "en";
}

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const pathName = url.pathname;

  const hasNext = pathName.includes("_next");
  const hasDot = pathName.includes(".");
  const hasHtml = pathName.endsWith(".html");
  const hasFile = hasDot && !hasHtml;
  if (hasNext || hasFile) {
    return NextResponse.next();
  }

  const locale = resolveLocale(request);

  // TODO edge case - locale doesn't match url
  const needsRewrite = !url.pathname.startsWith("/" + locale);
  const requestHeaders = new Headers(request.headers);
  // requestHeaders.set("x-next-intl-locale", locale);

  let response;
  if (needsRewrite) {
    url.pathname = `/${locale}${url.pathname}`;
    response = NextResponse.redirect(url.href);
  } else {
    response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const hasCookie = request.cookies.has(HEADER_NAME);
  if (hasCookie) {
    const cookieValue = request.cookies.get(HEADER_NAME)?.value;
    if (cookieValue != locale) {
      response.cookies.set(HEADER_NAME, locale);
    }
  }
  response.headers.set(HEADER_NAME, locale);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|en\\/?|de\\/?).*)"],
};
