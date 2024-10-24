import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyCode } from '@/lib/twilio';

export const POST = async (req: NextRequest, { params }: { params: { phone: string } }) => {
  try {
    const body = (await req.json()) as { code: string; nationalId?: string };

    const { phone } = params;
    const { code } = body;

    const searchWithNationalId = body.nationalId && phone === 'undefined';

    const user = await (searchWithNationalId
      ? prisma.user.findFirst({
          where: {
            nationalId: body.nationalId,
          },
        })
      : prisma.user.findFirst({
          where: {
            phoneNumber: `+57${phone}`,
          },
        }));

    if (!user) {
      return NextResponse.json({ message: `\`${phone}\` Phone Number not found` }, { status: 404 });
    }

    const response = await verifyCode(
      searchWithNationalId ? user.phoneNumber! : `+57${phone}`,
      code
    );

    if (!response) {
      return NextResponse.json({ message: 'Error verifying code' }, { status: 500 });
    }

    if (!response.valid) {
      return NextResponse.json({ message: 'Verification code denied' }, { status: 500 });
    }

    await prisma.smsVerification.deleteMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({ message: 'Verification code approved' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Verification code expired' }, { status: 500 });
  }
};
