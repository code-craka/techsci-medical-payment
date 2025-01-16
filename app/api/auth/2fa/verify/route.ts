import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { verifyTwoFactorCode, enableTwoFactor } from '@/lib/auth/2fa';
import { prisma } from '@/lib/prisma/client';
import { sendEmail } from '@/lib/email';
import { twoFactorEnabledTemplate } from '@/lib/email/templates';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { message: 'Verification code is required' },
        { status: 400 }
      );
    }

    const isValid = await verifyTwoFactorCode(session.user.id, code);

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid verification code' },
        { status: 400 }
      );
    }

    await enableTwoFactor(session.user.id);

    // Get user and backup codes
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        email: true,
        name: true,
        backupCodes: true,
      },
    });

    if (user) {
      // Send confirmation email
      await sendEmail({
        to: user.email,
        subject: '2FA Enabled - Wafid Admin',
        html: twoFactorEnabledTemplate({
          name: user.name,
          email: user.email,
          backupCodes: user.backupCodes,
        }),
      });
    }

    return NextResponse.json({
      message: '2FA enabled successfully',
      backupCodes: user?.backupCodes || [],
    });
  } catch (error) {
    console.error('2FA verification error:', error);
    return NextResponse.json(
      { message: 'Failed to verify 2FA code' },
      { status: 500 }
    );
  }
}
