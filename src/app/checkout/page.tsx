"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  ArrowLeft,
  CheckCircle2,
  Lock,
  CreditCard,
  Smartphone,
  Zap,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatCOP } from "@/lib/utils";

const COLOMBIAN_DEPARTMENTS = [
  "Bogotá D.C.",
  "Antioquia",
  "Valle del Cauca",
  "Cundinamarca",
  "Atlántico",
  "Santander",
  "Bolívar",
  "Risaralda",
  "Caldas",
  "Tolima",
  "Meta",
  "Nariño",
  "Boyacá",
  "Norte de Santander",
  "Huila",
  "Quindío",
  "Otro",
];

export default function CheckoutPage() {
  const { items, subtotalCOP, shippingCOP, totalCOP, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    additionalInfo: "",
    city: "Bogotá",
    department: "Bogotá D.C.",
    paymentMethod: "stripe",
    notes: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderCompleted, setOrderCompleted] = useState<{
    orderId: string;
    total: number;
    email: string;
    paymentMethod: string;
  } | null>(null);

  const discountAmount = appliedCoupon ? Math.round(subtotalCOP * (appliedCoupon.percent / 100)) : 0;
  const finalTotalCOP = Math.max(0, totalCOP - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === "ECOMMCUY10" || cleanCode === "PROMO2026" || cleanCode === "COLOMBIA10") {
      setAppliedCoupon({ code: cleanCode, percent: 10 });
      setCouponCode("");
    } else {
      setCouponError("Cupón no válido o expirado. Prueba con ECOMMCUY10");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    // If Stripe selected, redirect to Stripe Hosted Checkout
    if (formData.paymentMethod === "stripe") {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items,
            customer: formData,
            shippingCOP,
            discountPercent: appliedCoupon?.percent || 0,
          }),
        });

        const data = await res.json();

        if (data.url) {
          window.location.href = data.url;
          return;
        } else {
          setErrorMessage(data.error || "No se pudo iniciar el checkout con Stripe.");
          setIsSubmitting(false);
          return;
        }
      } catch (err: any) {
        setErrorMessage(err?.message || "Error al conectar con la pasarela Stripe.");
        setIsSubmitting(false);
        return;
      }
    }

    // Fallback simulated order for manual methods
    await new Promise((resolve) => setTimeout(resolve, 1400));
    const generatedOrderId = `EC-${Math.floor(100000 + Math.random() * 900000)}`;

    setOrderCompleted({
      orderId: generatedOrderId,
      total: finalTotalCOP,
      email: formData.email,
      paymentMethod:
        formData.paymentMethod === "mercadopago"
          ? "Mercado Pago (PSE / Tarjetas / Efecty)"
          : "Wompi (Bancolombia / Nequi)",
    });

    clearCart();
    setIsSubmitting(false);
  };

  if (orderCompleted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <span className="mt-4 inline-block rounded-full bg-zinc-100 px-3 py-1 font-mono text-xs font-semibold text-zinc-700">
          Pedido Confirmado
        </span>

        <h1 className="mt-2 text-3xl font-bold text-zinc-950 sm:text-4xl">
          ¡Gracias por tu compra!
        </h1>

        <p className="mt-2 text-sm text-zinc-600 max-w-md mx-auto">
          Enviamos el comprobante y número de guía a <strong className="text-zinc-900">{orderCompleted.email}</strong>.
        </p>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 text-left space-y-2.5 font-mono text-xs max-w-sm mx-auto shadow-xs">
          <div className="flex justify-between border-b border-zinc-100 pb-2">
            <span className="text-zinc-500">ID de Orden:</span>
            <span className="font-bold text-zinc-900">{orderCompleted.orderId}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-100 pb-2">
            <span className="text-zinc-500">Total Facturado:</span>
            <span className="font-bold text-zinc-900">
              {formatCOP(orderCompleted.total)}
            </span>
          </div>
          <div className="flex justify-between text-zinc-500">
            <span>Medio:</span>
            <span className="text-zinc-800 text-right">{orderCompleted.paymentMethod}</span>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al Catálogo</span>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-zinc-900">Tu carrito está vacío</h2>
        <p className="mt-1 text-xs text-zinc-500">
          Agrega productos para proceder al pago.
        </p>
        <div className="mt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Ver Catálogo</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Volver a la tienda</span>
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs">
            <h1 className="text-xl font-bold text-zinc-950">Datos de Entrega & Facturación</h1>
            <p className="mt-0.5 text-xs text-zinc-500">
              Despachos asegurados a nivel nacional. Pago seguro procesado por Stripe.
            </p>

            {errorMessage && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmitOrder} className="mt-6 space-y-5">
              {/* Contact */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-semibold uppercase text-zinc-400">
                  1. Contacto
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700">
                      Nombre y Apellidos *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Daniel Rosero"
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 focus:border-zinc-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700">
                      Teléfono Celular *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="316 642 0844"
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 focus:border-zinc-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="daniel@ejemplo.com"
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 focus:border-zinc-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Shipping */}
              <div className="space-y-3 pt-3 border-t border-zinc-100">
                <h3 className="text-xs font-mono font-semibold uppercase text-zinc-400">
                  2. Dirección en Colombia
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700">
                      Departamento *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 focus:border-zinc-400 focus:outline-none"
                    >
                      {COLOMBIAN_DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700">
                      Ciudad / Municipio *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Bogotá, Medellín, etc."
                      className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 focus:border-zinc-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700">
                    Dirección de Residencia / Trabajo *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Calle, Carrera, Transversal y Número"
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 focus:border-zinc-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700">
                    Apartamento, Torre u Oficina (Opcional)
                  </label>
                  <input
                    type="text"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Apto 302, Torre 1"
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 focus:border-zinc-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3 pt-3 border-t border-zinc-100">
                <h3 className="text-xs font-mono font-semibold uppercase text-zinc-400">
                  3. Pasarela de Pago
                </h3>

                <div className="space-y-2.5">
                  {/* Stripe Card / Apple Pay / Google Pay */}
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
                      formData.paymentMethod === "stripe"
                        ? "border-zinc-950 bg-zinc-50/90 shadow-xs ring-1 ring-zinc-950"
                        : "border-zinc-200 bg-white hover:border-zinc-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="stripe"
                      checked={formData.paymentMethod === "stripe"}
                      onChange={handleChange}
                      className="mt-1 text-zinc-950"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs font-bold text-zinc-950">
                            Stripe Checkout (Tarjetas, Apple Pay & Google Pay)
                          </span>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                          Recomendado
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-zinc-500 leading-relaxed">
                        Pago seguro internacional e instantáneo. Acepta Visa, Mastercard, American Express, Apple Pay y Link con cifrado bancario.
                      </p>
                    </div>
                  </label>

                  {/* Other options */}
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <label
                      className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 transition-all ${
                        formData.paymentMethod === "mercadopago"
                          ? "border-zinc-900 bg-zinc-50/80 shadow-2xs"
                          : "border-zinc-200 bg-white hover:border-zinc-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mercadopago"
                        checked={formData.paymentMethod === "mercadopago"}
                        onChange={handleChange}
                        className="mt-1 text-zinc-900"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <CreditCard className="h-4 w-4 text-zinc-800" />
                          <span className="text-xs font-bold text-zinc-900">Mercado Pago</span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-zinc-500">
                          PSE, Tarjetas locales y Efecty.
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 transition-all ${
                        formData.paymentMethod === "wompi"
                          ? "border-zinc-900 bg-zinc-50/80 shadow-2xs"
                          : "border-zinc-200 bg-white hover:border-zinc-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="wompi"
                        checked={formData.paymentMethod === "wompi"}
                        onChange={handleChange}
                        className="mt-1 text-zinc-900"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Smartphone className="h-4 w-4 text-zinc-800" />
                          <span className="text-xs font-bold text-zinc-900">Wompi / Bancolombia</span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-zinc-500">
                          Botón Bancolombia y Nequi.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3.5 text-xs font-bold text-white shadow-xs hover:bg-zinc-800 active:scale-[0.99] disabled:opacity-50 transition-all"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>
                    {isSubmitting
                      ? "Redirigiendo a Stripe..."
                      : `Pagar ${formatCOP(finalTotalCOP)} COP con Stripe`}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
            <h2 className="text-sm font-bold text-zinc-900">Resumen del Pedido</h2>
            <p className="text-xs text-zinc-500">{items.length} artículos</p>

            <div className="mt-4 max-h-60 overflow-y-auto space-y-2 pr-1">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-2.5 rounded-lg border border-zinc-100 bg-zinc-50 p-2"
                >
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-zinc-200 bg-white">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium text-zinc-900 truncate">{product.name}</h4>
                    <span className="text-[11px] text-zinc-500">Cant: {quantity}</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-zinc-900">
                    {formatCOP(product.price_cop * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <div className="mt-4 border-t border-zinc-100 pt-3">
              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800 border border-emerald-200">
                  <span className="font-semibold">Cupón {appliedCoupon.code} (-{appliedCoupon.percent}%)</span>
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                  >
                    Quitar
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Código de cupón (Ej: ECOMMCUY10)"
                      className="flex-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-400 focus:outline-none uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-red-600">{couponError}</p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 space-y-1.5 border-t border-zinc-100 pt-3 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-900">{formatCOP(subtotalCOP)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Descuento ({appliedCoupon.percent}%)</span>
                  <span className="font-mono">-{formatCOP(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="font-mono text-zinc-900">
                  {shippingCOP === 0 ? "GRATIS" : formatCOP(shippingCOP)}
                </span>
              </div>
              <div className="border-t border-zinc-200 pt-2 flex justify-between text-sm font-bold text-zinc-950">
                <span>Total</span>
                <span className="font-mono text-base">{formatCOP(finalTotalCOP)}</span>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50/80 p-3 space-y-1.5 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5 text-zinc-700 font-semibold">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Garantía Stripe Certified</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Tus datos de tarjeta nunca tocan nuestros servidores. Todo el procesamiento se realiza en los servidores seguros certificados PCI Nivel 1 de Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
