"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { CATEGORIES, MOCK_PRODUCTS } from "@/data/mock-products";
import { Product } from "@/types";
import { ProductCard } from "@/components/product-card";
import { ProductDetailModal } from "@/components/product-detail-modal";

export function CatalogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory =
        selectedCategory === "all" || product.category_id === selectedCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.short_description.toLowerCase().includes(query) ||
        (product.category_name && product.category_name.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price_cop - b.price_cop;
      if (sortBy === "price-desc") return b.price_cop - a.price_cop;
      if (sortBy === "rating") return b.rating - a.rating;
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Colección Oficial 2026</span>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Catálogo de Hardware & Periféricos
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Productos certificados con garantía directa y envío rápido a toda Colombia.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por modelo, chip, marca..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 py-2.5 pl-10 pr-4 text-xs text-zinc-200 placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs & Sorting Bar */}
      <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-xl px-4 py-2 text-xs font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20"
                : "border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white"
            }`}
          >
            Todos ({MOCK_PRODUCTS.length})
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20"
                  : "border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end lg:self-auto">
          <SlidersHorizontal className="h-4 w-4 text-zinc-500" />
          <span className="text-xs text-zinc-400">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-200 focus:border-emerald-500/50 focus:outline-none"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="rating">Mejor calificación</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mt-8">
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-12 text-center">
            <p className="text-base font-semibold text-zinc-300">
              No se encontraron productos con los filtros seleccionados
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Prueba cambiando la búsqueda o seleccionando otra categoría.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-medium text-white hover:bg-zinc-700"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenQuickView={(p) => setActiveModalProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </section>
  );
}
