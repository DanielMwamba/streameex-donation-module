/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axiosInstance from "@/services/axios";
import { createDonation } from "@/services/donation";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { PaymentFormProps } from "@/types/donations";

// interface MobileMoneyFormProps extends PaymentFormProps {
//   onAmountChange: (amount: number) => void;
// }

const PayPalDonate = ({ eventId, initialAmount = 10 }: PaymentFormProps) => {
  const [amount, setAmount] = useState<number>(initialAmount);
  const { data: session } = useSession();

  useEffect(() => {
    setAmount(initialAmount);
  }, [initialAmount]);

  // const handleAmountChange = (newAmount: number) => {
  //   setAmount(newAmount);
  //   onAmountChange(newAmount);
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <div className="bg-[#0d002f]/50 p-5 rounded-lg mb-4 border border-[#FF0099]/20">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">Montant à payer:</span>
            <span className="text-[#FF0099] font-bold text-2xl">
              {initialAmount}$
            </span>
          </div>
        </div>
        <PayPalScriptProvider
          options={{ clientId: process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID ?? "" }}
        >
          <PayPalButtons
            style={{ layout: "vertical", color: "blue" }}
            createOrder={async (data, actions) => {
              const t = await actions.order.create({
                purchase_units: [
                  {
                    amount: { value: amount.toString(), currency_code: "USD" },
                  },
                ],
                intent: "CAPTURE",
              });
              console.log(t);
              await createDonation({
                userId: (session?.user as any).id,
                eventId,
                amount,
                reference: t,
                method: "paypal",
              });
              return t;
            }}
            onApprove={async (data) => {
              await axiosInstance.post("/donate/paypal-webhook", {
                reference: data.orderID,
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </motion.div>
  );
};

export default PayPalDonate;
