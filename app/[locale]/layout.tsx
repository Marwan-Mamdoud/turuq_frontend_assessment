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

  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value === "light" ? "light" : "dark";
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
