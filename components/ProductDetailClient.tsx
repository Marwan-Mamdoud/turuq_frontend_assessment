"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const t = useTranslations("productDetail");
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    productName: product.productName,
    productVariant: product.productVariant,
    productPrice: product.productPrice,
  });

  const handleSave = () => {
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleCancel = () => {
    setFormData({
      productName: product.productName,
      productVariant: product.productVariant,
      productPrice: product.productPrice,
    });
    setIsEditing(false);
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(formData.productPrice);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {t("title")}
        </h1>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {showSuccess && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-sm text-green-500 font-medium"
              >
                {t("success")}
              </motion.span>
            )}
          </AnimatePresence>

          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="rounded-xl"
            >
              <Pencil className="h-4 w-4 me-2" />
              {t("editForm")}
            </Button>
          ) : (
            <>
              <Button
                onClick={handleCancel}
                variant="ghost"
                className="rounded-xl"
              >
                <X className="h-4 w-4 me-1" />
                {t("cancel")}
              </Button>
              <Button
                onClick={handleSave}
                className="rounded-xl bg-primary text-primary-foreground"
              >
                <Check className="h-4 w-4 me-1" />
                {t("save")}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="rounded-2xl border-0 bg-card">
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {t("id")}
            </p>
            <p className="text-lg font-semibold">{product.id}</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-card">
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {t("name")}
            </p>
            {isEditing ? (
              <Input
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
                className="h-9 rounded-lg"
              />
            ) : (
              <p className="text-lg font-semibold">{formData.productName}</p>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-card">
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {t("variant")}
            </p>
            {isEditing ? (
              <Input
                value={formData.productVariant}
                onChange={(e) =>
                  setFormData({ ...formData, productVariant: e.target.value })
                }
                className="h-9 rounded-lg"
              />
            ) : (
              <p className="text-lg font-semibold">{formData.productVariant}</p>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-card">
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {t("price")}
            </p>
            {isEditing ? (
              <Input
                type="number"
                min="0"
                step="0.01"
                value={formData.productPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    productPrice: parseFloat(e.target.value) || 0,
                  })
                }
                className="h-9 rounded-lg"
              />
            ) : (
              <p className="text-lg font-semibold">{formattedPrice}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
