"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
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
      const matchesCategory =
        selectedCategory === "all" || product.category_id === selectedCategory;

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
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
            Catálogo de Equipos
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Hardware con garantía oficial y soporte local en Colombia.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar modelo o marca..."
            className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-4 text-xs text-zinc-900 placeholder-zinc-400 shadow-2xs focus:border-zinc-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Filter Tabs & Sorting */}
      <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === "all"
                ? "bg-zinc-900 text-white shadow-2xs"
                : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
            }`}
          >
            Todos ({MOCK_PRODUCTS.length})
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-zinc-900 text-white shadow-2xs"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 self-end lg:self-auto">
          <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />
          <span className="text-xs text-zinc-500">Ordenar:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-700 focus:border-zinc-400 focus:outline-none"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="rating">Mejor calificación</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8">
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center">
            <p className="text-sm font-semibold text-zinc-700">
              No se encontraron productos coincidentes
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-3 rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800"
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
