import { Metadata } from 'next';
import { TwoFactorSetup } from '@/components/settings/TwoFactorSetup';
import { LoginHistory } from '@/components/settings/LoginHistory';

export const metadata: Metadata = {
  title: 'Security Settings - Wafid Admin',
  description: 'Manage your account security settings',
};

export default function SecuritySettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Security Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account security and monitor login activity
          </p>
        </div>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <TwoFactorSetup />
          </div>
        </div>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <LoginHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
