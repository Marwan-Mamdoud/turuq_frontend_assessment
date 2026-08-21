// Client component: needs Framer Motion for staggered entrance animation.
// Reusable info card that displays a label, value, and icon. When `href` is
// provided, the entire card becomes a clickable link (opens in new tab).
// The `icon` prop is a string key mapped to a Lucide component internally —
// this avoids passing React components as props across the server/client
// boundary, which is not allowed in React Server Components.
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Phone, GraduationCap, Calendar, ExternalLink, MessageCircle } from "lucide-react";

const iconMap = {
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  WhatsApp: MessageCircle,
} as const;

type IconName = keyof typeof iconMap;

interface InfoCardProps {
  label: string;
  value: string;
  /** String key into iconMap — not a component reference, to stay RSC-safe. */
  icon: IconName;
  /** Drives the stagger delay: each card animates in sequence. */
  index: number;
  /** If provided, wraps the card in an <a> tag linking externally. */
  href?: string;
}

export function InfoCard({ label, value, icon, index, href }: InfoCardProps) {
  const Icon = iconMap[icon];

  const content = (
    <CardContent className="p-5 flex items-start gap-4">
      <div className="p-3 rounded-xl bg-primary/15 text-primary flex-shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
          {label}
        </p>
        <p className="text-base font-semibold text-foreground break-words">{value}</p>
      </div>
      {href && (
        <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
      )}
    </CardContent>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
          <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-2xl border-0 bg-card cursor-pointer group">
            {content}
          </Card>
        </a>
      ) : (
        <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-2xl border-0 bg-card">
          {content}
        </Card>
      )}
    </motion.div>
  );
}
