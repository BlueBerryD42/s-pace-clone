import React, { useEffect, useState } from 'react';
import { Layout, ProtectedRoute } from '../components/layout';
import { Button, LoadingSpinner } from '../components/common';
import { useAuthContext } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import { User, PaginatedResponse } from '../types/api';
import { useApi } from '../hooks/useApi';
import { formatDate } from '../utils/formatters';

export function DashboardPage() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState<User[]>([]);
  
  const {
    execute: fetchUsers,
    loading: usersLoading,
    error: usersError,
  } = useApi(userService.getUsers.bind(userService), {
    onSuccess: (response: PaginatedResponse<User>) => {
      setUsers(response.data);
    },
  });

  useEffect(() => {
    fetchUsers({ page: 1, limit: 10, sort: 'createdAt', order: 'desc' });
  }, [fetchUsers]);

  const stats = [
    {
      name: 'Total Users',
      value: users.length,
      icon: '👥',
      color: 'bg-blue-500',
    },
    {
      name: 'Active Sessions',
      value: '24',
      icon: '🟢',
      color: 'bg-green-500',
    },
    {
      name: 'API Calls Today',
      value: '1,234',
      icon: '📊',
      color: 'bg-purple-500',
    },
    {
      name: 'System Status',
      value: 'Healthy',
      icon: '💚',
      color: 'bg-emerald-500',
    },
  ];

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your application today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              {usersLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="lg" text="Loading users..." />
                </div>
              ) : usersError ? (
                <div className="text-center py-8">
                  <p className="text-red-600">Error loading users: {usersError.message}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => fetchUsers({ page: 1, limit: 10 })}
                  >
                    Retry
                  </Button>
                </div>
              ) : users.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.slice(0, 5).map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium">
                                  {user.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No users found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
