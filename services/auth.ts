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
          });

          if (!data || !data.user) {
            console.error("Invalid response from API:", data);
            return null;
          }

          return {
            id: data.user.id,
            email: data.user.email,
            image: data.user.user_image,
            name: data.user.name
          };
        } catch (e: any) {
          console.error("Login error:", e.response?.data || e.message);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;

        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default authOptions;
