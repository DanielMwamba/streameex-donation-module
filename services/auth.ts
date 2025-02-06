import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { cookies } from "next/headers";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
  updated_at?: any;
  iat: number;
  exp: number;
  jti: string;
}

let loggedInUser: User
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "Your email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials, req): Promise<any> {
        try {
          const { data } = await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              email: credentials?.email,
              password: credentials?.password,
            }
          })
          const { token, user } = data
          const c = await cookies()
          c.set('token-key', token)
          return user
        } catch (e) {
          console.log(e)
          return null
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider. 
      return {
        ...session, user: {
          ...session.user,
          id: token.sub
        }
      }
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    jwt: async ({ token, user }) => {
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
}

export default authOptions