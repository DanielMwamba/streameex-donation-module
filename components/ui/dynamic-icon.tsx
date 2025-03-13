import type { IconType } from "react-icons"
import {
  FaGift,
  FaStar,
  FaAward,
  FaGem,
  FaCrown,
  FaCreditCard,
  FaMobileAlt,
  FaPaypal,
  FaCheckCircle,
  FaArrowRight,
  FaEdit,
  FaInfoCircle,
  FaExclamationCircle,
} from "react-icons/fa"

import { RiCoinsFill, } from "react-icons/ri";
import { IoShieldCheckmark } from "react-icons/io5"

interface DynamicIconProps {
  name: string
  className?: string
}

export function DynamicIcon({ name, className = "" }: DynamicIconProps) {
  const icons: Record<string, IconType> = {
    gift: FaGift,
    star: FaStar,
    award: FaAward,
    pieces: RiCoinsFill,
    diamond: FaGem,
    gem: FaGem,
    crown: FaCrown,
    "credit-card": FaCreditCard,
    smartphone: FaMobileAlt,
    "shopping-cart": FaPaypal,
    "check-circle": FaCheckCircle,
    "arrow-right": FaArrowRight,
    edit: FaEdit,
    shield: IoShieldCheckmark,
    info: FaInfoCircle,
    "alert-circle": FaExclamationCircle,
  }

  const IconComponent = icons[name] || FaGift // Fallback to FaGift if icon not found

  return <IconComponent className={className} />
}

