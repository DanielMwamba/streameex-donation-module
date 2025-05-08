/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { flexpaiePayment } from "@/services/flexpaie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaymentFormProps } from "@/types/donations";
import { Card, CardContent, CardTitle, CardHeader } from "../ui/card";
import { DynamicIcon } from "../ui/dynamic-icon";

export default function MobileMoneyForm({
  eventId,
  initialAmount = 10,
}: PaymentFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [amount, setAmount] = useState<number>(initialAmount);
  const { data: session } = useSession();

  useEffect(() => {
    setAmount(initialAmount);
  }, [initialAmount]);

  // const handleAmountChange = (newAmount: number) => {
  //   setAmount(newAmount);
  //   onAmountChange(newAmount);
  // };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await flexpaiePayment({
      phone,
      amount,
      userId: (session?.user as any).id,
      eventId,
    });
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="bg-gradient-to-br from-[#0d002f]/70 to-[#1a0046]/70 p-5 rounded-lg mb-4 border border-[#FF0099]/30 shadow-md">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">Montant à payer:</span>
            <span className="text-[#FF0099] font-bold text-2xl">
              {initialAmount}$
            </span>
          </div>
        </div>

        <div className="space-y-2">
        <DynamicIcon name="smartphone" className="w-5 h-5 mr-2 text-[#FF0099]" />
          <Label htmlFor="phone" className="text-white">
            Numéro de téléphone Mobile money
          </Label>
          <Input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            id="phone"
            placeholder="0X XX XX XX XX"
            className="bg-[#1a1a4a] text-white border-[#FF0099]/20 focus:border-[#FF0099]"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#FF0099] to-[#FF0099]/80 hover:from-[#FF0099]/90 hover:to-[#FF0099]/70 h-12 text-lg font-semibold mt-4 shadow-lg shadow-[#FF0099]/20 transition-all duration-300"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Traitement en cours...
            </div>
          ) : (
            <>
              <DynamicIcon name="smartphone"/>
              Payer maintenant
            </>
          )}
        </Button>
      </form>
      <Card className="bg-[#0d002f]/70 border-[#FF0099]/20 shadow-md mt-5">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg flex items-center">
            <DynamicIcon name="info" className="w-5 h-5 mr-2 text-[#FF0099]" />
            Comment ça marche
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <ol className="list-decimal list-inside space-y-3 text-sm text-white/90">
            <li className="flex items-start">
              <span className="bg-[#FF0099]/20 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                1
              </span>
              <span>
                Saisissez votre numéro de Mobile Money en commençant par{" "}
                <span className="font-bold">0</span>
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-[#FF0099]/20 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                2
              </span>
              <span>Cliquez sur &quot;Payer maintenant&quot;</span>
            </li>
            <li className="flex items-start">
              <span className="bg-[#FF0099]/20 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                3
              </span>
              <span>
                Vous recevrez une notification sur votre téléphone - tapez votre
                code PIN pour confirmer
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-[#FF0099]/20 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                4
              </span>
              <span>Patienter et le tour est jouer</span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </motion.div>
  );
}
