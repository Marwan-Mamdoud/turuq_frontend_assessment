// Home page — Server Component. Displays 5 personal info cards with data from
// the translation dictionaries. Email and phone cards are clickable (mailto,
// wa.me links). The `index` prop drives staggered Framer Motion animations.
import { getTranslations } from "next-intl/server";
import { InfoCard } from "@/components/InfoCard";

export default async function HomePage() {
  const t = await getTranslations("home");

  // Strip spaces from phone to build a valid wa.me link (e.g. +201274847904).
  const phoneRaw = t("cards.phone.value").replace(/\s/g, "");

  const cards = [
    {
      key: "name",
      icon: "User" as const,
      value: t("cards.name.value"),
    },
    {
      key: "age",
      icon: "Calendar" as const,
      value: t("cards.age.value"),
    },
    {
      key: "email",
      icon: "Mail" as const,
      value: t("cards.email.value"),
      href: `mailto:${t("cards.email.value")}`,
    },
    {
      key: "phone",
      icon: "Phone" as const,
      value: t("cards.phone.value"),
      href: `https://wa.me/${phoneRaw.startsWith("+") ? phoneRaw.slice(1) : phoneRaw}`,
    },
    {
      key: "university",
      icon: "GraduationCap" as const,
      value: t("cards.university.value"),
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <InfoCard
            key={card.key}
            label={t(`cards.${card.key}.label`)}
            value={card.value}
            icon={card.icon}
            index={index}
            href={card.href}
          />
        ))}
      </div>
    </div>
  );
}
