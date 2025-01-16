'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

interface BackupCodes {
  codes: string[];
}

export function TwoFactorSetup() {
  const { data: session, update } = useSession();
  const [step, setStep] = useState<'initial' | 'verify' | 'backup'>('initial');
  const [isLoading, setIsLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleEnable2FA = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to setup 2FA');
      }

      setQrCode(data.qrCode);
      setStep('verify');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      toast.error('Failed to setup 2FA');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verificationCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid verification code');
      }

      setBackupCodes(data.backupCodes);
      setStep('backup');
      await update(); // Update session to reflect 2FA status
      toast.success('2FA verification successful');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      toast.error('Failed to verify 2FA code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/2fa/disable', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to disable 2FA');
      }

      await update(); // Update session to reflect 2FA status
      toast.success('2FA has been disabled');
      setStep('initial');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      toast.error('Failed to disable 2FA');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadBackupCodes = () => {
    const content = backupCodes.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '2fa-backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (step === 'verify') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium">Scan QR Code</h3>
          <p className="text-sm text-gray-500">
            Scan this QR code with your authenticator app
          </p>
        </div>

        {qrCode && (
          <div className="flex justify-center">
            <Image
              src={qrCode}
              alt="2FA QR Code"
              width={200}
              height={200}
              className="border p-2 rounded"
            />
          </div>
        )}

        <div>
          <Input
            label="Verification Code"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            error={error}
            placeholder="Enter 6-digit code"
            maxLength={6}
          />
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={() => setStep('initial')}
            variant="outline"
            className="w-full"
          >
            Back
          </Button>
          <Button
            onClick={handleVerify}
            className="w-full"
            isLoading={isLoading}
          >
            Verify
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'backup') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium">Save Backup Codes</h3>
          <p className="text-sm text-gray-500">
            Store these codes in a safe place. You can use them to access your account if you lose your authenticator device.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-2">
            {backupCodes.map((code, index) => (
              <div
                key={code}
                className="font-mono text-sm bg-white p-2 rounded border"
              >
                {code}
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={downloadBackupCodes}
            variant="outline"
            className="w-full"
          >
            Download Codes
          </Button>
          <Button
            onClick={() => setStep('initial')}
            className="w-full"
          >
            Done
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
        <p className="text-sm text-gray-500">
          Add an extra layer of security to your account
        </p>
      </div>

      {session?.user.twoFactorEnabled ? (
        <div>
          <p className="text-sm text-green-600 mb-4">
            ✓ Two-factor authentication is enabled
          </p>
          <Button
            onClick={handleDisable2FA}
            variant="destructive"
            className="w-full"
            isLoading={isLoading}
          >
            Disable 2FA
          </Button>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-500 mb-4">
            Use an authenticator app like Google Authenticator or Authy to add an extra layer of security to your account.
          </p>
          <Button
            onClick={handleEnable2FA}
            className="w-full"
            isLoading={isLoading}
          >
            Enable 2FA
          </Button>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
