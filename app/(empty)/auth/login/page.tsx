"use client"

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import logo from '@/public/images/logo.png'
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/'
  const error = searchParams.get('error')

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    await signIn("credentials", {
      callbackUrl,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      redirect: true,
    });
  };

  return (
    <div className="bg-secondary_shade md:w-[500px] w-full">
      <div className="w-full p-5 text-white flex flex-col gap-5">
        <Link href={'https://streameex.com'} className="w-fit m-auto">
          <Image
            src={logo}
            alt="Streameex Logo"
            width={180}
            height={40}
          />
        </Link>
        <h1 className='text-xl text-center font-bold'>Se connecter</h1>
        <form
          onSubmit={handleSubmit}
          method="post"
          action="/api/auth/callback/credentials"
          className="flex flex-col gap-3"
        >
          {
            error && (
              <small className="text-red-500">
                Identifiants incorrectes
              </small>
            )
          }
          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium flex flex-col gap-4 w-full"
            >
              Adresse E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={'block w-full px-3 py-2 border rounded-md shadow-sm appearance-none placeholder-ui-gray-medium border-ui-gray-medium focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ph-no-capture text-gray-600'}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-ui-gray-dark"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={'block w-full px-3 py-2 border rounded-md shadow-sm appearance-none placeholder-ui-gray-medium border-ui-gray-medium focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ph-no-capture text-gray-600'}
            />
          </div>

          <button
            type="submit"
            className="w-full flex disabled:bg-opacity-50 opacity-100 items-center justify-center bg-main p-2 rounded-sm hover:bg-opacity-75 transition-colors"
            disabled={loading}
          >
            {loading ? 'En cours...' : 'Se connecter'}
          </button>
        </form>
        <div className="w-full flex items-center justify-center">
          <small>Vous n&apos;avez pas de compte? <Link className='text-main' href={`/auth/register?callbackUrl=${callbackUrl}`}>S&apos;enregistrer</Link></small>
        </div>
      </div>
    </div>
  )
}
