"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Check, Star, ShieldCheck, Zap, ShoppingBag, Truck } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { formatCOP } from "@/lib/utils";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addItem } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          aria-label="Cerrar ventana"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover object-center"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 rounded-md bg-emerald-500/90 px-2.5 py-1 text-xs font-bold text-zinc-950 backdrop-blur-md">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative h-16 w-16 overflow-hidden rounded-xl border ${
                      selectedImageIndex === idx
                        ? "border-emerald-400 ring-2 ring-emerald-400/20"
                        : "border-zinc-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Shipping & Security Quick info */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-emerald-400" />
                <span>Envío express a Bogotá (24h) y resto del país (48-72h)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>1 Año de Garantía Directa con EcommCuy Colombia</span>
              </div>
            </div>
          </div>

          {/* Right: Info, Specs, Buy */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">
                  {product.category_name}
                </span>
                <span className="text-zinc-600">•</span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-medium">
                  <Star className="h-3.5 w-3.5 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-zinc-500">({product.review_count} reseñas)</span>
                </div>
              </div>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                {product.name}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {product.description}
              </p>

              {/* Price */}
              <div className="mt-5 border-y border-zinc-800/80 py-4 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-zinc-400">Precio de contado COP</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-black text-emerald-400">
                      {formatCOP(product.price_cop)}
                    </span>
                    {product.original_price_cop && (
                      <span className="font-mono text-sm text-zinc-400 line-through">
                        {formatCOP(product.original_price_cop)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                    Stock: {product.stock} disponibles
                  </span>
                </div>
              </div>

              {/* Features bullets */}
              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Características Clave:
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {product.features.map((feat, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications */}
              <div className="mt-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Ficha Técnica:
                </h4>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-xs divide-y divide-zinc-800">
                  {Object.entries(product.specs).map(([specKey, specVal]) => (
                    <div key={specKey} className="flex justify-between py-1.5">
                      <span className="text-zinc-400 font-medium">{specKey}</span>
                      <span className="text-zinc-200 font-mono text-right">{specVal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center gap-3">
              <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-zinc-400 hover:text-white"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono text-sm text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-2 text-zinc-400 hover:text-white"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all hover:brightness-110 active:scale-[0.98]"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>
                  {addedToast ? "¡Agregado al Carrito!" : `Agregar ${quantity} al Carrito`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
