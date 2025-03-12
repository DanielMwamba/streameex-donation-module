/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { type FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { createStripeIdSession } from "@/services/stripe";
import { Button } from "@/components/ui/button";
import { CreditCard, Shield, AlertCircle } from "lucide-react";
import { PaymentFormProps } from "@/types/donations";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);


export default function StripeForm({
  eventId,
  initialAmount = 10,
}: PaymentFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(initialAmount);
  const { data: session } = useSession();

  useEffect(() => {
    setAmount(initialAmount);
  }, [initialAmount]);

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="bg-gradient-to-br from-[#0d002f]/70 to-[#1a0046]/70 p-5 rounded-lg mb-4 border border-[#FF0099]/30 shadow-md">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">Montant à payer:</span>
            <span className="text-[#FF0099] font-bold text-2xl">
              {initialAmount}$
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0d002f]/70 to-[#1a0046]/70 p-5 rounded-lg border border-[#FF0099]/30 shadow-md">
          <div className="flex items-center text-gray-300 mb-3">
            <CreditCard className="w-5 h-5 mr-2 text-[#FF0099]" />
            <span className="font-medium">Paiement par carte bancaire</span>
          </div>

          <div className="flex items-start space-x-2 text-sm text-gray-400">
            <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              Votre paiement est sécurisé. Vous serez redirigé vers la
              plateforme de paiement Stripe pour finaliser votre transaction en
              toute sécurité.
            </span>
          </div>

          <div className="flex items-start space-x-2 text-sm text-gray-400 mt-3">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              Aucune information de carte bancaire n&apos;est stockée sur notre
              site.
            </span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#FF0099] to-[#FF0099]/80 hover:from-[#FF0099]/90 hover:to-[#FF0099]/70 h-12 text-lg font-semibold mt-4 shadow-lg shadow-[#FF0099]/20 transition-all duration-300"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Préparation du paiement...
            </div>
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Payer avec Carte
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
