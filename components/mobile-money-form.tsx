/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { type FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { flexpaiePayment } from "@/services/flexpaie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function MobileMoneyForm({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [amount, setAmount] = useState<number>(10);
  const { data: session } = useSession();

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
    <div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-white">
            Montant
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
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white">
            Numéro de téléphone
          </Label>
          <Input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            id="phone"
            placeholder="0X XX XX XX XX"
            className="bg-[#fff] text-black border-[#FF0099]/20 focus:border-[#FF0099]"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full font-semibold bg-[#FF0099] hover:bg-[#FF0099]/80"
        >
          {loading ? "En cours..." : "Payer maintenant"}
        </Button>
        <Card className="bg-[#fff] border-[#FF0099]/20">
          <CardContent className="pt-6">
            <ol className="list-decimal list-inside space-y-2 text-sm text-black/80">
              <li>
                Saisissez votre numéro de mobile Money en commençant par `0`
              </li>
              <li>Cliquez sur payer maintenant</li>
              <li>Tapez votre PIN sur le téléphone</li>
              <li>Patientez et le tour est joué.</li>
            </ol>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
