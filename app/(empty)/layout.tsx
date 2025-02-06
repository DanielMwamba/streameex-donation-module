import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex items-center justify-center bg-opacity-70 min-w-screen h-full min-h-screen bg-primary">
      {children}
    </div>
  )
}
