import {
  Gift,
  Star,
  Award,
  Diamond,
  Gem,
  CircleDollarSignIcon,
  Crown,
  CreditCard,
  Smartphone,
  ShoppingCart,
  CheckCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className = "" }: DynamicIconProps) {
  const icons: Record<string, LucideIcon> = {
    gift: Gift,
    star: Star,
    award: Award,
    pieces: CircleDollarSignIcon,
    diamond: Diamond,
    gem: Gem,
    crown: Crown,
    "credit-card": CreditCard,
    smartphone: Smartphone,
    "shopping-cart": ShoppingCart,
    "check-circle": CheckCircle,
    "arrow-right": ArrowRight,
  };

  const IconComponent = icons[name] || Gift; // Fallback to Gift if icon not found

  return <IconComponent className={className} />;
}
