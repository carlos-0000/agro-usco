import { NextRequest, NextResponse } from 'next/server';
import { VerificationPurpose } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { sendVerificationCode } from '@/lib/twilio';
import { ApiResponse } from '@/lib/types';

export type SendVerificationCodeResponse = ApiResponse<
  {
    tryAgainAt: string;
    expiresAt: string;
  },
  {
    tryAgainAt: string;
    triedTimes: number;
    lastVerification: {
      createdAt: string;
      expiresAt: string;
    };
  }
>;

export const POST = async (
  req: NextRequest,
  { params }: { params: { phone: string } }
): Promise<NextResponse<SendVerificationCodeResponse>> => {
  try {
    const { phone } = params;

    let body = {} as { purpose: VerificationPurpose };

    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json({ error: { message: 'Invalid body' } }, { status: 400 });
    }

    if (!body.purpose) {
      return NextResponse.json({ error: { message: 'Purpose is required' } }, { status: 400 });
    }

    const { purpose } = body;

    if (!Object.values(VerificationPurpose).includes(purpose)) {
      return NextResponse.json(
        { error: { message: `Invalid purpose: ${purpose}` } },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        phoneNumber: `+57${phone}`,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: { message: `\`${phone}\` Phone Number not found` } },
        { status: 404 }
      );
    }

    const previousVerifications = await prisma.smsVerification.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const triedTimes = previousVerifications.length;

    const now = new Date();

    if (triedTimes > 0) {
      const lastVerification = previousVerifications[0];
      const createdAt = new Date(lastVerification.createdAt);

      const minutes = { 1: 1, 2: 5 }[triedTimes] || 1440;

      const waitTime = new Date(createdAt.setMinutes(createdAt.getMinutes() + minutes));
      if (now < waitTime) {
        return NextResponse.json(
          {
            error: {
              message: `Try again later than ${waitTime}`,
              details: {
                tryAgainAt: waitTime.toISOString(),
                triedTimes,
                lastVerification: {
                  createdAt: lastVerification.createdAt.toISOString(),
                  expiresAt: lastVerification.expiresAt.toISOString(),
                },
              },
            },
          },
          { status: 429 }
        );
      }
    }

    const verificationInstance = await sendVerificationCode(user.phoneNumber!);

    let expiresAt = new Date(verificationInstance.dateCreated);
    expiresAt = new Date(expiresAt.setMinutes(expiresAt.getMinutes() + 10));

    let tryAgainAt = new Date(now);
    tryAgainAt = new Date(
      tryAgainAt.setMinutes(tryAgainAt.getMinutes() + ({ 0: 1, 1: 5, 2: 1440 }[triedTimes] || 1440))
    );

    await prisma.smsVerification.create({
      data: {
        userId: user.id,
        createdAt: now,
        expiresAt: expiresAt.toISOString(),
        purpose,
        codeHash: 'TWILIO_MANAGED',
      },
    });

    return NextResponse.json({
      message: 'Verification code sent',
      data: {
        tryAgainAt: tryAgainAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: {
          message: 'An error occurred while processing your request',
          ...{ executionError: error instanceof Error ? error : undefined },
        },
      },
      { status: 500 }
    );
  }
};
