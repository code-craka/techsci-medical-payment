'use client';

interface StatItem {
  id: number;
  name: string;
  value: string;
  color: string;
  change?: string;
  trend?: 'up' | 'down';
}

export function DashboardStats() {
  const stats: StatItem[] = [
    { 
      id: 1, 
      name: 'New', 
      value: '0', 
      color: 'text-blue-600',
      change: '+0%',
      trend: 'up'
    },
    { 
      id: 2, 
      name: 'Processing', 
      value: '163', 
      color: 'text-yellow-600',
      change: '+12.3%',
      trend: 'up'
    },
    { 
      id: 3, 
      name: 'Success', 
      value: '961', 
      color: 'text-green-600',
      change: '+4.75%',
      trend: 'up'
    },
    { 
      id: 4, 
      name: 'Canceled', 
      value: '0', 
      color: 'text-red-600',
      change: '-2.1%',
      trend: 'down'
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-gray-50 p-3">
              <div className={`h-6 w-6 ${stat.color}`} />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className={`text-2xl font-semibold ${stat.color}`}>
              {stat.value}
            </p>
            {stat.change && (
              <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </p>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  View all<span className="sr-only"> {stat.name} stats</span>
                </a>
              </div>
            </div>
          </dd>
        </div>
      ))}
    </div>
  );
}
