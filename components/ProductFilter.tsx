// Client component: needs useState/useMemo for client-side filtering logic.
// Receives the full product list from the Server Component (products/page.tsx)
// and filters entirely in-memory. This avoids re-fetching from the API on
// every keystroke — the server fetch happens once on page load.
//
// The variant list is derived dynamically from the fetched data using
// `[...new Set(products.map(...))]`, so new variants from the API appear
// automatically without code changes.
//
// Pagination is also client-side: the filtered list is sliced into pages
// based on the selected limit (default 10) and current page number.
"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Search, X, Filter, Tag, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
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
  /** Full product list fetched server-side — passed as a prop to avoid client fetch. */
  products: Product[];
}

const PAGE_LIMITS = [10, 20, 50, 100];

export function ProductFilter({ products }: ProductFilterProps) {
  const t = useTranslations("products");
  const [search, setSearch] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Derive unique variant names from the data. Sorted alphabetically for
  // consistent dropdown ordering across locales.
  const variants = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.productVariant))];
    return unique.sort();
  }, [products]);

  // Apply all filters in a single pass. Each filter is a no-op when unset
  // (empty string or "all"), so the default state shows all products.
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

  // Reset to page 1 whenever filters change so the user doesn't land on an empty page.
  const clearFilters = useCallback(() => {
    setSearch("");
    setSelectedVariant("all");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  }, []);

  const hasFilters = search || selectedVariant !== "all" || minPrice || maxPrice;

  // Pagination calculations.
  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, filtered.length);
  const paginatedProducts = filtered.slice(startIndex, endIndex);

  return (
    <div>
      <Card className="mb-8 rounded-2xl border-0 bg-card shadow-sm">
        <CardContent className="p-5 space-y-4">
          {/* Search input — filters by productName, case-insensitive. */}
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="ps-10 h-11 rounded-xl bg-background"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Variant dropdown — options are translated via products.variants.* keys.
                SelectValue renders translated text directly so the trigger shows
                the translated label, not the raw API value. */}
            <div className="flex items-center gap-2 flex-1">
              <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <Select
                value={selectedVariant}
                onValueChange={(v) => { if (v) { setSelectedVariant(v); setPage(1); } }}
              >
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

            {/* Price range inputs — min="0" prevents negative values. */}
            <div className="flex items-center gap-2 flex-1">
              <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex items-center gap-2 w-full">
                <Input
                  type="number"
                  min="0"
                  placeholder={t("minPrice")}
                  value={minPrice}
                  onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                  className="h-11 rounded-xl bg-background"
                />
                <span className="text-muted-foreground text-sm">-</span>
                <Input
                  type="number"
                  min="0"
                  placeholder={t("maxPrice")}
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                  className="h-11 rounded-xl bg-background"
                />
              </div>
            </div>
          </div>

          {/* Footer row — product count, clear filters, and per-page selector. */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {t("productCount", { count: filtered.length })}
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{t("pagination.perPage")}:</span>
                <Select
                  value={String(limit)}
                  onValueChange={(v) => { if (v) { setLimit(Number(v)); setPage(1); } }}
                >
                  <SelectTrigger className="h-8 w-16 rounded-lg text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {PAGE_LIMITS.map((n) => (
                      <SelectItem key={n} value={String(n)} className="rounded-lg">
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-destructive hover:text-destructive h-8"
                >
                  <X className="h-3.5 w-3.5 me-1" />
                  {t("clearFilters")}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AnimatePresence with mode="wait" ensures the old grid fades out
          before the new one fades in when filters change. */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
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
            key={`page-${safePage}-${limit}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* Pagination controls — prev/next buttons with page info. */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  {t("pagination.showing", {
                    from: startIndex + 1,
                    to: endIndex,
                    total: filtered.length,
                  })}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={safePage <= 1}
                    className="rounded-lg"
                  >
                    <ChevronLeft className="h-4 w-4 me-1" />
                    {t("pagination.previous")}
                  </Button>
                  <span className="text-sm text-muted-foreground px-2">
                    {safePage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage >= totalPages}
                    className="rounded-lg"
                  >
                    {t("pagination.next")}
                    <ChevronRight className="h-4 w-4 ms-1" />
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
