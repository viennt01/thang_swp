import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import Fee from '@/components/fee-page/fee-edit';

function FeeEditPage() {
  return (
    <>
      <Head>
        <title>ASL | FEE EDIT</title>
      </Head>
      <Fee />
    </>
  );
}

export default withAuthentication(FeeEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'fee']);
export const getStaticPaths = async ({ locales }: { locales: [] }) => {
  const ids: string[] = [];
  const paths = ids.map(() =>
    locales.map(() => ({
      params: {},
    }))
  );
  return {
    paths,
    fallback: true,
  };
};
