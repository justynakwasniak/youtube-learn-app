import { useCallback } from 'react';
import { useYouTubeApi, extendedMockSearchResults } from '../utils';
import { ExtendedVideo } from '../utils';
import { useQuery } from '@tanstack/react-query';

export const useSearchVideos = (formatResults: (res: any) => ExtendedVideo[], getFallback: (term: string) => ExtendedVideo[], term: string, sortOption?: string) => {
  const { searchVideos } = useYouTubeApi();

  const queryFn = useCallback(async () => {
    if (!term) return [];
    try {
      const response = await searchVideos.call(term, sortOption);
      const results = formatResults(response);
      return results.length ? results : getFallback(term);
    } catch {
      return getFallback(term);
    }
  }, [term, sortOption, formatResults, getFallback, searchVideos]);

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['search', term, sortOption],
    queryFn,
    enabled: !!term,
    staleTime: 2 * 60 * 1000,
  });

  return { results, isLoading };
};
