import { useCallback } from 'react';
import { useYouTubeApi, mockVideos, CATEGORIES, MAX_VIDEOS_PER_CATEGORY } from '../utils';
import { Video, VideosByCategory } from '../utils';
import { useQuery } from '@tanstack/react-query';

export const useVideosLoader = () => {
  const { getVideosByCategory } = useYouTubeApi();

  const formatResults = useCallback((results: any): Video[] => {
    return results.items?.slice(0, MAX_VIDEOS_PER_CATEGORY).map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium?.url || '',
      publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString('pl-PL'),
    })) || [];
  }, []);

  const fetchVideosByCategory = useCallback(async () => {
    const videosByCategory: VideosByCategory = {};
    await Promise.all(
      CATEGORIES.map(async (category) => {
        try {
          const res = await getVideosByCategory.call(category);
          videosByCategory[category] = formatResults(res);
        } catch {
          videosByCategory[category] = mockVideos[category];
        }
      })
    );
    return videosByCategory;
  }, [getVideosByCategory, formatResults]);

  const { data: videosData = mockVideos, isLoading, refetch } = useQuery({
    queryKey: ['videosByCategory'],
    queryFn: fetchVideosByCategory,
    staleTime: 1000 * 60 * 5,
  });

  return { videosData, isLoading, reload: refetch };
};
