"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Cpu } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Cpu className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-lg font-black tracking-tight text-zinc-900">
                Ecomm<span className="text-emerald-600">Cuy</span>
              </span>
              <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600">
                COP
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600">
          <Link href="/#catalogo" className="transition-colors hover:text-zinc-900">
            Catálogo
          </Link>
          <Link href="/#catalogo" className="transition-colors hover:text-zinc-900">
            Laptops
          </Link>
          <Link href="/#catalogo" className="transition-colors hover:text-zinc-900">
            Componentes & GPUs
          </Link>
          <Link href="/#catalogo" className="transition-colors hover:text-zinc-900">
            Monitores
          </Link>
          <Link href="/#catalogo" className="transition-colors hover:text-zinc-900">
            Teclados & Audio
          </Link>
          <Link href="/#catalogo" className="transition-colors hover:text-zinc-900">
            Drones
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 text-xs font-semibold text-zinc-800 shadow-xs transition-all hover:border-zinc-300 hover:bg-zinc-50"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="h-4 w-4 text-zinc-700" />
            <span>Carrito</span>
            {totalItems > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-zinc-900 px-1.5 text-[11px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white md:hidden text-zinc-700 hover:bg-zinc-50"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-200 bg-white px-6 py-4 md:hidden space-y-3 text-sm font-medium text-zinc-700">
          <Link
            href="/#catalogo"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-emerald-600"
          >
            Catálogo
          </Link>
          <Link
            href="/#laptops-pro"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-emerald-600"
          >
            Laptops
          </Link>
          <Link
            href="/#perifericos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-emerald-600"
          >
            Periféricos
          </Link>
          <Link
            href="/#audio-hi-fi"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-emerald-600"
          >
            Audio
          </Link>
        </div>
      )}
    </header>
  );
}
