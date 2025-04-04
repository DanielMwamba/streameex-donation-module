"use client";

import { motion } from "framer-motion";
import type { DonationTier } from "@/types/donations";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

interface TierSelectorProps {
  tiers: DonationTier[];
  selectedTierIndex: number | null;
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
  const [customAmount, setCustomAmount] = useState<number>(
    amount < tiers[1].minAmount ? amount : 1
  );

  useEffect(() => {
    if (selectedTierIndex === 0 && amount !== customAmount) {
      setCustomAmount(amount);
    }
  }, [amount, selectedTierIndex, customAmount]);

  const handleCustomAmountChange = (newAmount: number) => {
    setCustomAmount(newAmount);
    onAmountChange(newAmount);
  };

  return (
    <div className="mt-16">
      {/* <h3 className="text-2xl font-bold text-white text-center mb-2">
        Choisissez votre niveau de soutien
      </h3> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
              selectedTierIndex === index
                ? "ring-4 ring-[#FF0099] shadow-lg shadow-[#FF0099]/20"
                : "hover:shadow-md hover:shadow-[#FF0099]/10"
            }`}
          >
            <div
              className={`absolute inset-0  opacity-20 ${tier.color}`}
              style={{
                background: tier.isCustom
                  ? "linear-gradient(135deg, rgba(128, 128, 128, 0.3), rgba(200, 200, 200, 0.3))"
                  : tier.id === "bronze"
                  ? "linear-gradient(135deg, #b45309, #92400e)"
                  : tier.id === "gold"
                  ? "linear-gradient(135deg, #f59e0b, #d97706)"
                  : "linear-gradient(135deg, #3b82f6, #60a5fa)",
              }}
            />

            <div
              className="relative rounded-xl p-6 cursor-pointer bg-[#1a1a4a]/80 backdrop-blur-sm h-full flex flex-col"
              onClick={() => onSelectTier(index)}
            >
              {selectedTierIndex === index && (
                <div className="absolute top-3 right-3 bg-[#FF0099] text-white rounded-full p-1 z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              <div className="flex flex-col items-center text-center space-y-4">
                <div
                  className={`p-4 rounded-full ${tier.color}  backdrop-blur-sm`}
                >
                  <DynamicIcon
                    name={tier.iconName}
                    className="w-8 h-8 text-white"
                  />
                </div>

                <h4 className="font-bold text-xl text-white">{tier.name}</h4>

                {tier.isCustom ? (
                  <div className="w-full">
                    <div className="bg-[#FF0099]/10 rounded-lg p-3 mb-3">
                      <p className="text-white text-sm font-medium">
                        Entrez le montant de votre choix (minimum 1$)
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
                        value={customAmount}
                        onChange={(e) =>
                          handleCustomAmountChange(Number(e.target.value))
                        }
                        onClick={(e) => e.stopPropagation()}
                        className={`bg-[#0d002f]/50 text-white border-[#FF0099]/30 focus:border-[#FF0099] text-center pr-6 text-lg font-bold h-12 ${
                          selectedTierIndex === 0
                            ? "border-[#FF0099] ring-2 ring-[#FF0099]/20"
                            : ""
                        }`}
                        placeholder="Montant personnalisé"
                      />
                      <span className="absolute right-3 top-1/3 -translate-y-1/2 text-[#FF0099] font-bold">
                        $
                      </span>

                      {selectedTierIndex === 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="mt-2 text-xs text-[#FF0099]"
                        >
                          Cliquez pour modifier le montant
                        </motion.div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#0d002f]/50 px-4 py-2 rounded-full">
                    <p className="text-[#FF0099] font-bold text-xl">
                      {tier.minAmount}$
                    </p>
                  </div>
                )}

                <p className="text-gray-300 text-sm flex-grow">
                  {tier.description}
                </p>

                <div className="w-full pt-3 mt-auto">
                  <div
                    className={`h-1 w-full rounded-full ${tier.color} ${
                      selectedTierIndex === index ? "bg-[#FF0099]/50" : ""
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
