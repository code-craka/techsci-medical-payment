import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { generateTwoFactorSecret } from '@/lib/auth/2fa';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { secret, qrCode, backupCodes } = await generateTwoFactorSecret(
      session.user.id
    );

    return NextResponse.json({ qrCode, backupCodes });
  } catch (error) {
    console.error('2FA setup error:', error);
    return NextResponse.json(
      { message: 'Failed to setup 2FA' },
      { status: 500 }
    );
  }
}
