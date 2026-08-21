// Root layout — intentionally minimal. Passes children through so the
// [locale]/layout.tsx handles all rendering (theme, i18n, nav). This keeps
// the root layout clean for Next.js metadata and global CSS imports.
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Turuq Warehouse",
  description: "Warehouse Moderator App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
