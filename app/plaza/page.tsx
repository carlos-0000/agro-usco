// pages/plaza.tsx

import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Header } from '@/components';
import PlazaContent from '@/components/tabs-content/PlazaContent';

const PlazaPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/ingresar');
  }

  return (
    <>
      <Header />
      <PlazaContent />
    </>
  );
};

export default PlazaPage;
