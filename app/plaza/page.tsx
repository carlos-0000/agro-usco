import { NextPage } from 'next';
import { redirect } from 'next/navigation';
import { Container } from '@mantine/core';
import { auth } from '@/auth';
import { Header } from '@/components';

const PlazaPage: NextPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/ingresar');
  }

  return (
    <div>
      <Header />
      <Container>
        <h1>Bienvenido a la plaza</h1>
      </Container>
    </div>
  );
};

export default PlazaPage;
