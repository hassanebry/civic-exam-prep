import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  console.log("[checkout] called, env check:", {
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    hasPriceId: !!process.env.STRIPE_PRICE_ID,
  });

  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID) {
      return NextResponse.json(
        { error: "Stripe env vars not configured" },
        { status: 500 },
      );
    }

    // Dynamic import so the module-level Stripe client isn't created
    // when env vars are missing (which throws before we can catch)
    const { stripe, STRIPE_PRICE_ID } = await import("@/lib/stripe");

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 },
      );
    }

    const origin = request.headers.get("origin") ?? "http://localhost:3000";

    // Parse optional referrer from body
    let referrer: string | null = null;
    try {
      const body = (await request.json()) as { referrer?: string };
      referrer = body.referrer ?? null;
    } catch {
      // No body or invalid JSON — that's fine
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      allow_promotion_codes: true,
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${origin}/dashboard?success=true`,
      cancel_url: `${origin}/dashboard?canceled=true`,
      metadata: { user_id: user.id, referrer: referrer ?? "" },
      customer_email: user.email,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
