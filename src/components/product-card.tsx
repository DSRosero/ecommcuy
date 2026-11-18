"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ShoppingBag, Eye, Zap, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { formatCOP } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
}

export function ProductCard({ product, onOpenQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-4 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-emerald-500/5"
    >
      {/* Top Image & Badges */}
      <div>
        <div className="relative h-56 w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {product.badge && (
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/90 px-2 py-0.5 text-[10px] font-extrabold text-zinc-950 shadow backdrop-blur-md uppercase tracking-wider">
                {product.badge}
              </span>
            )}
            {product.is_new && (
              <span className="rounded-md border border-cyan-500/30 bg-cyan-500/90 px-2 py-0.5 text-[10px] font-extrabold text-zinc-950 shadow backdrop-blur-md uppercase tracking-wider">
                Nuevo
              </span>
            )}
          </div>

          {/* Quick View Button on Hover */}
          <button
            onClick={() => onOpenQuickView(product)}
            className={`absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-zinc-200 backdrop-blur-md transition-all duration-200 hover:bg-zinc-800 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <Eye className="h-3.5 w-3.5 text-emerald-400" />
            <span>Ficha Técnica</span>
          </button>
        </div>

        {/* Product Details */}
        <div className="mt-4 space-y-2">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-zinc-400 uppercase tracking-wider">
              {product.category_name}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-medium">
              <Star className="h-3 w-3 fill-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenQuickView(product)}
            className="cursor-pointer text-base font-semibold text-zinc-100 transition-colors group-hover:text-white line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Short description / specs badge */}
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {product.short_description}
          </p>
        </div>
      </div>

      {/* Bottom: Price and Buy Button */}
      <div className="mt-5 pt-4 border-t border-zinc-800/80">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] font-mono text-zinc-400 block">Precio COP</span>
            <span className="font-mono text-lg font-black text-emerald-400">
              {formatCOP(product.price_cop)}
            </span>
            {product.original_price_cop && (
              <span className="ml-2 font-mono text-xs text-zinc-400 line-through">
                {formatCOP(product.original_price_cop)}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all active:scale-95 ${
              justAdded
                ? "bg-emerald-400 text-zinc-950"
                : "bg-zinc-800 text-zinc-100 hover:bg-emerald-500 hover:text-zinc-950"
            }`}
            aria-label="Agregar al carrito"
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Agregado</span>
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
    </div>
  );
}
