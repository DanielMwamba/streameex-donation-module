"use client"
import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { createUser } from '@/services/user';
import { useSearchParams } from 'next/navigation';
import logo from '@/public/images/logo.png'

const SignUp = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();

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
  };

  return (
    <div className="bg-secondary_shade md:w-[500px] w-full">
      <div className="w-full p-5 text-white flex flex-col gap-5">
        <Image
          src={logo}
          alt="Streameex Logo"
          width={180}
          height={40}
          className='mx-auto'
        />
        <h1 className='text-xl text-center font-bold'>Créer un compte</h1>
        <form
          onSubmit={handleSubmit}
          method="post"
          action="/api/auth/callback/credentials"
          className="flex flex-col gap-3"
        >
          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium flex flex-col gap-4 w-full"
            >
              Nom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={'block w-full px-3 py-2 border rounded-md shadow-sm appearance-none placeholder-ui-gray-medium border-ui-gray-medium focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ph-no-capture text-gray-600'}
            />
          </div>

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

          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium flex flex-col gap-4 w-full"
            >
              Numéro de téléphone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="phone"
              required
              className={'block w-full px-3 py-2 border rounded-md shadow-sm appearance-none placeholder-ui-gray-medium border-ui-gray-medium focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ph-no-capture text-gray-600'}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label
              htmlFor="password"
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
            className="w-full flex items-center justify-center bg-main p-2 rounded-sm hover:bg-opacity-75 transition-colors"
          >
            Enregistrer
          </button>
        </form>
        <div className="w-full flex items-center justify-center">
          <small>Vous avez déjà un compte? <Link className='text-main' href={`/auth/login?callbackUrl=${callbackUrl}`}>Se connecter</Link></small>
        </div>
      </div>
    </div>
  )
}

export default SignUp