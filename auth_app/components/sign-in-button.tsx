import { signIn, signOut } from "@/auth"




export default function SignInButton() {
  return (
    <div>
      <button onClick={async () => {
        "use server";
        await signIn()
      }}> Sign In </button>
       <button onClick={async () => {
        "use server";
        await signOut()
      }}> Sign Out </button>
    </div>
  )
}