import React from 'react';
import { LogOutButton } from '@/components';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

const HomePage = async () => (
  <>
    <LogOutButton />
    <Welcome />
    <ColorSchemeToggle />
  </>
);
export default HomePage;
