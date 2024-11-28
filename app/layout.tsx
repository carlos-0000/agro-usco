import '@mantine/core/styles.css';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { CartProvider } from '@/contexts/CartContext';

import './globals.css';

export const metadata = {
    title: 'Mercado Agro',
    description: 'Del campo a tu mesa',
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
    <html lang="en">
    <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
    </head>
    <body>
    <SessionProvider>
        <CartProvider>
        <MantineProvider theme={theme}>{children}</MantineProvider>
        </CartProvider>
    </SessionProvider>
    </body>
    </html>
);

export default RootLayout;
