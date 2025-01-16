'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import UAParser from 'ua-parser-js';

interface LoginRecord {
  id: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  status: string;
  reason?: string;
  createdAt: string;
}

export function LoginHistory() {
  const { data: session } = useSession();
  const [history, setHistory] = useState<LoginRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/auth/login-history');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch login history');
        }

        setHistory(data.history);
      } catch (error) {
        toast.error('Failed to load login history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    switch (status) {
      case 'success':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'blocked':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatUserAgent = (userAgent: string) => {
    try {
      const parser = new (UAParser as any)();
      const result = parser.getResult();
      return `${result.browser.name} on ${result.os.name}`;
    } catch {
      return userAgent;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Login History</h3>
        <p className="text-sm text-gray-500">
          Recent login attempts to your account
        </p>
      </div>

      <div className="overflow-hidden bg-white shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                Date & Time
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Location
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Device
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {history.map((record) => (
              <tr key={record.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                  {format(new Date(record.createdAt), 'PPpp')}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {record.location || (
                    <span className="text-gray-400">Unknown</span>
                  )}
                  <br />
                  <span className="text-xs text-gray-400">
                    {record.ipAddress}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {formatUserAgent(record.userAgent)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className={getStatusBadge(record.status)}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                  {record.reason && (
                    <p className="mt-1 text-xs text-gray-500">
                      {record.reason}
                    </p>
                  )}
                </td>
              </tr>
            ))}

            {history.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-sm text-gray-500"
                >
                  No login history available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
