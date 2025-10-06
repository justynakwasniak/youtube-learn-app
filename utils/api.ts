import { API_BASE_URL, API_VIDEOS_ENDPOINT, API_SEARCH_ENDPOINT, API_CATEGORIES_ENDPOINT, YOUTUBE_API_KEY } from '@env';
import axios from 'axios';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL || 'https://www.googleapis.com/youtube/v3',
  API_KEY: YOUTUBE_API_KEY || '',
  ENDPOINTS: {
    VIDEOS: API_VIDEOS_ENDPOINT || '/search',
    SEARCH: API_SEARCH_ENDPOINT || '/search',
    CATEGORIES: API_CATEGORIES_ENDPOINT || '/videoCategories',
  }
};

console.log('API_CONFIG loaded:', {
  BASE_URL: API_CONFIG.BASE_URL,
  API_KEY: API_CONFIG.API_KEY ? `${API_CONFIG.API_KEY.substring(0, 10)}...` : 'EMPTY',
  ENDPOINTS: API_CONFIG.ENDPOINTS
});



export const axiosClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
});

axiosClient.interceptors.request.use((config) => {
  const params = new URLSearchParams(config.params as Record<string, string> || {});
  if (API_CONFIG.API_KEY) {
    params.set('key', API_CONFIG.API_KEY);
  }
  return { ...config, params };
});

async function fetchData<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  console.log('Making API request to:', endpoint);
  console.log('API Key present:', !!API_CONFIG.API_KEY);
  console.log('Request params:', params);
  const response = await axiosClient.get<T>(endpoint, { params });
  return response.data as T;
}

export async function getVideosByCategory(category: string) {
  return fetchData(API_CONFIG.ENDPOINTS.VIDEOS, {
    part: 'snippet',
    q: category,
    type: 'video',
    maxResults: '10',
    order: 'relevance'
  });
}

export async function searchVideos(query: string, sortBy?: string) {
  const order = sortBy === 'Most Popular' ? 'viewCount' : 
                sortBy === 'Upload Date Latest' ? 'date' : 
                sortBy === 'Upload Date Oldest' ? 'date' : 'relevance';
  
  return fetchData(API_CONFIG.ENDPOINTS.SEARCH, {
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: '10',
    order: order
  });
}

export async function getCategories() {
  return fetchData(API_CONFIG.ENDPOINTS.CATEGORIES, {
    part: 'snippet',
    regionCode: 'US'
  });
}

export async function getVideoDetails(videoId: string) {
  return fetchData('/videos', {
    part: 'snippet,statistics,contentDetails',
    id: videoId
  });
}
