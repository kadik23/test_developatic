import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/react';
import { useNotifications } from '@/hooks/useNotifications';

interface Filters {
  search: string | null;
  sort_by: string;
  sort_order: string;
  per_page: number;
}

export function useUserForm(users: any, filters: Filters) {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const { showSuccess, showError } = useNotifications();

  const handleDelete = (id: number) => {
    setLoading(true);
    Inertia.delete(`/users/${id}`, {
      onFinish: () => setLoading(false),
      onSuccess: () => showSuccess('User deleted successfully!', 'User Deleted'),
      onError: (errors) => {
        const errorMessage = errors?.message || 'Failed to delete user';
        showError(errorMessage, 'Delete Failed');
      },
    });
  };

  const handleSearch = (value: string) => {
    router.get('/users', { 
      search: value,
      sort_by: filters.sort_by,
      sort_order: filters.sort_order,
      per_page: filters.per_page,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const handleSort = (sortBy: string, sortOrder: string) => {
    router.get('/users', {
      search: filters.search,
      sort_by: sortBy,
      sort_order: sortOrder,
      per_page: filters.per_page,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const handlePageChange = (page: number) => {
    router.get('/users', {
      search: filters.search,
      sort_by: filters.sort_by,
      sort_order: filters.sort_order,
      per_page: filters.per_page,
      page: page,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const handlePerPageChange = (perPage: number) => {
    router.get('/users', {
      search: filters.search,
      sort_by: filters.sort_by,
      sort_order: filters.sort_order,
      per_page: perPage,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  return {
    loading,
    searchValue,
    setSearchValue,
    handleDelete,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePerPageChange,
  };
} 