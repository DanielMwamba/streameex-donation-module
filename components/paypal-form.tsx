/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axiosInstance from "@/services/axios";
import { createDonation } from "@/services/donation";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSession } from "next-auth/react";
import { useState } from "react";

const PayPalDonate = ({ eventId }: { eventId: string }) => {
  const [amount, setAmount] = useState<number>(10)
  const { data: session } = useSession()

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="amount">Montant</label>
        <div className="w-full relative">
          <input required min={1} value={amount ?? 10} onChange={(e) => setAmount(Number(e.target.value))} type="number" name="amount" id="amount" className="block w-full px-3 py-2 border rounded-md shadow-sm appearance-none placeholder-ui-gray-medium border-ui-gray-medium focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ph-no-capture text-gray-600" />
        </div>
      </div>
      <PayPalScriptProvider options={{ "clientId": process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID ?? '' }}>
        <PayPalButtons
          createOrder={async (data, actions) => {
            const t = await actions.order.create({
              purchase_units: [
                {
                  amount: { value: amount.toString(), currency_code: 'USD' },
                },
              ],
              intent: 'CAPTURE',
            });
            console.log(t)
            await createDonation({
              userId: (session?.user as any).id,
              eventId,
              amount,
              reference: t,
              method: 'paypal',
            })
            return t
          }}
          onApprove={async (data) => {
            await axiosInstance.post('/donate/paypal-webhook', { reference: data.orderID })
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalDonate;
