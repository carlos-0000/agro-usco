'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@mantine/core';

export const LogOutButton = () => <Button onClick={() => signOut()}>Cerrar sesión</Button>;
