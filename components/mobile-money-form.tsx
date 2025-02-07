/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { flexpaiePayment } from "@/services/flexpaie"
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"

export default function MobileMoneyForm({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>('')
  const [amount, setAmount] = useState<number>(10)
  const { data: session } = useSession()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await flexpaiePayment({
      phone,
      amount,
      userId: (session?.user as any).id,
      eventId,
    })
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
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="phone">Numéro</label>
          <div className="w-full relative">
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="block w-full px-3 py-2 border rounded-md shadow-sm appearance-none placeholder-ui-gray-medium border-ui-gray-medium focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ph-no-capture text-gray-600" />
          </div>
        </div>
        <button disabled={loading} className="w-full bg-opacity-100 disabled:bg-opacity-50 bg-main p-2 text-white rounded-md">
          {
            loading ? "En cours..." : "Payer maintenant"
          }
        </button>
        <ol className="mt-2 space-y-1 list-decimal list-inside">
          <li>Saisissez votre numéro de mobile Money en commencent par `0`</li>
          <li>Cliquez sur payer maintenant</li>
          <li>Tapez votre PIN sur le téléphone</li>
          <li>Patientez et le tour est joué.</li>
        </ol>
      </form>
    </div>
  )
}
