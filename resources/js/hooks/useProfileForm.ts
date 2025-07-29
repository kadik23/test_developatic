import { useForm, router } from '@inertiajs/react';
import { useNotifications } from '@/hooks/useNotifications';
import { useCallback } from 'react';

export function useProfileForm(user: { id: number; name: string; email: string; date_of_birth: string | null; }) {
  const { data, setData, processing, errors } = useForm({
    name: user.name,
    email: user.email,
    date_of_birth: user.date_of_birth,
  });
  const { showSuccess, showError } = useNotifications();

  const handleSubmit = useCallback((values: any) => {
    const formData = {
      name: values.name,
      email: values.email,
      date_of_birth: values.date_of_birth ? values.date_of_birth.format('YYYY-MM-DD') : null,
    };
    router.put('/profile', formData, {
      onSuccess: () => {
        showSuccess('Profile information updated successfully!', 'Profile Updated');
      },
      onError: (errors) => {
        const errorMessage = errors?.message || 'Failed to update profile';
        showError(errorMessage, 'Update Failed');
      },
    });
  }, [showSuccess, showError]);

  return {
    data,
    setData,
    processing,
    errors,
    handleSubmit,
  };
} 