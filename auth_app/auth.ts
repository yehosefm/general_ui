import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"



const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

var adapter = PostgresAdapter(pool)

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  adapter: adapter,
  session:{
    strategy: "jwt",
  },
  providers: [
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
      let user = null
 
        // logic to salt and hash password
        //const pwHash = saltAndHashPassword(credentials.password)
 
        // logic to verify if the user exists
      user = await adapter.getUser("1")
      if (!user) {
         user = await adapter.createUser({
            id: "00",
            name: "Moshe",
            email: "yehosef@malka.com",
            emailVerified: null,
          })
      }
    if (!user) {
        //  // No user found, so this is their first attempt to login
        //  // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
       // return user object with their profile data
    return user
    },
    }),
    
    
    
    //Credentials({
    //  credentials: {
    //    username: { label: "Username" },
    //    password: { label: "Password", type: "password" },
    //  },
    //  async authorize(aaa) {
    //    let request = aaa
    //    const response = await fetch(request)
    //    if (!response.ok) return null
    //    return (await response.json()) ?? null
    //  },
    //}),
  ],
})