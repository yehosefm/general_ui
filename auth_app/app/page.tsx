import SignInButton from "@/components/sign-in-button";
import UserName  from "@/components/user-name";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1> hello world</h1>
      <div>
      <SignInButton></SignInButton>
      <br/>
      <UserName></UserName>
      </div>
    </div>
  );
}
