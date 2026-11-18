"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatCOP } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    subtotalCOP,
    shippingCOP,
    totalCOP,
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 300000;
  const progressToFreeShipping = Math.min(
    100,
    Math.round((subtotalCOP / freeShippingThreshold) * 100)
  );
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotalCOP);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-emerald-400" />
            <h2 className="text-base font-semibold text-white">Tu Carrito Pro</h2>
            <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
              {items.length} {items.length === 1 ? "artículo" : "artículos"}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Bar */}
        {items.length > 0 && (
          <div className="border-b border-zinc-800/60 bg-zinc-900/40 px-6 py-3">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Truck className="h-3.5 w-3.5 text-emerald-400" />
                {remainingForFree === 0
                  ? "¡Calificas para Envío Gratis Nacional!"
                  : `Agrega ${formatCOP(remainingForFree)} más para Envío Gratis`}
              </span>
              <span className="font-mono text-emerald-400">{progressToFreeShipping}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60 text-zinc-500">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-base font-medium text-white">Tu carrito está vacío</h3>
              <p className="mt-1 text-sm text-zinc-400 max-w-xs">
                Explora nuestra selección de hardware de alto rendimiento y gadgets de vanguardia.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-all hover:brightness-110"
              >
                Ver Catálogo
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="group relative flex gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 transition-all hover:border-zinc-700"
              >
                {/* Image */}
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-zinc-100 line-clamp-1">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-zinc-500 transition-colors hover:text-red-400"
                        title="Eliminar producto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-400">{product.category_name}</p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-emerald-400">
                      {formatCOP(product.price_cop * quantity)}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-950">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-2 py-1 text-zinc-400 hover:text-white"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[24px] text-center font-mono text-xs text-zinc-200">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="px-2 py-1 text-zinc-400 hover:text-white"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="border-t border-zinc-800 bg-zinc-950 p-6 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-200">{formatCOP(subtotalCOP)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Envío nacional</span>
                <span className="font-mono text-zinc-200">
                  {shippingCOP === 0 ? (
                    <span className="text-emerald-400 font-semibold">GRATIS</span>
                  ) : (
                    formatCOP(shippingCOP)
                  )}
                </span>
              </div>
              <div className="border-t border-zinc-800 pt-2 flex justify-between text-base font-semibold text-white">
                <span>Total a pagar</span>
                <span className="font-mono text-lg text-emerald-400">
                  {formatCOP(totalCOP)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all hover:brightness-110 active:scale-[0.99]"
              >
                <span>Proceder al Pago</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={clearCart}
                className="text-center text-xs text-zinc-500 hover:text-zinc-400"
              >
                Vaciar carrito
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-zinc-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>Transacción cifrada SSL 256-bit • Moneda COP</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
