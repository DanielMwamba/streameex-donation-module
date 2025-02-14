"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  CreditCard,
  Smartphone,
  ShoppingCartIcon as Paypal,
} from "lucide-react";
import MobileMoneyForm from "@/components/mobile-money-form";
import PayPalDonate from "@/components/paypal-form";
import StripeForm from "@/components/stripe-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [method, setMethod] = useState<"mobile" | "stripe" | "paypal">(
    "mobile"
  );
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#00164c]">
        <div>
          <Button
            onClick={() =>
              signOut({ redirect: true, callbackUrl: "/auth/login" })
            }
            className="bg-[#FF0099] font-semibold text-white hover:bg-[#FF0099]/80 transition-colors"
          >
            Déconnexion
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d002f] bg-opacity-60 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-[#00164c] border-[#FF0099]/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Choisissez une méthode de paiement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={method}
            onValueChange={(value) =>
              setMethod(value as "mobile" | "stripe" | "paypal")
            }
          >
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-[#fff]">
              <TabsTrigger
                value="mobile"
                className="font-semibold data-[state=active]:bg-[#FF0099] data-[state=active]:text-white"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Mobile money
              </TabsTrigger>
              <TabsTrigger
                value="stripe"
                className="font-semibold data-[state=active]:bg-[#FF0099] data-[state=active]:text-white"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Carte
              </TabsTrigger>
              <TabsTrigger
                value="paypal"
                className=" font-semibold data-[state=active]:bg-[#FF0099] data-[state=active]:text-white"
              >
                <Paypal className="w-5 h-5 mr-2" />
                PayPal
              </TabsTrigger>
            </TabsList>
            <TabsContent value="mobile">
              <MobileMoneyForm eventId={eventId} />
            </TabsContent>
            <TabsContent value="stripe">
              <StripeForm eventId={eventId} />
            </TabsContent>
            <TabsContent value="paypal">
              <PayPalDonate eventId={eventId} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
