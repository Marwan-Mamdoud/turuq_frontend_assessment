// next-intl middleware. Intercepts requests to "/" and "/(en|ar)/*" to ensure
// every URL is prefixed with a valid locale. Redirects unlocalised paths to the
// default locale (en). Uses the routing config from lib/i18n-routing.ts.
import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n-routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(en|ar)/:path*"],
};
