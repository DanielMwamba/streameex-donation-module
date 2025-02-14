/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const error = searchParams.get("error");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      callbackUrl,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      redirect: true,
    });
  };

  return (
    <div
      className="min-h-screen w-full relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255, 0, 153, 0.1) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(128, 0, 255, 0.15) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mb-8">
        <Link href="https://streameex.com">
          <Image
            src="/images/logo-streameex.png"
            alt="Streameex Logo"
            width={180}
            height={40}
            priority
            className="w-48"
          />
        </Link>
      </div>

      {/* Card de connexion */}
      <div className="relative z-10 max-w-md w-full space-y-8 bg-[#0d002f99] backdrop-blur-sm p-8 rounded-lg">
        <div className="flex flex-col">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white relative">
              Se connecter
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-[#FF0099]" />
            </h2>
            <Link
              href={`/auth/register?callbackUrl=${callbackUrl}`}
              className="text-[#FF0099] hover:text-[#FF0099]/80 transition-colors text-sm font-bold"
            >
              Je n&apos;ai pas de compte
            </Link>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          method="post"
          action="api/auth/callback/credentials"
          className="mt-8 space-y-6"
        >
          {error && (
            <small className="text-[#ff0000] text-sm">
              Identifiants incorrects
            </small>
          )}

          <div className="space-y-4">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email"
              className="bg-[#1a1a2e] border-none text-white placeholder:text-gray-400 h-12"
            />

            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Mot de passe"
              className="bg-[#1a1a2e] border-none text-white placeholder:text-gray-400 h-12"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF0099] hover:bg-[#FF0099]/90 text-white font-bold py-6 rounded"
          >
            {loading ? "En cours..." : "S'IDENTIFIER"}
          </Button>
        </form>
      </div>
    </div>
  );
}
