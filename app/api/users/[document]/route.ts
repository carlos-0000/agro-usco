import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const GET = async (req: NextRequest, { params }: { params: { document: string } }) => {
  try {
    const { document } = params;

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

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest, { params }: { params: { document: string } }) => {
  try {
    const body = (await req.json()) as { phoneNumber: number };

    const { document } = params;
    const { phoneNumber } = body;

    const user = await prisma.user.create({
      data: {
        nationalId: document,
        phoneNumber: `+57${String(phoneNumber)}`,
      },
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
