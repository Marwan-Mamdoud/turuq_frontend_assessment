"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Search, X, Filter, Tag, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";

interface ProductFilterProps {
  products: Product[];
}

export function ProductFilter({ products }: ProductFilterProps) {
  const t = useTranslations("products");
  const [search, setSearch] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const variants = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.productVariant))];
    return unique.sort();
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.productName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesVariant =
        selectedVariant === "all" || product.productVariant === selectedVariant;
      const matchesMinPrice =
        minPrice === "" || product.productPrice >= parseFloat(minPrice);
      const matchesMaxPrice =
        maxPrice === "" || product.productPrice <= parseFloat(maxPrice);
      return matchesSearch && matchesVariant && matchesMinPrice && matchesMaxPrice;
    });
  }, [products, search, selectedVariant, minPrice, maxPrice]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setSelectedVariant("all");
    setMinPrice("");
    setMaxPrice("");
  }, []);

  const hasFilters = search || selectedVariant !== "all" || minPrice || maxPrice;

  return (
    <div>
      <Card className="mb-8 rounded-2xl border-0 bg-card shadow-sm">
        <CardContent className="p-5 space-y-4">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-10 h-11 rounded-xl bg-background"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 flex-1">
              <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <Select value={selectedVariant} onValueChange={(v) => v && setSelectedVariant(v)}>
                <SelectTrigger className="h-11 rounded-lg bg-background w-full">
                  <SelectValue>
                    {selectedVariant === "all"
                      ? t("allVariants")
                      : t(`variants.${selectedVariant}`)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all" className="rounded-lg py-2.5">
                    {t("allVariants")}
                  </SelectItem>
                  {variants.map((variant) => (
                    <SelectItem key={variant} value={variant} className="rounded-lg py-2.5">
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary/60" />
                        {t(`variants.${variant}`)}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 flex-1">
              <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex items-center gap-2 w-full">
                <Input
                  type="number"
                  min="0"
                  placeholder={t("minPrice")}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="h-11 rounded-xl bg-background"
                />
                <span className="text-muted-foreground text-sm">-</span>
                <Input
                  type="number"
                  min="0"
                  placeholder={t("maxPrice")}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="h-11 rounded-xl bg-background"
                />
              </div>
            </div>
          </div>

          {hasFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground">
                {t("productCount", { count: filtered.length })}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-destructive hover:text-destructive h-8"
              >
                <X className="h-3.5 w-3.5 me-1" />
                {t("clearFilters")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {!hasFilters && (
        <p className="text-sm text-muted-foreground mb-4">
          {t("productCount", { count: filtered.length })}
        </p>
      )}

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <Filter className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">{t("emptyState")}</p>
            {hasFilters && (
              <Button variant="link" onClick={clearFilters} className="mt-2 text-primary">
                {t("clearFilters")}
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
