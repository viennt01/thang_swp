import Home from '@/components/home';
import withAuthentication from '@/hook/useAuthentication';
import { Inter } from '@next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

function HomePage() {
  return (
    <>
      <Head>
        <title>PET | HOME</title>
      </Head>
      <main className={inter.className}>
        <Home />
      </main>
    </>
  );
}

export default withAuthentication(HomePage);
