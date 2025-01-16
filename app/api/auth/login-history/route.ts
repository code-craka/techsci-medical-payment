import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { getLoginHistory } from '@/lib/auth/login-history';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const history = await getLoginHistory(session.user.id);

    return NextResponse.json({ history });
  } catch (error) {
    console.error('Login history error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch login history' },
      { status: 500 }
    );
  }
}
