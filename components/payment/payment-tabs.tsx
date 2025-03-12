"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PaymentMethod } from "@/types/donations";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import MobileMoneyForm from "@/components/payment/mobile-money-form";
import StripeForm from "@/components/payment/stripe-form";
import PayPalDonate from "@/components/payment/paypal-form";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface PaymentTabsProps {
  methods: PaymentMethod[];
  selectedMethod: string;
  onSelectMethod: (method: "mobile" | "stripe" | "paypal") => void;
  eventId: string;
  amount: number;
  onAmountChange?: (amount: number) => void;
}

export function PaymentTabs({
  methods,
  selectedMethod,
  onSelectMethod,
  eventId,
  amount,
}: PaymentTabsProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [mounted, setMounted] = useState(false);

  // Éviter les problèmes d'hydratation
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-[#1a1a4a]/80 backdrop-blur-sm rounded-xl p-6 border border-[#FF0099]/20">
        <h3 className="text-xl font-bold text-white mb-6">
          Choisissez votre méthode de paiement
        </h3>
        <div className="h-12 bg-[#0d002f]/50 rounded-md animate-pulse mb-6"></div>
        <div className="h-64 bg-[#0d002f]/30 rounded-md animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a4a]/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-[#FF0099]/20">
      <h3 className="text-xl font-bold text-white mb-4 sm:mb-6">
        Choisissez votre méthode de paiement
      </h3>
      <Tabs
        value={selectedMethod}
        onValueChange={(value) =>
          onSelectMethod(value as "mobile" | "stripe" | "paypal")
        }
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-[#0d002f]/50 h-auto">
          {methods.map((method) => (
            <TabsTrigger
              key={method.id}
              value={method.id}
              className={`
                font-medium text-xs sm:text-sm md:text-base
                py-2 sm:py-3 px-1 sm:px-2
                data-[state=active]:bg-[#FF0099] data-[state=active]:text-white
                flex flex-col sm:flex-row items-center justify-center sm:justify-start
                transition-all duration-200 gap-1 sm:gap-2
                h-auto min-h-[3rem]
              `}
            >
              <DynamicIcon
                name={method.iconName}
                className="w-5 h-5 flex-shrink-0"
              />
              <span className="text-center sm:text-left line-clamp-2 sm:line-clamp-1">
                {isMobile ? method.name.split(" ")[0] : method.name}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-4">
          <TabsContent value="mobile" className="mt-0">
            <MobileMoneyForm eventId={eventId} initialAmount={amount} />
          </TabsContent>
          <TabsContent value="stripe" className="mt-0">
            <StripeForm eventId={eventId} initialAmount={amount} />
          </TabsContent>
          <TabsContent value="paypal" className="mt-0">
            <PayPalDonate eventId={eventId} initialAmount={amount} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
