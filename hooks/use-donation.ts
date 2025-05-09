"use client";

import { useState, useEffect, useCallback } from "react";
import { DONATION_TIERS } from "@/data/data";
import type { DonationTier } from "@/types/donations";

export function useDonation(initialTierIndex: number = 0) {
  const [selectedTierIndex, setSelectedTierIndex] =
    useState<number>(initialTierIndex);
  const [amount, setAmount] = useState<number>(
    initialTierIndex !== null ? DONATION_TIERS[initialTierIndex].minAmount : 5
  );
  const [customAmount, setCustomAmount] = useState<number>(1);

  const getCurrentTier = useCallback((): DonationTier | null => {
    return selectedTierIndex !== null
      ? DONATION_TIERS[selectedTierIndex]
      : null;
  }, [selectedTierIndex]);

  // Met à jour le montant selon le niveau sélectionné ou personnalisé
  useEffect(() => {
    if (selectedTierIndex !== null) {
      const tier = DONATION_TIERS[selectedTierIndex];
      setAmount(tier.isCustom ? customAmount : tier.minAmount);
    }
  }, [selectedTierIndex, customAmount]);

  const handleAmountChange = useCallback(
    (newAmount: number) => {
      const minAmount = 1;
      const validAmount = Math.max(minAmount, newAmount);

      if (DONATION_TIERS[selectedTierIndex]?.isCustom) {
        setCustomAmount(validAmount);
        return validAmount;
      }

      let newTierIndex = null;

      // Si le montant est inférieur au premier niveau non-personnalisé
      if (validAmount < DONATION_TIERS[1].minAmount) {
        newTierIndex = 0;
        setCustomAmount(validAmount);
      } else {
        // Chercher le niveau approprié
        for (let i = DONATION_TIERS.length - 1; i >= 1; i--) {
          if (validAmount >= DONATION_TIERS[i].minAmount) {
            newTierIndex = i;
            break;
          }
        }
      }

      if (newTierIndex !== null && newTierIndex !== selectedTierIndex) {
        setSelectedTierIndex(newTierIndex);
      } else {
        setAmount(validAmount);
      }

      return validAmount;
    },
    [selectedTierIndex]
  );

  return {
    donationTiers: DONATION_TIERS,
    selectedTierIndex,
    setSelectedTierIndex,
    amount,
    amountChange: handleAmountChange,
    customAmount,
    setCustomAmount,
    selectedTier: getCurrentTier(),
  };
}
