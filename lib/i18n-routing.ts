// Defines the supported locales and the default locale for next-intl routing.
// Used by middleware to redirect unmatched paths to the correct locale prefix.
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
});
