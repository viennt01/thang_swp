import { PageWithNoLayout } from '@/layout/no-layout';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import Register from '@/components/register';

const inter = Inter({ subsets: ['latin'] });

function RegisterPage() {
  return (
    <>
      <Head>
        <title>FPT | REGISTER</title>
      </Head>
      <main className={inter.className}>
        <Register />
      </main>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
RegisterPage.Layout = PageWithNoLayout;

export default RegisterPage;
