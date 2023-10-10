import FeeForSale from '@/components/fee-for-sale';
import withAuthentication from '@/hook/useAuthentication';
import { Inter } from '@next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

function FeeForSalePage() {
  return (
    <>
      <Head>
        <title>PET | FEE FOR SALE</title>
      </Head>
      <main className={inter.className}>
        <FeeForSale />
      </main>
    </>
  );
}

export default withAuthentication(FeeForSalePage);
