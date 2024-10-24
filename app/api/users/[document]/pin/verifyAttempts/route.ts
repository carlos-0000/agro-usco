import { NextRequest, NextResponse } from 'next/server';
import { AccountStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export const POST = async (req: NextRequest, { params }: { params: { document: string } }) => {
  try {
    const { document } = params;

    const user = await prisma.user.findUnique({
      where: { nationalId: document },
    });

    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }

    // Verificar si la cuenta está bloqueada
    if (user.accountStatus !== AccountStatus.ACTIVE) {
      return NextResponse.json({ message: 'La cuenta está bloqueada' }, { status: 403 });
    }

    // Verificar si los intentos fallidos superan el límite permitido
    if (user.failedAttempts >= 3) {
      // Bloquear la cuenta cambiando el accountStatus
      await prisma.user.update({
        where: { nationalId: document },
        data: { accountStatus: AccountStatus.ACTIVE },
      });
      return NextResponse.json(
          { message: 'Has alcanzado el número máximo de intentos. La cuenta ha sido bloqueada.' },
          { status: 403 }
      );
    }

    // Si no ha superado el límite de intentos, simplemente resolver la promesa
    return NextResponse.json({ message: 'Intentos dentro del límite permitido' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
        { message: 'Ocurrió un error al procesar su solicitud' },
        { status: 500 }
    );
  }
};
