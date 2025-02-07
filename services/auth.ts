/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "./axios";

const authOptions: NextAuthOptions = {
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
          const { user } = data
          return {
            id: user.id,
            email: user.email,
            image: user.user_image,
            name: user.name
          }
        } catch (e: any) {
          console.log(e.respose)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
}

export default authOptions