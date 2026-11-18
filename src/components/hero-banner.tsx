"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { formatCOP } from "@/lib/utils";

export function HeroBanner() {
  const { addItem } = useCart();
  const heroProduct = MOCK_PRODUCTS[0];

  return (
    <section className="tech-dot-bg border-b border-zinc-200/80 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left: Sober Minimalist Copy */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 font-mono text-xs font-semibold text-zinc-700">
              Edición 2026 • Envíos Colombia
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl leading-[1.08]">
              Tecnología de precisión para creadores.
            </h1>

            <p className="text-base text-zinc-600 sm:text-lg max-w-xl leading-relaxed">
              Equipos de alto rendimiento, teclados mecánicos y audio de estudio seleccionados para ingenieros, desarrolladores y diseñadores.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#catalogo"
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-zinc-800"
              >
                <span>Ver Catálogo</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={() => addItem(heroProduct, 1)}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-800 shadow-2xs hover:bg-zinc-50"
              >
                <ShoppingBag className="h-4 w-4 text-zinc-600" />
                <span>Comprar M4 Pro ({formatCOP(heroProduct.price_cop)})</span>
              </button>
            </div>
          </div>

          {/* Right: Clean Hero Card */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-xl bg-zinc-100">
                <Image
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-500 hover:scale-102"
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">{heroProduct.name}</h3>
                  <p className="font-mono text-sm font-semibold text-zinc-900">
                    {formatCOP(heroProduct.price_cop)}
                  </p>
                </div>

                <button
                  onClick={() => addItem(heroProduct, 1)}
                  className="rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
