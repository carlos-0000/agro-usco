import { NextRequest, NextResponse } from 'next/server';
import { AccountStatus } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const PUT = async (req: NextRequest, { params }: { params: { document: string } }) => {
  try {
    const { document } = params;

    const { pin } = (await req.json()) as { pin: string };

    const user = await prisma.user.findUnique({
      where: {
        nationalId: document,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: `User with \`${document}\` National ID not found` },
        { status: 404 }
      );
    }

    if (!pin) {
      return NextResponse.json({ message: 'Pin is required' }, { status: 400 });
    }

    if (!pin.match(/^[0-9]{4}$/)) {
      return NextResponse.json({ message: 'Invalid pin' }, { status: 400 });
    }

    const pinHash = hashSync(pin, 10);

    await prisma.user.update({
      where: { nationalId: document },
      data: { pinHash, accountStatus: AccountStatus.ACTIVE },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
};
