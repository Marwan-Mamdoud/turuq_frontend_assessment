// Server Actions for locale persistence. Like the theme, the locale is stored
// in a cookie so the root layout can read it server-side to set dir="rtl" and
// load the correct translation dictionary before the first paint.
"use server";

import { cookies } from "next/headers";

/** Persist the user's locale choice to a cookie. */
export async function setLocale(locale: "en" | "ar") {
  const cookieStore = await cookies();
  cookieStore.set("locale", locale);
}

/** Read the current locale from the cookie. Defaults to "en". */
export async function getLocale(): Promise<"en" | "ar"> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;
  return locale === "en" || locale === "ar" ? locale : "en";
}
