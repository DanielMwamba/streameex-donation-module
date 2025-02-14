/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axiosInstance from "@/services/axios";
import { createDonation } from "@/services/donation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PayPalDonate = ({ eventId }: { eventId: string }) => {
  const [amount, setAmount] = useState<number>(10);
  const { data: session } = useSession();

  return (
    <div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-white">
            Montant (USD)
          </Label>
          <Input
            required
            min={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            type="number"
            id="amount"
            className="bg-[#fff] text-black border-[#FF0099]/20 focus:border-[#FF0099]"
          />
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
    </div>
  );
};

export default PayPalDonate;
