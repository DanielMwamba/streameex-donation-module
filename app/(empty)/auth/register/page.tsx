"use client"
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { createUser } from '@/services/user';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
      e.preventDefault();
    setLoading(true)
    const dto = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      phone: e.target.elements.phone.value,
      password_confirmation: e.target.elements.password.value
    }

    await createUser(dto);

    await signIn("credentials", {
          callbackUrl,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
        });
    setLoading(false)
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

      {/* Logo */}
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

      {/* Card d'inscription */}
      <div className="relative z-10 max-w-md w-full space-y-8 bg-[#0d002f99] backdrop-blur-sm p-8 rounded-lg">
        <div className="flex flex-col">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white relative">
              S&apos;inscrire
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-[#FF0099]" />
            </h2>
            <Link
              href={`/auth/login?callbackUrl=${callbackUrl}`}
              className="text-[#FF0099] hover:text-[#FF0099]/80 transition-colors text-sm font-bold"
            >
              J&apos;ai déjà un compte
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Nom"
              className="bg-[#1a1a2e] border-none text-white placeholder:text-gray-400 h-12"
            />

            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Adresse E-mail"
              className="bg-[#1a1a2e] border-none text-white placeholder:text-gray-400 h-12"
            />

            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              placeholder="Numéro de téléphone"
              className="bg-[#1a1a2e] border-none text-white placeholder:text-gray-400 h-12"
            />

            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
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
            {loading ? "En cours..." : "S'INSCRIRE"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignUp
