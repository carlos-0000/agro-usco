import { NextRequest, NextResponse } from 'next/server';
import { AccountStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export const GET = async (req: NextRequest, { params }: { params: { phone: string } }) => {
  try {
    const { phone } = params;

    const user = await prisma.user.findFirst({
      where: {
        phoneNumber: `+57${phone}`,
        accountStatus: AccountStatus.ACTIVE,
      },
    });

    if (!user) {
      return NextResponse.json({ message: `\`${phone}\` Phone Number not found` }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
};
