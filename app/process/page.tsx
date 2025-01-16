'use client';

import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useState } from 'react';

export default function ProcessPage() {
  const [searchParams, setSearchParams] = useState({
    passport: '',
    category: '',
    status: '',
    date: '',
  });

  const [processes] = useState([
    {
      id: 1,
      passport: 'BF0123456',
      name: 'John Smith',
      category: 'Medical',
      date: '2025-01-20',
      status: 'processing',
      center: 'Center A',
      city: 'Dhaka',
      travelTo: 'Saudi Arabia',
    },
    // Add more processes
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    // Implement status change functionality
    console.log('Changing status for', id, 'to', newStatus);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Process Management</h1>
            <p className="mt-2 text-sm text-gray-700">
              Track and manage all medical appointments and their processing status.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              New Process
            </button>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-6 sm:grid-cols-4">
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
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={searchParams.category}
                onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
              >
                <option value="">All Categories</option>
                <option value="medical">Medical</option>
                <option value="visa">Visa</option>
                <option value="other">Other</option>
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
                <option value="new">New</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={searchParams.date}
                onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
              />
            </div>
          </form>
        </div>

        {/* Process Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
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
                    Category
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Center
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    City
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Travel To
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {processes.map((process) => (
                  <tr key={process.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{process.passport}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{process.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{process.category}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{process.date}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{process.center}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{process.city}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{process.travelTo}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <select
                        className={`rounded-md px-2 py-1 text-xs font-semibold ${
                          process.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          process.status === 'completed' ? 'bg-green-100 text-green-800' :
                          process.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                        value={process.status}
                        onChange={(e) => handleStatusChange(process.id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
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