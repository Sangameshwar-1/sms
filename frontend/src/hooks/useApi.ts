import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataService } from '../services/dataService';

/**
 * Custom hook to fetch data from any API endpoint using React Query.
 * Provides automatic caching, background refetching, and offline resilience.
 */
export function useApiData<T = any>(endpoint: string, enabled: boolean = true) {
  return useQuery<T>({
    queryKey: ['api', endpoint],
    queryFn: () => dataService.fetchGenericData(endpoint),
    enabled,
  });
}

/**
 * Custom hook for creating records.
 * Automatically invalidates the relevant query cache on success.
 */
export function useCreateData(endpoint: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => dataService.createGenericData(endpoint, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api', endpoint] });
    },
  });
}

/**
 * Custom hook for updating records.
 */
export function useUpdateData(endpoint: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) =>
      dataService.updateGenericData(endpoint, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api', endpoint] });
    },
  });
}

/**
 * Custom hook for deleting records.
 */
export function useDeleteData(endpoint: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => dataService.deleteGenericData(endpoint, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api', endpoint] });
    },
  });
}

/**
 * Hook to detect online/offline status.
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return isOnline;
}
