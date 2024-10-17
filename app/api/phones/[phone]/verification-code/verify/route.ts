import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyCode } from '@/lib/twilio';

export const POST = async (req: NextRequest, { params }: { params: { phone: string } }) => {
  const body = (await req.json()) as { code: number };

  const { phone } = params;
  const { code } = body;

  const user = await prisma.user.findFirst({
    where: {
      phoneNumber: `+57${phone}`,
    },
  });

  if (!user) {
    return NextResponse.json({ message: `\`${phone}\` Phone Number not found` }, { status: 404 });
  }

  try {
    const response = await verifyCode(`+57${phone}`, code);
    console.log(response);

    if (!response) {
      return NextResponse.json({ message: 'Error verifying code' }, { status: 500 });
    }

    if (!response.valid) {
      return NextResponse.json({ message: 'Verification code denied' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Verification code approved' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Verification code expired' }, { status: 500 });
  }
};
