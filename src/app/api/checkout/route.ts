import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { CartItem, ShippingInfo } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customer, shippingCOP, discountPercent = 0 } = body as {
      items: CartItem[];
      customer: ShippingInfo;
      shippingCOP: number;
      discountPercent?: number;
    };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "El carrito está vacío." },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe Secret Key no está configurada en las variables de entorno." },
        { status: 500 }
      );
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const discountFactor = discountPercent > 0 ? (100 - Math.min(discountPercent, 50)) / 100 : 1;

    // Build line items for Stripe Checkout (COP has 2 decimals in Stripe, multiply by 100)
    const line_items: any[] = items.map((item) => ({
      price_data: {
        currency: "cop",
        product_data: {
          name: item.product.name + (discountPercent > 0 ? ` (${discountPercent}% OFF)` : ""),
          images: item.product.images.slice(0, 1),
          description: item.product.short_description || undefined,
        },
        unit_amount: Math.round(item.product.price_cop * discountFactor * 100),
      },
      quantity: item.quantity,
    }));

    // Add shipping as line item if not free
    if (shippingCOP && shippingCOP > 0) {
      line_items.push({
        price_data: {
          currency: "cop",
          product_data: {
            name: "Envío Nacional Asegurado (Colombia)",
            description: "Despacho express asegurado a domicilio",
          },
          unit_amount: Math.round(shippingCOP * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: customer.email,
      metadata: {
        customer_name: customer.fullName,
        customer_phone: customer.phone,
        shipping_address: `${customer.address}, ${customer.city}, ${customer.department}`,
        shipping_department: customer.department,
        shipping_city: customer.city,
        discount_applied: discountPercent > 0 ? `${discountPercent}%` : "none",
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=true`,
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (error: any) {
    console.error("Error creating Stripe checkout session:", error);
    return NextResponse.json(
      { error: error?.message || "Error al procesar el pago con Stripe." },
      { status: 500 }
    );
  }
}
