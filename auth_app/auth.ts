import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"
import Google from "next-auth/providers/google"

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
var postgresAdapter = PostgresAdapter(pool)

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  adapter: postgresAdapter,
  session:{
    strategy: "jwt",
  },
  providers: [
    Google
     /* ({
      async profile(profile) {
        return profile;
      },
    })*/,
    Credentials({
      credentials: {
          email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
          },
          password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
          },
      },
      authorize: async (credentials) => {  
        let user = await postgresAdapter.getUser("1")
        if (!user) {
          user = await postgresAdapter.createUser({
              id: "00",
              name: "Moshe",
              email: "yehosef@malka.com",
              emailVerified: null,
            })
        }
      if (!user) {
            throw new Error("Invalid credentials.")
          }
      return user
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
})