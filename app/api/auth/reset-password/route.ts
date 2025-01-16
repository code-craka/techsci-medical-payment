import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { hash } from 'bcrypt';
import { validatePassword } from '@/lib/validation/password';
import { sendEmail } from '@/lib/email';
import { withRateLimit, resetPasswordRateLimit } from '@/lib/rate-limit';

async function handler(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate password strength
    const validation = validatePassword(password);
    if (!validation.isValid) {
      return NextResponse.json(
        { message: validation.errors[0] },
        { status: 400 }
      );
    }

    // Find user with valid reset token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExp: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await hash(password, 10);

    // Update user's password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExp: null,
        lastLogin: new Date(),
      },
    });

    // Send confirmation email
    await sendEmail({
      to: user.email,
      subject: 'Your password has been reset',
      html: `
        <h1>Password Reset Successful</h1>
        <p>Hello ${user.name},</p>
        <p>Your password has been successfully reset. If you did not make this change, please contact support immediately.</p>
        <p>Details:</p>
        <ul>
          <li>Date: ${new Date().toLocaleString()}</li>
          <li>IP: ${req.headers.get('x-forwarded-for') || 'Unknown'}</li>
          <li>Browser: ${req.headers.get('user-agent') || 'Unknown'}</li>
        </ul>
        <p>Best regards,<br>Wafid Admin Team</p>
      `,
    });

    return NextResponse.json(
      { message: 'Password reset successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Apply rate limiting middleware
export const POST = withRateLimit(
  handler,
  resetPasswordRateLimit,
  (req) => req.headers.get('x-forwarded-for') || 'unknown'
);
