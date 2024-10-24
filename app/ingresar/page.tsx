import { NextPage } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { IngresarPage } from '@/modules';

const Page: NextPage = async () => {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <>
      <IngresarPage />
    </>
  );
};

export default Page;
