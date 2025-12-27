import { signIn } from "@/auth"




export default function SignInButton() {
  return (
    <div>
      <button onClick={async () => {
        "use server";
        await signIn()
      }}> Sign In </button>
    </div>
  )
}