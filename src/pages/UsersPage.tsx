import React, { useEffect, useState } from 'react';
import { Layout, ProtectedRoute } from '../components/layout';
import { Button, LoadingSpinner, Input } from '../components/common';
import { userService } from '../services/userService';
import type { User, PaginatedResponse } from '../types/api';
import { useApi } from '../hooks/useApi';
import { formatDate } from '../utils/formatters';

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const {
    execute: fetchUsers,
    loading: usersLoading,
    error: usersError,
  } = useApi(userService.getUsers.bind(userService), {
    onSuccess: (response: PaginatedResponse<User>) => {
      setUsers(response.data);
      setTotalPages(response.pagination.totalPages);
    },
  });

  const {
    execute: searchUsers,
    loading: searchLoading,
  } = useApi(userService.searchUsers.bind(userService), {
    onSuccess: (data: User[]) => {
      setUsers(data);
      setTotalPages(1); // Search results are not paginated in this example
    },
  });

  useEffect(() => {
    if (searchTerm.trim()) {
      const debounceTimer = setTimeout(() => {
        searchUsers(searchTerm);
      }, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      fetchUsers({ page: currentPage, limit: 10, sort: 'createdAt', order: 'desc' });
    }
  }, [searchTerm, currentPage, fetchUsers, searchUsers]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const isLoading = usersLoading || searchLoading;

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600 mt-2">
              Manage and view all users in the system.
            </p>
          </div>

          {/* Search and Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:w-96">
                <Input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Button variant="primary">
                Add New User
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {searchTerm ? 'Search Results' : 'All Users'}
              </h2>
            </div>
            
            <div className="p-6">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner size="lg" text="Loading users..." />
                </div>
              ) : usersError ? (
                <div className="text-center py-12">
                  <p className="text-red-600 mb-4">Error loading users: {usersError.message}</p>
                  <Button
                    variant="outline"
                    onClick={() => fetchUsers({ page: currentPage, limit: 10 })}
                  >
                    Retry
                  </Button>
                </div>
              ) : users.length > 0 ? (
                <>
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
                            Last Updated
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium text-white">
                                    {user.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {user.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    ID: {user.id}
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(user.updatedAt, 'relative')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {!searchTerm && totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    {searchTerm ? 'No users found matching your search' : 'No users found'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
