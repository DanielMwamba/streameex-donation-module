import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import axiosInstance from "./axios";

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
      async authorize(credentials) {
        try {
          const { data } = await axiosInstance.post('/auth/signin', {
            email: credentials?.email,
            password: credentials?.password,
          }, {
            headers: {
              'Content-Type': 'application/json'
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
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider. 
      return {
        ...session, user: {
          ...session.user,
          id: token.sub
        }
      }
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    jwt: async ({ token }) => {
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
}

export default authOptions