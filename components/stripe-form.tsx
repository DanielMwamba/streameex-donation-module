/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { createStripeIdSession } from "@/services/stripe"
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
);

export default function StripeForm({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(10)
  const { data: session } = useSession()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const sessionId = await createStripeIdSession({
      userId: (session?.user as any).id,
      eventId,
      redirectUrl: window.location.href,
      unitAmount: amount,
      currency: 'usd'
    })
    if (sessionId) {
      const stripe = await stripePromise
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId })
      }
    }
    setLoading(false)
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="amount">Montant</label>
          <div className="w-full relative">
            <input required min={1} value={amount ?? 10} onChange={(e) => setAmount(Number(e.target.value))} type="number" name="amount" id="amount" className="block w-full px-3 py-2 border rounded-md shadow-sm appearance-none placeholder-ui-gray-medium border-ui-gray-medium focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ph-no-capture text-gray-600" />
          </div>
        </div>
        <button disabled={loading} className="w-full bg-opacity-100 disabled:bg-opacity-50 bg-main p-2 text-white rounded-md">
          {
            loading ? "En cours..." : "Payer maintenant"
          }
        </button>
      </form>
    </div>
  )
}
