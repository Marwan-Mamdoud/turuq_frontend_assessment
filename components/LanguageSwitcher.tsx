// Client component: needs useRouter and usePathname to navigate to the new
// locale route after persisting the choice.
// Swaps between EN and AR. Persists the locale to a cookie via a Server Action,
// then navigates to the new locale-prefixed URL (e.g. /en/... → /ar/...).
"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { setLocale } from "@/actions/locale";

interface LanguageSwitcherProps {
  currentLocale: "en" | "ar";
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = async () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    await setLocale(newLocale);

    // Replace the locale segment in the current URL and navigate.
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="h-10 px-3 text-sm font-medium"
      aria-label="Switch language"
    >
      {currentLocale === "en" ? "عربي" : "EN"}
    </Button>
  );
}
