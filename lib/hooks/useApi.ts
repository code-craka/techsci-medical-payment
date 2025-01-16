import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

interface FetchOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

async function fetchApi(url: string, options: FetchOptions = {}) {
  const response = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
}

// Generic hook for fetching data
export function useApiQuery<T>(
  key: (string | Record<string, string> | undefined)[],
  url: string,
  options?: Omit<UseQueryOptions<T, Error, T>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T, Error>({
    queryKey: key,
    queryFn: () => fetchApi(url),
    ...options,
  });
}

// Generic hook for mutations (create, update, delete)
export function useApiMutation<T>(url: string, method: string = 'POST') {
  const queryClient = useQueryClient();

  return useMutation<T, Error, any>({
    mutationFn: (data) => fetchApi(url, { method, body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('Operation completed successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// Users hooks
export function useUsers() {
  return useApiQuery<any[]>(['users'], '/api/users');
}

export function useCreateUser() {
  return useApiMutation<any>('/api/users');
}

export function useUpdateUser(id: string) {
  return useApiMutation<any>(`/api/users/${id}`, 'PUT');
}

export function useDeleteUser(id: string) {
  return useApiMutation<any>(`/api/users/${id}`, 'DELETE');
}

// Appointments hooks
export function useAppointments(filters?: Record<string, string>) {
  const queryString = filters
    ? `?${new URLSearchParams(filters).toString()}`
    : '';
  return useApiQuery<any[]>(
    ['appointments', filters],
    `/api/appointments${queryString}`
  );
}

export function useCreateAppointment() {
  return useApiMutation<any>('/api/appointments');
}

export function useUpdateAppointment(id: string) {
  return useApiMutation<any>(`/api/appointments/${id}`, 'PUT');
}

// Prices hooks
export function usePrices() {
  return useApiQuery<any[]>(['prices'], '/api/prices');
}

export function useCreatePrice() {
  return useApiMutation<any>('/api/prices');
}

export function useUpdatePrice(id: string) {
  return useApiMutation<any>(`/api/prices/${id}`, 'PUT');
}

// Fakes hooks
export function useFakes(filters?: Record<string, string>) {
  const queryString = filters
    ? `?${new URLSearchParams(filters).toString()}`
    : '';
  return useApiQuery<any[]>(
    ['fakes', filters],
    `/api/fakes${queryString}`
  );
}

export function useCreateFake() {
  return useApiMutation<any>('/api/fakes');
}

export function useUpdateFake(id: string) {
  return useApiMutation<any>(`/api/fakes/${id}`, 'PUT');
}
