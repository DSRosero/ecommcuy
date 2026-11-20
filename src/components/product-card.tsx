"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ShoppingBag, Eye, Check, Heart } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { formatCOP } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
}

export function ProductCard({
  product,
  onOpenQuickView,
  isFavorite = false,
  onToggleFavorite,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs transition-all duration-200 hover:border-zinc-300 hover:shadow-md">
      <div>
        {/* Product Image */}
        <div className="relative h-56 w-full overflow-hidden rounded-xl bg-zinc-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-103"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {product.badge && (
              <span className="rounded-md bg-zinc-900/90 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white/95 shadow-xs backdrop-blur-xs transition-all hover:scale-110 ${
              isFavorite ? "text-red-500" : "text-zinc-400 hover:text-zinc-700"
            }`}
            title={isFavorite ? "Eliminar de favoritos" : "Guardar en favoritos"}
            aria-label="Favorito"
          >
            <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-red-500" : ""}`} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={() => onOpenQuickView(product)}
            className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white/95 px-2.5 py-1.5 text-xs font-medium text-zinc-800 shadow-xs backdrop-blur-xs transition-opacity hover:bg-zinc-50"
          >
            <Eye className="h-3.5 w-3.5 text-zinc-600" />
            <span>Ficha</span>
          </button>
        </div>

        {/* Info */}
        <div className="mt-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span className="font-medium text-emerald-700">{product.category_name}</span>
            <div className="flex items-center gap-1 text-zinc-700">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3
            onClick={() => onOpenQuickView(product)}
            className="cursor-pointer text-sm font-semibold text-zinc-900 line-clamp-1 hover:text-emerald-700 transition-colors"
          >
            {product.name}
          </h3>

          <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
            {product.short_description}
          </p>
        </div>
      </div>

      {/* Price & Action */}
      <div className="mt-4 pt-3.5 border-t border-zinc-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-zinc-400 block uppercase font-mono">COP</span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-base font-bold text-zinc-900">
              {formatCOP(product.price_cop)}
            </span>
            {product.original_price_cop && (
              <span className="font-mono text-xs text-zinc-400 line-through">
                {formatCOP(product.original_price_cop)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            justAdded
              ? "bg-emerald-600 text-white"
              : "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-95"
          }`}
          aria-label="Agregar al carrito"
        >
          {justAdded ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Listo</span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Añadir</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
