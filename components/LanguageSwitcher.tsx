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
