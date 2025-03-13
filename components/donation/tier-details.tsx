"use client";

import { motion } from "framer-motion";
import type { DonationTier } from "@/types/donations";
import { DynamicIcon } from "@/components/ui/dynamic-icon";

interface TierDetailsProps {
  tier: DonationTier;
}

export function TierDetails({ tier }: TierDetailsProps) {
  if (!tier) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a1a4a]/80 backdrop-blur-sm rounded-xl p-6 border border-[#FF0099]/20"
    >
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-full ${tier.color}  mr-4`}>
          <DynamicIcon name={tier.iconName} className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">
            {tier.isCustom ? "Donation personnalisée" : `Niveau ${tier.name}`}
          </h3>
          <p className="text-gray-300 text-sm">{tier.description}</p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold text-white mb-3">Pourquoi avons nous besoins de votre soutien ? :</h4>
        <ul className="space-y-2">
          {tier.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <DynamicIcon name="check-circle" className="w-5 h-5 text-[#FF0099] mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
