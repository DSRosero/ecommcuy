"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Sparkles, Menu, X, Cpu } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 transition-all duration-300 group-hover:shadow-emerald-500/40">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-zinc-950">
              <Cpu className="h-5 w-5 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xl font-extrabold tracking-tight text-white">
                Ecomm<span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Cuy</span>
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                PRO
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400">
              High-End Tech • Colombia
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link
            href="/#catalogo"
            className="transition-colors hover:text-white"
          >
            Catálogo Completo
          </Link>
          <Link
            href="/#laptops-pro"
            className="transition-colors hover:text-white"
          >
            Laptops & Estaciones
          </Link>
          <Link
            href="/#perifericos"
            className="transition-colors hover:text-white"
          >
            Periféricos
          </Link>
          <Link
            href="/#audio-hi-fi"
            className="transition-colors hover:text-white"
          >
            Audio Hi-Fi
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-10 items-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 text-sm font-medium text-zinc-200 transition-all hover:border-emerald-500/50 hover:bg-zinc-800/80"
            aria-label="Abrir carrito de compras"
          >
            <ShoppingBag className="h-4 w-4 text-emerald-400" />
            <span className="hidden sm:inline">Carrito</span>
            {totalItems > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-emerald-500 px-1.5 text-xs font-bold text-zinc-950">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 md:hidden text-zinc-400 hover:text-white"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-4 md:hidden space-y-3">
          <Link
            href="/#catalogo"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-emerald-400"
          >
            Catálogo Completo
          </Link>
          <Link
            href="/#laptops-pro"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-emerald-400"
          >
            Laptops & Estaciones
          </Link>
          <Link
            href="/#perifericos"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-emerald-400"
          >
            Periféricos
          </Link>
          <Link
            href="/#audio-hi-fi"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-emerald-400"
          >
            Audio Hi-Fi
          </Link>
        </div>
      )}
    </header>
  );
}
