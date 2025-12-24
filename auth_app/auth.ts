import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
 
export const { handlers, signIn, signOut, auth } = NextAuth({
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
        let user = {"name": "Moshe"}
 
        // return user object with their profile data
        return user
      },
    })
  ],
})