"use client";

import { useState, useEffect, useCallback } from "react";
import { DONATION_TIERS } from "@/data/donation-tiers";
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
      if (tier.isCustom) {
        // Pour le niveau personnalisé, utiliser le montant personnalisé
        setAmount(customAmount);
      } else {
        // Pour les autres niveaux, utiliser le montant minimum du niveau
        setAmount(tier.minAmount);
      }
    }
  }, [selectedTierIndex, customAmount]);

  // Fonction pour mettre à jour le montant
  const handleAmountChange = useCallback(
    (newAmount: number) => {
      const minAmount = 1;
      const validAmount = Math.max(minAmount, newAmount);
      // Met à jour le montant personnalisé si le niveau sélectionné est "Custom"
      if (DONATION_TIERS[selectedTierIndex]?.isCustom) {
        setCustomAmount(validAmount);
      } else {
        // Sinon, vérifier si le nouveau montant correspond à un niveau
        let newTierIndex = null;

        // Si le montant est inférieur au premier niveau non-personnalisé, sélectionner le niveau personnalisé
        if (validAmount < DONATION_TIERS[1].minAmount) {
          newTierIndex = 0;
          setCustomAmount(validAmount);
        } else {
          // Sinon, chercher le niveau approprié
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
      }
    },
    [selectedTierIndex, setSelectedTierIndex]
  );

  return {
    donationTiers: DONATION_TIERS,
    selectedTierIndex,
    setSelectedTierIndex,
    amount,
    setAmount: handleAmountChange,
    customAmount,
    setCustomAmount,
    selectedTier: getCurrentTier(),
  };
}
