"use client";

import { motion } from "framer-motion";
import type { DonationTier } from "@/types/donations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { DynamicIcon } from "../ui/dynamic-icon";

interface TierSelectorProps {
  tiers: DonationTier[];
  selectedTierIndex: number;
  onSelectTier: (index: number) => void;
  amount: number;
  onAmountChange: (amount: number) => void;
}

export function TierSelector({
  tiers,
  selectedTierIndex,
  onSelectTier,
  amount,
  onAmountChange,
}: TierSelectorProps) {
  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value));
    onAmountChange(value);
  };

  if (!tiers.length) {
    return (
      <div className="text-center py-8 text-gray-400">
        Aucun niveau de donation disponible
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <div
        role="radiogroup"
        aria-label="Niveaux de donation"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {tiers.map((tier, index) => (
          <TierCard
            key={tier.id}
            tier={tier}
            isSelected={selectedTierIndex === index}
            amount={amount}
            onSelect={() => onSelectTier(index)}
            onAmountChange={tier.isCustom ? handleCustomInput : undefined}
          />
        ))}
      </div>
    </div>
  );
}

interface TierCardProps {
  tier: DonationTier;
  isSelected: boolean;
  amount: number;
  onSelect: () => void;
  onAmountChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TierCard({
  tier,
  isSelected,
  amount,
  onSelect,
  onAmountChange,
}: TierCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "relative rounded-xl border-2 overflow-hidden transition-all",
        isSelected
          ? "border-[#FF0099] shadow-lg shadow-[#FF0099]/20"
          : "border-transparent hover:border-[#FF0099]/30"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-20",
          tier.isCustom
            ? "bg-gradient-to-br from-gray-400 to-gray-600"
            : tier.color
        )}
      />

      <button
        onClick={onSelect}
        aria-label={`Sélectionner ${tier.name}`}
        aria-checked={isSelected}
        role="radio"
        className="relative w-full h-full rounded-xl p-4 sm:p-6 bg-[#1a1a4a]/80 backdrop-blur-sm flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0099]"
      >
        {isSelected && (
          <div className="absolute top-3 right-3 bg-[#FF0099] text-white rounded-full p-1">
            <CheckIcon className="h-4 w-4" />
          </div>
        )}

        <div className="flex flex-col items-center space-y-4 w-full">
          <TierIcon tier={tier} />

          <h3 className="font-bold text-xl text-white">{tier.name}</h3>

          {tier.isCustom ? (
            <CustomAmountInput
              value={isSelected ? amount : ""}
              onChange={onAmountChange}
              isActive={isSelected}
            />
          ) : (
            <div className="bg-[#0d002f]/50 px-3 sm:px-4 py-2 rounded-full">
              <p className="text-[#FF0099] font-bold text-xl">
                {tier.minAmount}$
              </p>
            </div>
          )}

          <p className="text-gray-300 text-xs sm:text-sm flex-grow">
            {tier.description}
          </p>

          <div className="w-full pt-3">
            <div
              className={cn(
                "h-1 w-full rounded-full",
                isSelected ? "bg-[#FF0099]" : tier.color
              )}
            />
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function TierIcon({ tier }: { tier: DonationTier }) {
  return (
    <div
      className={cn(
        "p-4 rounded-full backdrop-blur-sm",
        tier.isCustom ? "bg-gray-500/50" : tier.color
      )}
    >
      <DynamicIcon name={tier.iconName} className="w-8 h-8 text-white" />
    </div>
  );
}

function CustomAmountInput({
  value,
  onChange,
  isActive,
}: {
  value: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isActive: boolean;
}) {
  return (
    <div className="w-full space-y-2">
      <div className="bg-[#FF0099]/10 rounded-lg p-3">
        <p className="text-white text-sm font-medium">
          Montant personnalisé (min. 1$)
        </p>
      </div>

      <div className="relative">
        <Label
          htmlFor="customAmount"
          className="absolute -top-2.5 left-2 px-1 text-xs font-medium text-[#FF0099] bg-[#1a1a4a]"
        >
          Votre montant
        </Label>
        <Input
          id="customAmount"
          type="number"
          min="1"
          value={value}
          onChange={onChange}
          onMouseDown={(e) => e.stopPropagation()}
          className={cn(
            "bg-[#0d002f]/50 text-white border-[#FF0099]/30 text-center text-lg font-bold h-12",
            isActive && "border-[#FF0099] ring-2 ring-[#FF0099]/20"
          )}
          placeholder="Montant"
          aria-label="Entrez votre montant personnalisé"
        />
        <span className="absolute right-3 top-1/3 -translate-y-1/2 text-[#FF0099] font-bold">
          $
        </span>
      </div>
    </div>
  );
}
