import React from "react";
import Link from "next/link";
import { Cpu, ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white text-zinc-600">
      {/* Value Badges */}
      <div className="border-b border-zinc-100 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800">
                <Truck className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900">Envíos Asegurados</h4>
                <p className="text-[11px] text-zinc-500">Cobertura en toda Colombia</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900">Garantía Directa</h4>
                <p className="text-[11px] text-zinc-500">12 meses en hardware</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800">
                <RotateCcw className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900">Satisfacción Total</h4>
                <p className="text-[11px] text-zinc-500">30 días de acompañamiento</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900">Pagos Seguros en COP</h4>
                <p className="text-[11px] text-zinc-500">PSE, Tarjetas y Nequi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white font-bold">
                <Cpu className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="font-mono text-base font-bold text-zinc-900">
                Ecomm<span className="text-emerald-600">Cuy</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Equipos de alto desempeño y periféricos profesionales en Colombia.
            </p>
          </div>

          <div>
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900">
              Categorías
            </h5>
            <ul className="mt-3 space-y-1.5 text-xs text-zinc-500">
              <li>
                <Link href="/#laptops-pro" className="hover:text-zinc-900">
                  Laptops & Estaciones
                </Link>
              </li>
              <li>
                <Link href="/#perifericos" className="hover:text-zinc-900">
                  Periféricos
                </Link>
              </li>
              <li>
                <Link href="/#audio-hi-fi" className="hover:text-zinc-900">
                  Audio Hi-Fi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900">
              Soporte
            </h5>
            <ul className="mt-3 space-y-1.5 text-xs text-zinc-500">
              <li>
                <a href="#" className="hover:text-zinc-900">
                  Garantías y Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-900">
                  Tiempos de Entrega
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-900">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900">
              Medios Aceptados
            </h5>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="rounded border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-mono text-zinc-700">
                PSE
              </span>
              <span className="rounded border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-mono text-zinc-700">
                Visa / Master
              </span>
              <span className="rounded border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-mono text-zinc-700">
                Nequi
              </span>
              <span className="rounded border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-mono text-zinc-700">
                Bancolombia
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-100 pt-6 text-center text-xs text-zinc-400">
          <p>© 2026 EcommCuy. Desarrollado con Next.js, Supabase y Vercel.</p>
        </div>
      </div>
    </footer>
  );
}
