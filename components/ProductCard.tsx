"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const locale = useLocale();
  const t = useTranslations("products");

  const formattedPrice = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.productPrice);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      layout
    >
      <Link href={`/${locale}/products/${product.id}`}>
        <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-2xl border-0 bg-card cursor-pointer group">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {product.productName}
              </h3>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/15 text-primary whitespace-nowrap flex-shrink-0">
                {t(`variants.${product.productVariant}`)}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {formattedPrice}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
