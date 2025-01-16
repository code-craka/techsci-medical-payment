'use client';

import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useState } from 'react';

export default function FakesPage() {
  const [searchParams, setSearchParams] = useState({
    passport: '',
    center: '',
    status: '',
  });

  const [fakes] = useState([
    {
      id: 1,
      passport: 'BF0123456',
      name: 'John Smith',
      center: 'Center A',
      date: '2025-01-20',
      status: 'pending',
      createdAt: '2025-01-14',
    },
    // Add more fake appointments
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Fake Appointments</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage and track fake appointments in the system.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Create Fake
            </button>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="passport" className="block text-sm font-medium text-gray-700">
                Passport Number
              </label>
              <input
                type="text"
                id="passport"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={searchParams.passport}
                onChange={(e) => setSearchParams({ ...searchParams, passport: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="center" className="block text-sm font-medium text-gray-700">
                Center
              </label>
              <select
                id="center"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={searchParams.center}
                onChange={(e) => setSearchParams({ ...searchParams, center: e.target.value })}
              >
                <option value="">All Centers</option>
                <option value="center-a">Center A</option>
                <option value="center-b">Center B</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={searchParams.status}
                onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </form>
        </div>

        {/* Fakes Table */}
        <div className="bg-white shadow rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Passport
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Center
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Created At
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {fakes.map((fake) => (
                  <tr key={fake.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{fake.passport}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{fake.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{fake.center}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{fake.date}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        fake.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        fake.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {fake.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{fake.createdAt}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}