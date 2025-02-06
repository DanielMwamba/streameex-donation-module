"use client"

import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="w-full min-w-screen h-full min-h-screen flex items-center justify-center">
      <button onClick={() => signOut({ redirect: true, callbackUrl: '/auth/login' })}>
        Déconnexion
      </button>
    </div>
  );
}
