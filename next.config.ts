// Next.js config wrapped with the next-intl plugin. The plugin injects the
// i18n request config (lib/i18n-request.ts) so translations are available in
// Server Components and Server Actions.
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n-request.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
