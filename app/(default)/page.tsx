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
import { SecurityBadge } from "@/components/security-badge";
import { useDonation } from "@/hooks/use-donation";
import { PAYMENT_METHODS } from "@/data/donation-tiers";

export default function Home() {
  const [method, setMethod] = useState<"mobile" | "stripe" | "paypal">(
    "mobile"
  );
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  const {
    donationTiers,
    selectedTierIndex,
    setSelectedTierIndex,
    amount,
    setAmount,
    selectedTier,
  } = useDonation(0);

  if (!eventId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0d002f] to-[#00164c]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-xl bg-[#1a1a4a]/30 backdrop-blur-sm border border-[#FF0099]/10 shadow-xl"
        >
          <h1 className="text-2xl font-bold text-white text-center mb-6">
            Aucun événement sélectionné
          </h1>
          <p className="text-gray-300 mb-8 text-center">
            Veuillez accéder à cette page depuis un événement valide.
          </p>
          <Button
            onClick={() =>
              signOut({ redirect: true, callbackUrl: "/auth/login" })
            }
            className="w-full bg-gradient-to-r from-[#FF0099] to-[#FF0099]/80 hover:from-[#FF0099]/90 hover:to-[#FF0099]/70 font-semibold text-white transition-all duration-300 py-6"
          >
            Déconnexion
          </Button>
        </motion.div>
        <SecurityBadge />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d002f] to-[#00164c] py-6 px-3 sm:py-8 sm:px-6 md:py-12 md:px-8 lg:py-16 lg:px-12 flex items-center justify-center">

      <Card className="w-full max-w-7xl bg-gradient-to-br from-[#0d002f] to-[#00164c] border-[#FF0099]/20 backdrop-blur-sm shadow-2xl relative overflow-hidden">
        {/* Bordure supérieure décorative */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF0099] to-transparent"></div>

        <CardHeader className="pb-2 pt-8 px-6 md:px-10">
          <CardTitle className="text-3xl md:text-4xl mt-5 font-bold text-center text-white">
            Choisissez votre niveau de soutien
          </CardTitle> <br/>
          <p className="text-center text-gray-300 max-w-2xl mx-auto">
            Votre contribution aide à créer une expérience exceptionnelle pour
            tous les participants
          </p>
        </CardHeader>

        <CardContent className="space-y-10 px-4 sm:px-6 md:px-10 lg:px-14 pb-10">
          {/* Niveaux de donation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TierSelector
              tiers={donationTiers}
              selectedTierIndex={selectedTierIndex}
              onSelectTier={setSelectedTierIndex}
              amount={amount}
              onAmountChange={setAmount}
            />
          </motion.div>

          {/* Détails du niveau sélectionné */}
          {selectedTier && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TierDetails tier={selectedTier} />
            </motion.div>
          )}

          {/* Méthodes de paiement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <PaymentTabs
              methods={PAYMENT_METHODS}
              selectedMethod={method}
              onSelectMethod={setMethod}
              eventId={eventId}
              amount={amount}
            />
          </motion.div>
        </CardContent>
      </Card>

      {/* Badge de sécurité Comodo */}
      <SecurityBadge />
    </div>
  );
}
