import { NextRequest, NextResponse } from 'next/server';
import { VerificationPurpose } from '@prisma/client';
import { SendVerificationCodeResponse } from '@/app/api/phones/[phone]/verification-code/route';
import { api } from '@/lib/api';
import { prisma } from '@/lib/prisma';

export const POST = async (
  req: NextRequest,
  { params }: { params: { document: string } }
): Promise<NextResponse<SendVerificationCodeResponse>> => {
  try {
    const { document } = params;

    const user = await prisma.user.findUnique({
      where: {
        nationalId: document,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: { message: `User with \`${document}\` National ID not found` } },
        { status: 404 }
      );
    }

    if (!user.phoneNumber) {
      return NextResponse.json(
        {
          error: { message: `User with \`${document}\` National ID does not have a phone number` },
        },
        { status: 400 }
      );
    }

    const response = await api.post<SendVerificationCodeResponse>(
      `/phones/${user.phoneNumber.replace('+57', '')}/verification-code`,
      {
        purpose: VerificationPurpose.PIN_RECOVERY,
      },
      { validateStatus: (status) => status === 429 || (status >= 200 && status < 300) }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: {
          message: 'An error occurred while processing your request',
          executionError: error instanceof Error ? error : undefined,
        },
      },
      { status: 500 }
    );
  }
};
