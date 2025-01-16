'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface Activity {
  id: string;
  type: string;
  user: string;
  details: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated data - replace with actual API call
    const mockActivities: Activity[] = [
      {
        id: '1',
        type: 'Process',
        user: 'John Doe',
        details: 'Medical test completed',
        timestamp: new Date().toISOString(),
        status: 'success',
      },
      {
        id: '2',
        type: 'Payment',
        user: 'Jane Smith',
        details: 'Payment received for medical test',
        timestamp: new Date().toISOString(),
        status: 'success',
      },
      {
        id: '3',
        type: 'Document',
        user: 'Mike Johnson',
        details: 'Documents submitted for verification',
        timestamp: new Date().toISOString(),
        status: 'pending',
      },
    ];

    setActivities(mockActivities);
    setIsLoading(false);
  }, []);

  const getStatusBadge = (status: Activity['status']) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    switch (status) {
      case 'success':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Recent Activity
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <ul role="list" className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <li key={activity.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {activity.type[0]}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.details}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={getStatusBadge(activity.status)}>
                    {activity.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6">
        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            View all activity<span className="sr-only"> activity log</span>
          </a>
        </div>
      </div>
    </div>
  );
}
