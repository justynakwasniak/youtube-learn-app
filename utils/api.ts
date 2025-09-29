import { API_BASE_URL, API_VIDEOS_ENDPOINT, API_SEARCH_ENDPOINT, API_CATEGORIES_ENDPOINT, YOUTUBE_API_KEY } from '@env';

// API Configuration
export const API_CONFIG = {
  BASE_URL: API_BASE_URL || 'https://www.googleapis.com/youtube/v3',
  API_KEY: YOUTUBE_API_KEY || '',
  ENDPOINTS: {
    VIDEOS: API_VIDEOS_ENDPOINT || '/search',
    SEARCH: API_SEARCH_ENDPOINT || '/search',
    CATEGORIES: API_CATEGORIES_ENDPOINT || '/videoCategories',
  }
};

// Debug logging
console.log('API_CONFIG loaded:', {
  BASE_URL: API_CONFIG.BASE_URL,
  API_KEY: API_CONFIG.API_KEY ? `${API_CONFIG.API_KEY.substring(0, 10)}...` : 'EMPTY',
  ENDPOINTS: API_CONFIG.ENDPOINTS
});



// API Service Class
export class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  // Generic fetch method for YouTube API
  private async fetchData<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const urlParams = new URLSearchParams({
      key: API_CONFIG.API_KEY,
      ...params
    });
    
    const url = `${this.baseURL}${endpoint}?${urlParams}`;
    
    console.log('Making API request to:', url);
    console.log('API Key present:', !!API_CONFIG.API_KEY);
    console.log('Request params:', params);
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('API Success:', { itemCount: data.items?.length || 0 });
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Get videos by category (search for videos in specific category)
  async getVideosByCategory(category: string) {
    return this.fetchData(API_CONFIG.ENDPOINTS.VIDEOS, {
      part: 'snippet',
      q: category,
      type: 'video',
      maxResults: '10',
      order: 'relevance'
    });
  }

  // Search videos
  async searchVideos(query: string, sortBy?: string) {
    const order = sortBy === 'Most Popular' ? 'viewCount' : 
                  sortBy === 'Upload Date Latest' ? 'date' : 
                  sortBy === 'Upload Date Oldest' ? 'date' : 'relevance';
    
    return this.fetchData(API_CONFIG.ENDPOINTS.SEARCH, {
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: '10',
      order: order
    });
  }

  // Get all categories
  async getCategories() {
    return this.fetchData(API_CONFIG.ENDPOINTS.CATEGORIES, {
      part: 'snippet',
      regionCode: 'US'
    });
  }

  // Get video details
  async getVideoDetails(videoId: string) {
    return this.fetchData('/videos', {
      part: 'snippet,statistics,contentDetails',
      id: videoId
    });
  }
}

// Export singleton instance
export const apiService = new ApiService();
