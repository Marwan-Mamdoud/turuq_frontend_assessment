"use server";

import { cookies } from "next/headers";

export async function setLocale(locale: "en" | "ar") {
  const cookieStore = await cookies();
  cookieStore.set("locale", locale);
}

export async function getLocale(): Promise<"en" | "ar"> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;
  return locale === "en" || locale === "ar" ? locale : "en";
}
