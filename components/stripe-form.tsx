/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { type FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import { createStripeIdSession } from "@/services/stripe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

export default function StripeForm({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(10);
  const { data: session } = useSession();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const sessionId = await createStripeIdSession({
      userId: (session?.user as any).id,
      eventId,
      redirectUrl: window.location.href,
      unitAmount: amount,
      currency: "usd",
    });
    if (sessionId) {
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-white">
            Montant (USD)
          </Label>
          <Input
            required
            min={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            type="number"
            id="amount"
            className="bg-[#fff] text-black border-[#FF0099]/20 focus:border-[#FF0099]"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full font-semibold bg-[#FF0099] hover:bg-[#FF0099]/80"
        >
          {loading ? "En cours..." : "Payer avec Stripe"}
        </Button>
      </form>
    </div>
  );
}
