"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Package,
  LayoutDashboard,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface SideNavProps {
  locale: string;
  theme: "light" | "dark";
}

const navItems = [
  { key: "home", icon: Home, hrefSuffix: "" },
  { key: "products", icon: Package, hrefSuffix: "/products" },
  { key: "dashboard", icon: LayoutDashboard, hrefSuffix: "", disabled: true },
  { key: "settings", icon: Settings, hrefSuffix: "", disabled: true },
];

export function SideNav({ locale, theme }: SideNavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isRtl = locale === "ar";
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (hrefSuffix: string) => {
    if (hrefSuffix === "") {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.includes(hrefSuffix);
  };

  const navContent = (
    <nav className="flex flex-col h-full">
      <div className="p-6 pb-4">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Package className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">Turuq</span>
        </Link>
      </div>

      <div className="flex-1 px-3 py-2">
        {navItems.map((item) => {
          const href = item.disabled
            ? "#"
            : `/${locale}${item.hrefSuffix}`;
          const active = !item.disabled && isActive(item.hrefSuffix);

          return (
            <Link
              key={item.key}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-primary/15 text-primary"
                  : item.disabled
                    ? "text-muted-foreground/50 cursor-not-allowed"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="flex-1">{t(item.key)}</span>
              {item.disabled && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {t("soon")}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <ThemeToggle initialTheme={theme} />
          <LanguageSwitcher currentLocale={locale as "en" | "ar"} />
        </div>
      </div>
    </nav>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 start-4 z-50 p-2.5 rounded-xl bg-primary text-primary-foreground shadow-lg"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: isRtl ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? "100%" : "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 start-0 z-50 w-64 bg-card border-e border-border md:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 end-4 p-2 rounded-lg hover:bg-accent"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
              {navContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <aside className="hidden md:flex fixed inset-y-0 start-0 z-30 w-64 bg-card border-e border-border flex-col transition-theme">
        {navContent}
      </aside>
    </>
  );
}
