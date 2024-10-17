import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendVerificationCode } from '@/lib/twilio';

export const POST = async (
  req: NextRequest,
  { params, body }: { params: { phone: string }; body: {} }
) => {
  try {
    const { phone } = params;

    const user = await prisma.user.findFirst({
      where: {
        phoneNumber: `+57${phone}`,
      },
    });

    if (!user) {
      return NextResponse.json({ message: `\`${phone}\` Phone Number not found` }, { status: 404 });
    }

    await sendVerificationCode(user.phoneNumber!); // TODO: Remove the !

    return NextResponse.json({ message: 'Verification code sent' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
};
