import type { DonationTier, PaymentMethod } from "@/types/donations";

export const DONATION_TIERS: DonationTier[] = [
  {
    id: "silver",
    name: "Pièces",
    minAmount: 1,
    iconName: "pieces",
    description: "Choisissez votre propre montant.",
    color: "bg-gray-400",
    benefits: ["Soutien à l'événement"],
    isCustom: true,
  },
  {
    id: "bronze",
    name: "Bronze",
    minAmount: 5,
    iconName: "gift",
    description: "Un premier pas pour soutenir l'événement !",
    color: "bg-amber-600",
    benefits: ["Soutien à l'événement"],
  },

  {
    id: "gold",
    name: "Or",
    minAmount: 50,
    iconName: "award",
    description:
      "Votre soutien permet d'améliorer considérablement l'expérience de l'événement.",
    color: "bg-yellow-500",
    benefits: ["Soutien à l'événement"],
  },
  {
    id: "diamond",
    name: "Diamant",
    minAmount: 100,
    iconName: "gem",
    description:
      "Un soutien exceptionnel qui nous aide à dépasser nos objectifs !",
    color: "bg-blue-400",
    benefits: ["Soutien à l'événement"],
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "mobile",
    name: "Mobile Money",
    iconName: "smartphone",
  },
  {
    id: "stripe",
    name: "Carte Bancaire",
    iconName: "credit-card",
  },
  {
    id: "paypal",
    name: "PayPal",
    iconName: "shopping-cart",
  },
];

// Fonction utilitaire pour trouver le niveau de donation en fonction du montant
export function findDonationTierByAmount(
  amount: number
): DonationTier | undefined {
  return DONATION_TIERS.slice()
    .reverse()
    .find((tier) => amount >= tier.minAmount);
}
