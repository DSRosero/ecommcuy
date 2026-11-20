"use client";

import React, { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowLeft, ShieldCheck, Truck, MessageCircle } from "lucide-react";
import { useCart } from "@/context/cart-context";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart once checkout is successfully completed
    clearCart();
  }, [clearCart]);

  const displayId = sessionId ? `STRIPE-${sessionId.slice(-8).toUpperCase()}` : "EC-CONFIRMADO";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
        <CheckCircle2 className="h-8 w-8" />
      </div>

      <span className="mt-4 inline-block rounded-full bg-emerald-50 px-3 py-1 font-mono text-xs font-semibold text-emerald-700 border border-emerald-200">
        Pago Confirmado por Stripe
      </span>

      <h1 className="mt-2 text-3xl font-bold text-zinc-950 sm:text-4xl">
        ¡Pago Recibido con Éxito!
      </h1>

      <p className="mt-2 text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
        Tu transacción ha sido procesada de forma segura por Stripe. Hemos enviado el comprobante a tu correo electrónico.
      </p>

      {/* Details Card */}
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 text-left space-y-2.5 font-mono text-xs max-w-sm mx-auto shadow-xs">
        <div className="flex justify-between border-b border-zinc-100 pb-2">
          <span className="text-zinc-500">Referencia de Orden:</span>
          <span className="font-bold text-zinc-900">{displayId}</span>
        </div>
        <div className="flex justify-between border-b border-zinc-100 pb-2">
          <span className="text-zinc-500">Pasarela:</span>
          <span className="font-bold text-zinc-800">Stripe Payments (SSL 256-bit)</span>
        </div>
        <div className="flex justify-between border-b border-zinc-100 pb-2">
          <span className="text-zinc-500">Estado:</span>
          <span className="text-emerald-600 font-semibold">Pagado / Preparando Despacho</span>
        </div>
        <div className="flex justify-between text-zinc-500 pt-1">
          <span>Tiempo de Entrega:</span>
          <span className="text-zinc-800">24 a 48 horas hábiles</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al Catálogo</span>
        </Link>

        <a
          href={`https://wa.me/573166420844?text=${encodeURIComponent(
            `Hola EcommCuy, acabo de realizar mi compra por Stripe con la referencia ${displayId}. Quisiera coordinar el envío.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors shadow-2xs"
        >
          <MessageCircle className="h-4 w-4 text-emerald-600" />
          <span>Notificar por WhatsApp</span>
        </a>
      </div>

      {/* Trust Badges */}
      <div className="mt-10 grid grid-cols-2 gap-4 text-xs text-zinc-500 max-w-md mx-auto pt-6 border-t border-zinc-200">
        <div className="flex items-center justify-center gap-2">
          <Truck className="h-4 w-4 text-zinc-700" />
          <span>Envío asegurado nacional</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Garantía de 12 meses</span>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-zinc-500">Cargando confirmación...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
