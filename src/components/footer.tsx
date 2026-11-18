import React from "react";
import Link from "next/link";
import { Cpu, ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      {/* Value Proposition Highlights */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/20 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-100">Envíos Asegurados</h4>
                <p className="text-xs text-zinc-400">Cobertura total en toda Colombia</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-100">Garantía Directa</h4>
                <p className="text-xs text-zinc-400">12 meses en hardware premium</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <RotateCcw className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-100">Devolución Fácil</h4>
                <p className="text-xs text-zinc-400">30 días de satisfacción total</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-100">Pagos Seguros en COP</h4>
                <p className="text-xs text-zinc-400">PSE, Tarjetas, Nequi y Efecty</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-zinc-950 font-bold">
                <Cpu className="h-5 w-5" />
              </div>
              <span className="font-mono text-lg font-bold text-white">
                Ecomm<span className="text-emerald-400">Cuy</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-400">
              Tienda especializada en hardware de alto rendimiento, periféricos de precisión y tecnología para creadores, desarrolladores e ingenieros en Colombia.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sede de despacho: Bogotá D.C., Colombia</span>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h5 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Categorías
            </h5>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link href="/#laptops-pro" className="hover:text-emerald-400 transition-colors">
                  Laptops & Estaciones
                </Link>
              </li>
              <li>
                <Link href="/#perifericos" className="hover:text-emerald-400 transition-colors">
                  Periféricos & Teclados Custom
                </Link>
              </li>
              <li>
                <Link href="/#audio-hi-fi" className="hover:text-emerald-400 transition-colors">
                  Audio Hi-Fi & Acústica
                </Link>
              </li>
              <li>
                <Link href="/#monitores" className="hover:text-emerald-400 transition-colors">
                  Monitores QD-OLED & 4K
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h5 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Soporte & Guías
            </h5>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <a href="#contacto" className="hover:text-emerald-400 transition-colors">
                  Rastreo de Pedidos
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  Preguntas Frecuentes (FAQ)
                </a>
              </li>
              <li>
                <a href="#garantias" className="hover:text-emerald-400 transition-colors">
                  Políticas de Garantía
                </a>
              </li>
              <li>
                <a href="#envios" className="hover:text-emerald-400 transition-colors">
                  Tiempos de Entrega
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Badges & Trust */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Métodos de Pago Aceptados
            </h5>
            <p className="text-xs text-zinc-400">
              Transacciones procesadas mediante pasarelas certificadas PCI-DSS Nivel 1.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] font-mono font-medium text-zinc-300">
                PSE
              </span>
              <span className="rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] font-mono font-medium text-zinc-300">
                Visa / Mastercard
              </span>
              <span className="rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] font-mono font-medium text-zinc-300">
                Nequi / Daviplata
              </span>
              <span className="rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] font-mono font-medium text-zinc-300">
                Efecty
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800/80 pt-6 text-center text-xs text-zinc-400">
          <p>© 2026 EcommCuy Technologies Inc. Todos los derechos reservados. Desarrollado con Next.js, Supabase y Vercel.</p>
        </div>
      </div>
    </footer>
  );
}
