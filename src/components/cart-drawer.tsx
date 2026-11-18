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
        className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-zinc-200 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-zinc-900" />
            <h2 className="text-base font-bold text-zinc-900">Carrito de Compras</h2>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600">
              {items.length}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Notice */}
        {items.length > 0 && (
          <div className="border-b border-zinc-100 bg-zinc-50 px-6 py-3">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-600">
              <span className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-emerald-600" />
                {remainingForFree === 0
                  ? "¡Envío Nacional Gratis aplicado!"
                  : `Faltan ${formatCOP(remainingForFree)} para Envío Gratis`}
              </span>
              <span className="font-mono text-zinc-800">{progressToFreeShipping}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>
        )}

        {/* Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-zinc-900">Tu carrito está vacío</h3>
              <p className="mt-1 text-xs text-zinc-500 max-w-xs">
                Selecciona productos de nuestro catálogo para comenzar tu pedido.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
              >
                Ver Catálogo
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-3"
              >
                <div className="relative h-18 w-18 flex-shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-white">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-semibold text-zinc-900 line-clamp-1">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-zinc-400 hover:text-red-500"
                        title="Eliminar"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-zinc-500">{product.category_name}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono text-xs font-bold text-zinc-900">
                      {formatCOP(product.price_cop * quantity)}
                    </span>

                    <div className="flex items-center rounded-lg border border-zinc-200 bg-white shadow-2xs">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-2 py-0.5 text-zinc-500 hover:text-zinc-900"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[20px] text-center font-mono text-xs text-zinc-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="px-2 py-0.5 text-zinc-500 hover:text-zinc-900"
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

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="border-t border-zinc-200 bg-white p-6 space-y-4">
            <div className="space-y-1.5 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-zinc-900">{formatCOP(subtotalCOP)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío nacional</span>
                <span className="font-mono font-medium text-zinc-900">
                  {shippingCOP === 0 ? "GRATIS" : formatCOP(shippingCOP)}
                </span>
              </div>
              <div className="border-t border-zinc-200 pt-2 flex justify-between text-sm font-bold text-zinc-950">
                <span>Total</span>
                <span className="font-mono text-base text-zinc-950">{formatCOP(totalCOP)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3.5 text-xs font-bold text-white shadow-xs hover:bg-zinc-800"
              >
                <span>Ir al Pago Seguro</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <button
                onClick={clearCart}
                className="w-full text-center text-[11px] text-zinc-400 hover:text-zinc-600"
              >
                Vaciar carrito
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-zinc-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Transacciones seguras en COP</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
