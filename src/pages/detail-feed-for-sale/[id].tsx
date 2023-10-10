import DetailForSale from '@/components/fee-for-sale/detail';
import withAuthentication from '@/hook/useAuthentication';
import { Inter } from '@next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

function HomePage() {
  return (
    <>
      <Head>
        <title>PET | DETAIl</title>
      </Head>
      <main className={inter.className}>
        <DetailForSale />
      </main>
    </>
  );
}

export default withAuthentication(HomePage);
