/**
 * Locale-aware root layout. This is where the cookie-based theme and locale
 * are read server-side:
 *
 * - Theme cookie: Applied as a `dark` class on <html> before render so the
 *   correct color scheme is present on first paint (zero flash of wrong theme).
 * - Locale cookie: Determines `dir="rtl"` for Arabic, the `lang` attribute,
 *   and which translation dictionary to load via next-intl.
 *
 * The SideNav receives both locale and theme as props so client components
 * can stay in sync with the server-rendered state.
 */
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Lexend } from "next/font/google";
import { routing } from "@/lib/i18n-routing";
import { SideNav } from "@/components/SideNav";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Read theme from cookie server-side to avoid hydration flash. Defaults to
  // "dark" when no cookie is set (first visit).
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value === "light" ? "light" : "dark";

  // Arabic is the only RTL locale — sets dir on <html> so the entire layout
  // (nav position, text alignment, padding/margin utilities) flips correctly.
  const dir = locale === "ar" ? "rtl" : "ltr";

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} dir={dir} className={lexend.variable}>
      <body className={`min-h-screen transition-theme ${theme === "dark" ? "dark" : ""}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex min-h-screen">
            <SideNav locale={locale} theme={theme} />
            <main className="flex-1 pt-16 pb-4 px-4 md:pt-6 md:px-6 lg:px-8 md:ms-64">
              {children}
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
