import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import { prisma } from '@/lib/prisma';

export async function generateTwoFactorSecret(userId: string) {
  const secret = authenticator.generateSecret();
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const otpauth = authenticator.keyuri(
    user.email,
    'Wafid Admin',
    secret
  );

  const qrCode = await QRCode.toDataURL(otpauth);

  // Generate backup codes
  const backupCodes = Array.from({ length: 10 }, () =>
    Math.random().toString(36).substr(2, 8)
  );

  // Save secret and backup codes
  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFactorSecret: secret,
      backupCodes,
    },
  });

  return {
    secret,
    qrCode,
    backupCodes,
  };
}

export async function verifyTwoFactorCode(
  userId: string,
  code: string
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      twoFactorSecret: true,
      backupCodes: true,
    },
  });

  if (!user?.twoFactorSecret) {
    return false;
  }

  // Check if it's a backup code
  if (user.backupCodes.includes(code)) {
    // Remove the used backup code
    await prisma.user.update({
      where: { id: userId },
      data: {
        backupCodes: user.backupCodes.filter((c: string) => c !== code),
      },
    });
    return true;
  }

  // Verify TOTP code
  return authenticator.verify({
    token: code,
    secret: user.twoFactorSecret,
  });
}

export async function disableTwoFactor(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFactorEnabled: false,
      twoFactorSecret: null,
      backupCodes: [],
    },
  });
}

export async function enableTwoFactor(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFactorEnabled: true,
    },
  });
}
