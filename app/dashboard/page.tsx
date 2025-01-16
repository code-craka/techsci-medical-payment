'use client';

import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useState } from 'react';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useState({
    city: '',
    gccCountry: '',
    startDate: '',
    endDate: '',
    passport: '',
    center: '',
  });

  const stats = [
    { id: 1, name: 'New', value: '0', color: 'text-blue-600' },
    { id: 2, name: 'Processing', value: '163', color: 'text-yellow-600' },
    { id: 3, name: 'Success', value: '961', color: 'text-green-600' },
    { id: 4, name: 'Canceled', value: '0', color: 'text-red-600' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search params:', searchParams);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Search Filters */}
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <select
                id="city"
                value={searchParams.city}
                onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select City</option>
                <option value="dhaka">Dhaka</option>
                <option value="chittagong">Chittagong</option>
                {/* Add more cities */}
              </select>
            </div>

            <div>
              <label htmlFor="gccCountry" className="block text-sm font-medium text-gray-700">
                GCC Country
              </label>
              <select
                id="gccCountry"
                value={searchParams.gccCountry}
                onChange={(e) => setSearchParams({ ...searchParams, gccCountry: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Country</option>
                <option value="saudi">Saudi Arabia</option>
                <option value="uae">UAE</option>
                {/* Add more countries */}
              </select>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={searchParams.startDate}
                onChange={(e) => setSearchParams({ ...searchParams, startDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={searchParams.endDate}
                onChange={(e) => setSearchParams({ ...searchParams, endDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="passport" className="block text-sm font-medium text-gray-700">
                Passport
              </label>
              <input
                type="text"
                id="passport"
                value={searchParams.passport}
                onChange={(e) => setSearchParams({ ...searchParams, passport: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="center" className="block text-sm font-medium text-gray-700">
                Medical Center
              </label>
              <select
                id="center"
                value={searchParams.center}
                onChange={(e) => setSearchParams({ ...searchParams, center: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Center</option>
                <option value="center1">Medical Center 1</option>
                <option value="center2">Medical Center 2</option>
                {/* Add more centers */}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Stats */}
        <DashboardStats />

        {/* Recent Activity */}
        <RecentActivity />

        {/* Results Table */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center text-gray-500">
              No new appointments available today..
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}