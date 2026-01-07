import SignInButton from "@/components/sign-in-button";
import UserName  from "@/components/user-name";
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-6xl font-bold"> {t('title')}</h1>
      <div>
      <SignInButton></SignInButton>
      <br/>
      <UserName></UserName>
      </div>
    </div>
  );
}
