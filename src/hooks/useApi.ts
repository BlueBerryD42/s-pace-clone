import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../types/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
}

// Generic hook for API calls
export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions = {}
) {
  const { immediate = false, onSuccess, onError } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const result = await apiFunction(...args);
        setState({ data: result, loading: false, error: null });
        onSuccess?.(result);
        return result;
      } catch (error) {
        const apiError = error as ApiError;
        setState(prev => ({ ...prev, loading: false, error: apiError }));
        onError?.(apiError);
        throw error;
      }
    },
    [apiFunction, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hook for API calls with automatic loading states
export function useAsyncOperation<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (operation: () => Promise<T>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await operation();
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (error) {
      const apiError = error as ApiError;
      setState(prev => ({ ...prev, loading: false, error: apiError }));
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
