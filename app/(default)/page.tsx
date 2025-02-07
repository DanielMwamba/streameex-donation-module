"use client"

import MobileMoneyForm from "@/components/mobile-money-form";
import PayPalDonate from "@/components/paypal-form";
import StripeForm from "@/components/stripe-form";
import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [method, setMethod] = useState<'mobile' | 'stripe' | 'paypal'>('mobile')
  const searchParams = useSearchParams()
  const eventId = searchParams.get('eventId')

  if (!eventId) {
    return (
      <div className="w-screen flex items-center justify-center h-screen bg-primary">
        <button className="text-primary px-5 py-2 rounded-md bg-white" onClick={() => signOut({ redirect: true, callbackUrl: '/auth/login' })}>
          Déconnexion
        </button>
      </div>
    )
  }

  return (
    <div className="w-full p-5 md:p-10 min-w-screen bg-opacity-70 bg-primary h-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl text-white items-center bg-primary rounded-md p-5 flex flex-col gap-5">
        <h2 className="font-bold text-xl">
          Choisissez une méthode de paiement
        </h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
          <button onClick={() => setMethod('mobile')} type="button" className={`${method == 'mobile' ? 'bg-main text-white' : 'bg-transparent text-main'} border bg-opacity-70 border-opacity-70 border-main px-2 py-1 rounded-sm`}>
            Mobile money
          </button>
          <button onClick={() => setMethod('stripe')} type="button" className={`${method == 'stripe' ? 'bg-main text-white' : 'bg-transparent text-main'} border bg-opacity-70 border-opacity-70 border-main px-2 py-1 rounded-sm`}>
            Carte
          </button>
          <button onClick={() => setMethod('paypal')} type="button" className={`${method == 'paypal' ? 'bg-main text-white' : 'bg-transparent text-main'} border bg-opacity-70 border-opacity-70 border-main px-2 py-1 rounded-sm`}>
            PayPal
          </button>
        </div>
        {
          method == 'mobile' && (
            <MobileMoneyForm
              eventId={eventId}
            />
          )
        }
        {
          method == 'stripe' && (
            <StripeForm
              eventId={eventId}
            />
          )
        }
        {
          method == 'paypal' && (
            <PayPalDonate
              eventId={eventId}
            />
          )
        }
      </div>
    </div>
  );
}
