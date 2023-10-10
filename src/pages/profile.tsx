import Profile from '@/components/profile';
import withAuthentication from '@/hook/useAuthentication';
import { Inter } from '@next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

function ProfilePage() {
  return (
    <>
      <Head>
        <title>PET | PROFILE</title>
      </Head>
      <main className={inter.className}>
        <Profile />
      </main>
    </>
  );
}

export default withAuthentication(ProfilePage);
