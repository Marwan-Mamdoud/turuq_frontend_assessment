// Server Actions for theme persistence. The theme is stored in a cookie so the
// root layout can read it server-side and apply the correct class to <html>
// before render — this prevents the flash-of-wrong-theme that client-side
// detection (e.g. localStorage) would cause.
"use server";

import { cookies } from "next/headers";

/** Persist the user's theme choice to a cookie. */
export async function setTheme(theme: "light" | "dark") {
  const cookieStore = await cookies();
  cookieStore.set("theme", theme);
}

/** Read the current theme from the cookie. Defaults to "dark". */
export async function getTheme(): Promise<"light" | "dark"> {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;
  return theme === "light" ? "light" : "dark";
}
