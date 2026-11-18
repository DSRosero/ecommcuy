"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Cpu, Flame } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { formatCOP } from "@/lib/utils";

export function HeroBanner() {
  const { addItem } = useCart();
  const heroProduct = MOCK_PRODUCTS[0]; // CyberBlade Studio M4 Pro

  return (
    <section className="relative overflow-hidden tech-grid-bg border-b border-zinc-800/80 pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-emerald-500/15 via-cyan-500/15 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>Nueva Generación de Hardware Pro en Colombia</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
              Potencia pura para mentes que{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                crean el futuro.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base text-zinc-400 sm:text-lg max-w-2xl leading-relaxed">
              Descubre estaciones de trabajo de alto calibre, teclados con efecto Hall, audio de fidelidad acústica y periféricos premium. Precios transparentes en <strong>COP</strong> y envíos garantizados a todo el país.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catalogo"
                className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all hover:brightness-110 active:scale-95"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={() => addItem(heroProduct, 1)}
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-5 py-3.5 text-sm font-semibold text-zinc-200 transition-all hover:border-emerald-500/50 hover:bg-zinc-800"
              >
                <Zap className="h-4 w-4 text-emerald-400" />
                <span>Comprar M4 Pro ({formatCOP(heroProduct.price_cop)})</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80">
              <div>
                <p className="font-mono text-xl font-bold text-white">100%</p>
                <p className="text-xs text-zinc-400">Garantía Directa Oficial</p>
              </div>
              <div>
                <p className="font-mono text-xl font-bold text-emerald-400">24/48h</p>
                <p className="text-xs text-zinc-400">Despachos Nacionales</p>
              </div>
              <div>
                <p className="font-mono text-xl font-bold text-cyan-400">0% Interés</p>
                <p className="text-xs text-zinc-400">Cuotas con tarjetas aliadas</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 p-5 shadow-2xl backdrop-blur-xl">
              {/* Top Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">
                    Lanzamiento Destacado
                  </span>
                </div>
                <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-[11px] font-mono text-zinc-300">
                  Stock: 7 unidades
                </span>
              </div>

              {/* Showcase Image */}
              <div className="relative mt-4 h-64 sm:h-72 w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
                <Image
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-2.5 py-1 backdrop-blur-md">
                  <span className="text-[11px] font-mono text-zinc-300">
                    Liquid XDR 120Hz • M4 Pro Max
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-5 space-y-2">
                <h3 className="text-lg font-bold text-white">
                  {heroProduct.name}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  {heroProduct.description}
                </p>

                <div className="flex items-baseline justify-between pt-3">
                  <div>
                    <span className="text-xs text-zinc-400">Precio especial COP</span>
                    <p className="font-mono text-2xl font-black text-emerald-400">
                      {formatCOP(heroProduct.price_cop)}
                    </p>
                    {heroProduct.original_price_cop && (
                      <span className="text-xs text-zinc-400 line-through">
                        {formatCOP(heroProduct.original_price_cop)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addItem(heroProduct, 1)}
                    className="rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-zinc-950 shadow-md shadow-emerald-500/20 transition-all hover:bg-emerald-400"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
