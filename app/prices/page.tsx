'use client';

import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useState } from 'react';

export default function PricesPage() {
  const [prices] = useState([
    {
      id: 1,
      service: 'Medical Test',
      category: 'Medical',
      country: 'Saudi Arabia',
      price: 150,
      status: 'active',
    },
    // Add more prices
  ]);

  const [newPrice, setNewPrice] = useState({
    service: '',
    category: '',
    country: '',
    price: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement price creation logic
    console.log('New price:', newPrice);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Price Management</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage service prices for different categories and countries.
            </p>
          </div>
        </div>

        {/* Add New Price Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Price</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-4">
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                Service Name
              </label>
              <input
                type="text"
                id="service"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newPrice.service}
                onChange={(e) => setNewPrice({ ...newPrice, service: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newPrice.category}
                onChange={(e) => setNewPrice({ ...newPrice, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="medical">Medical</option>
                <option value="visa">Visa</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                id="country"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newPrice.country}
                onChange={(e) => setNewPrice({ ...newPrice, country: e.target.value })}
                required
              >
                <option value="">Select Country</option>
                <option value="saudi-arabia">Saudi Arabia</option>
                <option value="uae">UAE</option>
                <option value="kuwait">Kuwait</option>
                <option value="qatar">Qatar</option>
                <option value="bahrain">Bahrain</option>
                <option value="oman">Oman</option>
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price (USD)
              </label>
              <input
                type="number"
                id="price"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newPrice.price}
                onChange={(e) => setNewPrice({ ...newPrice, price: e.target.value })}
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="sm:col-span-4">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Price
              </button>
            </div>
          </form>
        </div>

        {/* Prices Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Service
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Country
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Price (USD)
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
              {prices.map((price) => (
                <tr key={price.id}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{price.service}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{price.category}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{price.country}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${price.price}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      price.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {price.status}
                    </span>
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
    </DashboardLayout>
  );
}