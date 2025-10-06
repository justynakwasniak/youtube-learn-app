import { useState, useCallback } from 'react';
import { getVideosByCategory, searchVideos, getCategories, getVideoDetails } from './api';

type ApiCall<TArgs extends any[], TResp> = (...args: TArgs) => Promise<TResp>;

export interface UseYouTubeApiState<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
}

export function useApiCall<TArgs extends any[], TResp>(fn: ApiCall<TArgs, TResp>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TResp | null>(null);

  const call = useCallback(async (...args: TArgs) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fn(...args);
      setData(resp);
      return resp;
    } catch (e: any) {
      const message = e?.message || 'Request failed';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [fn]);

  return { loading, error, data, call };
}

export function useYouTubeApi() {
  const getVideosByCategoryCall = useApiCall(getVideosByCategory);
  const searchVideosCall = useApiCall(searchVideos);
  const getCategoriesCall = useApiCall(getCategories);
  const getVideoDetailsCall = useApiCall(getVideoDetails);

  return {
    getVideosByCategory: getVideosByCategoryCall,
    searchVideos: searchVideosCall,
    getCategories: getCategoriesCall,
    getVideoDetails: getVideoDetailsCall,
  };
}


