"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Check, Star, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
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
        className="fixed inset-0 bg-black/50 backdrop-blur-2xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-zinc-200 bg-zinc-50 p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover object-center"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative h-16 w-16 overflow-hidden rounded-xl border ${
                      selectedImageIndex === idx
                        ? "border-zinc-900 ring-2 ring-zinc-900/10"
                        : "border-zinc-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 space-y-1.5 text-xs text-zinc-600">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-zinc-700" />
                <span>Despachos asegurados a nivel nacional</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Garantía directa de 12 meses</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-zinc-500">{product.category_name}</span>
                <span className="text-zinc-300">•</span>
                <div className="flex items-center gap-1 text-zinc-700 font-medium">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
              </div>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950">
                {product.name}
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {product.description}
              </p>

              {/* Price */}
              <div className="mt-4 border-y border-zinc-200 py-3.5 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-zinc-400 font-mono block">PRECIO COP</span>
                  <span className="font-mono text-2xl font-bold text-zinc-950">
                    {formatCOP(product.price_cop)}
                  </span>
                </div>
                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-700">
                  Stock: {product.stock} disp.
                </span>
              </div>

              {/* Specs */}
              <div className="mt-4">
                <h4 className="text-xs font-mono font-semibold uppercase text-zinc-400 mb-2">
                  Especificaciones:
                </h4>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs divide-y divide-zinc-200">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1.5">
                      <span className="text-zinc-500 font-medium">{k}</span>
                      <span className="text-zinc-800 font-mono text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-zinc-500 hover:text-zinc-900"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono text-sm text-zinc-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-2 text-zinc-500 hover:text-zinc-900"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3 text-sm font-bold text-white shadow-xs hover:bg-zinc-800 transition-all"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>
                  {addedToast ? "Agregado al Carrito" : `Agregar ${quantity} al Carrito`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
