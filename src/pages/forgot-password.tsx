import { PageWithNoLayout } from '@/layout/no-layout';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import ForgotPassword from '@/components/forgot-password';

const inter = Inter({ subsets: ['latin'] });

function RegisterPage() {
  return (
    <>
      <Head>
        <title>PET | FORGOT PASSWORD</title>
      </Head>
      <main className={inter.className}>
        <ForgotPassword />
      </main>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
RegisterPage.Layout = PageWithNoLayout;

export default RegisterPage;
