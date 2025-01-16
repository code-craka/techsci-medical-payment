import { Metadata } from 'next';
import { LoginForm } from '@/components/forms/LoginForm';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'TechSci - Medical Center Payments System',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Image
            src="/logo.svg"
            alt="TechSci"
            width={284}
            height={82}
            className="mx-auto h-12 w-auto"
            priority
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Need help?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <a
                href="mailto:support@example.com"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Contact support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}