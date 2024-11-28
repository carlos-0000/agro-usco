// pages/plaza.tsx

import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Header } from '@/components';
import GranoContent from '@/components/tabs-content/GranoContent';

const GranoPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/ingresar');
  }

  return (
    <>
      <Header />
      <GranoContent />
    </>
  );
};

export default GranoPage;
