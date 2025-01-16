import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { loginAlertTemplate } from '@/lib/email/templates';

interface LoginAttempt {
  userId: string;
  status: 'success' | 'failed';
}

export async function recordLoginAttempt(
  username: string,
  success: boolean
) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true, email: true, name: true },
  });

  if (!user) return;

  // Record the attempt
  await prisma.loginHistory.create({
    data: {
      userId: user.id,
      status: success ? 'success' : 'failed',
    },
  });

  // If it's a failed attempt, check if we should send an alert
  if (!success) {
    const recentFailures = await getFailedLoginAttempts(user.id);
    if (recentFailures >= 3) {
      // Send alert email
      await sendEmail({
        to: user.email,
        subject: 'Security Alert: Failed Login Attempts',
        html: loginAlertTemplate({
          name: user.name,
          email: user.email,
          attempts: recentFailures,
        }),
      });
    }
  }
}

export async function getLoginHistory(userId: string, limit = 10) {
  return prisma.loginHistory.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export async function getFailedLoginAttempts(
  userId: string,
  minutes = 30
): Promise<number> {
  const since = new Date(Date.now() - minutes * 60 * 1000);

  const attempts = await prisma.loginHistory.count({
    where: {
      userId,
      status: 'failed',
      createdAt: {
        gte: since,
      },
    },
  });

  return attempts;
}

export async function shouldBlockLogin(username: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (!user) return false;

  const failedAttempts = await getFailedLoginAttempts(user.id);
  return failedAttempts >= 5;
}
