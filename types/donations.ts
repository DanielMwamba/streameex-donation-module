export interface DonationTier {
  id: string;
  name: string;
  minAmount: number;
  iconName: string;
  description: string;
  color: string;
  benefits: string[];
  isCustom?: boolean;
}

export interface PaymentMethod {
  id: "mobile" | "stripe" | "paypal";
  name: string;
  iconName: string;
}

export interface PaymentFormProps {
  eventId: string;
  initialAmount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data: any) => void;
}
