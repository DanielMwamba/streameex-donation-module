"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TierSelector } from "@/components/donation/tier-selector";
import { TierDetails } from "@/components/donation/tier-details";
import { PaymentTabs } from "@/components/payment/payment-tabs";
import { useDonation } from "@/hooks/use-donation";
import { PAYMENT_METHODS } from "@/data/donation-tiers";

export default function Home() {
  const [method, setMethod] = useState<"mobile" | "stripe" | "paypal">(
    "mobile"
  );
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  const {
    tiers,
    selectedTierIndex,
    setSelectedTierIndex,
    amount,
    setAmount,
    selectedTier,
  } = useDonation(0);

  if (!eventId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#00164c]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={() =>
              signOut({ redirect: true, callbackUrl: "/auth/login" })
            }
            className="bg-[#FF0099] font-semibold text-white hover:bg-[#FF0099]/80 transition-colors"
          >
            Déconnexion
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d002f] to-[#00164c] p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <Card className="w-full max-w-6xl bg-[#00164c]/90 border-[#FF0099]/20 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-center text-white">
            Soutenez cet événement
          </CardTitle>
          <p className="text-center text-gray-300 mt-2">
            Votre contribution aide à créer une expérience exceptionnelle pour
            tous
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Niveaux de donation */}
          <TierSelector
            tiers={tiers}
            selectedTierIndex={selectedTierIndex}
            onSelectTier={setSelectedTierIndex}
            amount={amount}
            onAmountChange={setAmount}
          />

          {/* Détails du niveau sélectionné */}
          {selectedTier && <TierDetails tier={selectedTier} />}

          {/* Méthodes de paiement */}
          <PaymentTabs
            methods={PAYMENT_METHODS}
            selectedMethod={method}
            onSelectMethod={setMethod}
            eventId={eventId}
            amount={amount}
          />
        </CardContent>
      </Card>
    </div>
  );
}
