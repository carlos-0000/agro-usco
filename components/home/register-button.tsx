'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { Button } from '@mantine/core';

export const RegisterButton: React.FC = () => {
  const { push } = useRouter();

  return (
    <Button
      onClick={() => push('/ingresar')}
      className="bg-green-500 text-white py-2 px-4 flex items-center rounded-md hover:bg-green-600 transition"
    >
      <LogIn className="mr-2 h-4 w-4" />
      Registrarse
    </Button>
  );
};

