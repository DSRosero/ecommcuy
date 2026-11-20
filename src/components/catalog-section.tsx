"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, Heart, ChevronDown, Sparkles } from "lucide-react";
import { CATEGORIES, MOCK_PRODUCTS } from "@/data/mock-products";
import { Product } from "@/types";
import { ProductCard } from "@/components/product-card";
import { ProductDetailModal } from "@/components/product-detail-modal";

const FAVORITES_KEY = "ecommcuy_favs_v1";
const ITEMS_PER_PAGE = 12;

export function CatalogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<"all" | "under1m" | "1m-3m" | "3m-7m" | "over7m">("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading favorites", e);
    }
  }, []);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Error saving favorites", e);
      }
      return updated;
    });
  };

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedCategory, searchQuery, priceRange, sortBy, onlyFavorites]);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Favorites filter
      if (onlyFavorites && !favorites.includes(product.id)) {
        return false;
      }

      // Category filter
      const matchesCategory =
        selectedCategory === "all" || product.category_id === selectedCategory;

      // Price filter
      let matchesPrice = true;
      if (priceRange === "under1m") matchesPrice = product.price_cop < 1000000;
      else if (priceRange === "1m-3m") matchesPrice = product.price_cop >= 1000000 && product.price_cop <= 3000000;
      else if (priceRange === "3m-7m") matchesPrice = product.price_cop > 3000000 && product.price_cop <= 7000000;
      else if (priceRange === "over7m") matchesPrice = product.price_cop > 7000000;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.short_description.toLowerCase().includes(query) ||
        (product.category_name && product.category_name.toLowerCase().includes(query));

      return matchesCategory && matchesPrice && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price_cop - b.price_cop;
      if (sortBy === "price-desc") return b.price_cop - a.price_cop;
      if (sortBy === "rating") return b.rating - a.rating;
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, priceRange, sortBy, onlyFavorites, favorites]);

  const paginatedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
              Catálogo de Hardware & Periféricos
            </h2>
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-mono font-semibold text-zinc-600">
              {MOCK_PRODUCTS.length} productos
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-500">
            10 categorías especializadas en equipos de alta gama con garantía directa y envíos asegurados a Colombia.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar modelo, gráfica, switch, marca..."
            className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-4 text-xs text-zinc-900 placeholder-zinc-400 shadow-2xs focus:border-zinc-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-700"
            >
              Borrar
            </button>
          )}
        </div>
      </div>

      {/* Categories Bar */}
      <div className="mt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => {
              setSelectedCategory("all");
              setOnlyFavorites(false);
            }}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              selectedCategory === "all" && !onlyFavorites
                ? "bg-zinc-950 text-white shadow-xs"
                : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
            }`}
          >
            Todas ({MOCK_PRODUCTS.length})
          </button>

          {/* Favorites Tab */}
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
              onlyFavorites
                ? "bg-red-500 text-white shadow-xs"
                : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-red-600"
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${onlyFavorites ? "fill-white" : "text-red-500"}`} />
            <span>Favoritos ({favorites.length})</span>
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setOnlyFavorites(false);
              }}
              className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                selectedCategory === cat.id && !onlyFavorites
                  ? "bg-zinc-950 text-white shadow-xs"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
            >
              {cat.name} ({cat.product_count || 10})
            </button>
          ))}
        </div>
      </div>

      {/* Filter Options & Sort Select */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-4">
        {/* Price Range Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-zinc-400 font-medium mr-1">Rango COP:</span>
          <button
            onClick={() => setPriceRange("all")}
            className={`rounded-lg px-2.5 py-1 transition-colors ${
              priceRange === "all"
                ? "bg-zinc-200 font-semibold text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
            }`}
          >
            Cualquier precio
          </button>
          <button
            onClick={() => setPriceRange("under1m")}
            className={`rounded-lg px-2.5 py-1 transition-colors ${
              priceRange === "under1m"
                ? "bg-zinc-200 font-semibold text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
            }`}
          >
            &lt; $1M
          </button>
          <button
            onClick={() => setPriceRange("1m-3m")}
            className={`rounded-lg px-2.5 py-1 transition-colors ${
              priceRange === "1m-3m"
                ? "bg-zinc-200 font-semibold text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
            }`}
          >
            $1M - $3M
          </button>
          <button
            onClick={() => setPriceRange("3m-7m")}
            className={`rounded-lg px-2.5 py-1 transition-colors ${
              priceRange === "3m-7m"
                ? "bg-zinc-200 font-semibold text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
            }`}
          >
            $3M - $7M
          </button>
          <button
            onClick={() => setPriceRange("over7m")}
            className={`rounded-lg px-2.5 py-1 transition-colors ${
              priceRange === "over7m"
                ? "bg-zinc-200 font-semibold text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
            }`}
          >
            &gt; $7M
          </button>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />
          <span className="text-xs text-zinc-500">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-700 focus:border-zinc-400 focus:outline-none cursor-pointer"
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
          <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center">
            <p className="text-sm font-semibold text-zinc-700">
              No se encontraron productos coincidentes
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Prueba cambiando los filtros de categoría o rango de precio.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setPriceRange("all");
                setOnlyFavorites(false);
              }}
              className="mt-4 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={toggleFavorite}
                  onOpenQuickView={(p) => setActiveModalProduct(p)}
                />
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-12 flex flex-col items-center justify-center gap-3">
              <span className="text-xs text-zinc-500 font-mono">
                Mostrando {paginatedProducts.length} de {filteredProducts.length} productos
              </span>

              {hasMore && (
                <button
                  onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-2.5 text-xs font-semibold text-zinc-800 shadow-2xs hover:bg-zinc-50 hover:border-zinc-300 transition-all cursor-pointer"
                >
                  <span>Cargar más productos</span>
                  <ChevronDown className="h-4 w-4 text-zinc-500" />
                </button>
              )}
            </div>
          </>
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
