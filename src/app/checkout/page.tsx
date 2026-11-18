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
  Building,
  Smartphone,
  ExternalLink,
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
    paymentMethod: "mercadopago",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState<{
    orderId: string;
    total: number;
    email: string;
    paymentMethod: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    // Simulate order placement / payment gateway token generation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const generatedOrderId = `EC-${Math.floor(100000 + Math.random() * 900000)}`;

    setOrderCompleted({
      orderId: generatedOrderId,
      total: totalCOP,
      email: formData.email,
      paymentMethod:
        formData.paymentMethod === "mercadopago"
          ? "Mercado Pago (PSE / Tarjetas / Efecty)"
          : formData.paymentMethod === "wompi"
          ? "Wompi (Bancolombia / Nequi)"
          : "Transferencia Directa Bancaria",
    });

    clearCart();
    setIsSubmitting(false);
  };

  // If order complete screen
  if (orderCompleted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <span className="mt-6 inline-block rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
          ¡Orden Registrada con Éxito!
        </span>

        <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
          Gracias por tu compra en EcommCuy
        </h1>

        <p className="mt-3 text-sm text-zinc-400 max-w-lg mx-auto">
          Hemos enviado un correo de confirmación a{" "}
          <strong className="text-zinc-200">{orderCompleted.email}</strong> con los detalles del envío y número de guía.
        </p>

        {/* Order Card details */}
        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 text-left space-y-3 font-mono text-sm max-w-md mx-auto">
          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">ID de Orden:</span>
            <span className="font-bold text-white">{orderCompleted.orderId}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">Total Facturado:</span>
            <span className="font-bold text-emerald-400">
              {formatCOP(orderCompleted.total)}
            </span>
          </div>
          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">Medio de Pago:</span>
            <span className="text-zinc-300 text-xs text-right">
              {orderCompleted.paymentMethod}
            </span>
          </div>
          <div className="flex justify-between text-xs text-zinc-400 pt-1">
            <span>Estado:</span>
            <span className="text-emerald-400 font-semibold">Procesando despacho</span>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-bold text-zinc-950 transition-all hover:brightness-110"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a la Tienda</span>
          </Link>
        </div>
      </div>
    );
  }

  // If cart empty
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-white">No tienes productos en el carrito</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Para realizar un pedido, primero agrega productos desde nuestro catálogo.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Ver Catálogo</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Continuar explorando productos</span>
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left: Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
            <h1 className="text-2xl font-extrabold text-white">Detalles del Envío</h1>
            <p className="mt-1 text-xs text-zinc-400">
              Ingresa los datos para la entrega de tu paquete en Colombia.
            </p>

            <form onSubmit={handleSubmitOrder} className="mt-6 space-y-6">
              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  1. Información de Contacto
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300">
                      Nombre y Apellidos *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Ej: Daniel Gómez"
                      className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300">
                      Teléfono Celular *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Ej: 300 123 4567"
                      className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="daniel@ejemplo.com"
                    className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                  />
                  <p className="mt-1 text-[11px] text-zinc-500">
                    Aquí recibirás la factura electrónica y el tracking de la transportadora.
                  </p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  2. Dirección de Entrega en Colombia
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300">
                      Departamento *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    >
                      {COLOMBIAN_DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300">
                      Ciudad o Municipio *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Ej: Bogotá, Medellín, Cali..."
                      className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300">
                    Dirección Completa *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Calle, Carrera, Avenida, Número de puerta"
                    className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300">
                    Edificio, Apartamento u Oficina (Opcional)
                  </label>
                  <input
                    type="text"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Ej: Edificio Quantum, Torre 2, Apto 402"
                    className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Gateway Options */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  3. Pasarela de Pago
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Mercado Pago */}
                  <label
                    className={`relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
                      formData.paymentMethod === "mercadopago"
                        ? "border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/5"
                        : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mercadopago"
                      checked={formData.paymentMethod === "mercadopago"}
                      onChange={handleChange}
                      className="mt-1 text-emerald-500 focus:ring-emerald-400"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white">Mercado Pago</span>
                      </div>
                      <p className="mt-1 text-[11px] text-zinc-400">
                        PSE, Tarjetas crédito/débito, Efecty. Menor comisión en Colombia.
                      </p>
                    </div>
                  </label>

                  {/* Wompi Bancolombia */}
                  <label
                    className={`relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
                      formData.paymentMethod === "wompi"
                        ? "border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/5"
                        : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wompi"
                      checked={formData.paymentMethod === "wompi"}
                      onChange={handleChange}
                      className="mt-1 text-emerald-500 focus:ring-emerald-400"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-cyan-400" />
                        <span className="text-xs font-bold text-white">Wompi / Bancolombia</span>
                      </div>
                      <p className="mt-1 text-[11px] text-zinc-400">
                        Botón Bancolombia, Nequi y transferencias directas sin fricción.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-4 text-sm font-bold text-zinc-950 shadow-xl shadow-emerald-500/20 transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
                >
                  <Lock className="h-4 w-4" />
                  <span>
                    {isSubmitting
                      ? "Procesando pago seguro..."
                      : `Confirmar y Pagar ${formatCOP(totalCOP)} COP`}
                  </span>
                </button>
                <div className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-zinc-500">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Transacción encriptada SSL 256-bit certificada por la pasarela</span>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
            <h2 className="text-base font-bold text-white">Resumen del Pedido</h2>
            <p className="text-xs text-zinc-400">{items.length} artículos en tu carrito</p>

            {/* List */}
            <div className="mt-6 max-h-72 overflow-y-auto space-y-3 pr-1">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-2.5"
                >
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium text-white truncate">{product.name}</h4>
                    <span className="text-[11px] text-zinc-400">Cant: {quantity}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {formatCOP(product.price_cop * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 space-y-2 border-t border-zinc-800 pt-4 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-200">{formatCOP(subtotalCOP)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Envío asegurado nacional</span>
                <span className="font-mono text-zinc-200">
                  {shippingCOP === 0 ? (
                    <span className="text-emerald-400 font-semibold">GRATIS</span>
                  ) : (
                    formatCOP(shippingCOP)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>IVA (19% incluido)</span>
                <span className="font-mono text-zinc-200">
                  {formatCOP(Math.round(subtotalCOP * 0.19))}
                </span>
              </div>
              <div className="border-t border-zinc-800 pt-3 flex justify-between text-base font-bold text-white">
                <span>Total a Pagar</span>
                <span className="font-mono text-lg text-emerald-400">
                  {formatCOP(totalCOP)}
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>Despacho con Servientrega / Coordinadora / Envia</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span>Garantía de satisfacción y soporte técnico 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
