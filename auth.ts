import { compareSync } from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        nationalId: {
          label: 'Documento',
          type: 'text',
          placeholder: '1234567890',
        },
        pin: {
          label: 'PIN',
          type: 'password',
          placeholder: '1234',
        },
      },
      authorize: async (credentials) => {
        console.log('credentials', credentials);
        if (!credentials.nationalId || !credentials.pin) {
          console.error('Missing credentials');
          return null;
        }

        const userRow = await prisma.user.findUnique({
          where: {
            nationalId: credentials.nationalId as string,
          },
        });

        if (!userRow) {
          console.error('User not found.');
          return null;
        }

        if (userRow.accountStatus !== 'ACTIVE') {
          console.error('User account is not active');
          return null;
        }

        if (!userRow.pinHash) {
          console.error('User has no pinHash');
          return null;
        }

        const pinMatch = compareSync(credentials.pin as string, userRow.pinHash);

        if (!pinMatch) {
          await prisma.user.update({
            where: { nationalId: userRow.nationalId },
            data: { failedAttempts: userRow.failedAttempts + 1 },
          });
          console.error('Invalid PIN');
          return null;
        }

        return {
          name: 'Carlos geiss',
          image: `https://www.gravatar.com/avatar/${userRow.nationalId}`,
          email: '',
          id: userRow.nationalId,
        };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Permite quedarse en /ingresar
      if (url === `${baseUrl}/ingresar`) {
        return url;
      }

      // Redirige a /plaza como predeterminado
      return `${baseUrl}/`;
    },
  },
  pages: {
    signIn: '/ingresar',
    newUser: '/plaza',
    error: '/ingresar',
  },
});

