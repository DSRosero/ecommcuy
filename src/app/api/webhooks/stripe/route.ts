import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: any;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // In development / test without webhook secret set
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Stripe Checkout Completed for Session:", session.id);
    console.log("Customer email:", session.customer_details?.email || session.customer_email);
    console.log("Amount total (COP):", (session.amount_total || 0) / 100);
    console.log("Metadata:", session.metadata);

    // Here we can save or update the order in Supabase
    try {
      const supabase = createClient();
      await supabase.from("orders").insert({
        id: `STRIPE-${session.id.slice(-8).toUpperCase()}`,
        customer_name: session.metadata?.customer_name || session.customer_details?.name || "Cliente",
        customer_email: session.customer_details?.email || session.customer_email || "",
        customer_phone: session.metadata?.customer_phone || "",
        shipping_address: session.metadata?.shipping_address || "",
        shipping_city: session.metadata?.shipping_city || "",
        shipping_department: session.metadata?.shipping_department || "",
        total_cop: Math.round((session.amount_total || 0) / 100),
        status: "paid",
        payment_method: "Stripe (Card / Apple Pay / Google Pay)",
        payment_id: session.payment_intent || session.id,
      });
    } catch (dbError) {
      console.warn("Could not write order directly to Supabase from webhook:", dbError);
    }
  }

  return NextResponse.json({ received: true });
}
