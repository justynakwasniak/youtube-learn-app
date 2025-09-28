import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Footer from '../components/Footer';
import { apiService } from '../utils/api';
import { 
  Video, 
  VideosByCategory, 
  CATEGORIES, 
  MAX_VIDEOS_PER_CATEGORY, 
  mockVideos 
} from '../utils/mockData';

const { width } = Dimensions.get('window');

// Types
interface MainAppScreenProps {}

interface YouTubeSearchResult {
  items?: Array<{
    id: { videoId: string };
    snippet: {
      title: string;
      thumbnails: {
        medium?: { url: string };
        default?: { url: string };
      };
    };
  }>;
}

const MainAppScreen: React.FC<MainAppScreenProps> = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [videosData, setVideosData] = useState(mockVideos);

  // Ładuj filmy z API przy starcie
  useEffect(() => {
    loadVideosFromAPI();
  }, []);

  const formatYouTubeResults = useCallback((results: YouTubeSearchResult): Video[] => {
    return results.items?.slice(0, MAX_VIDEOS_PER_CATEGORY).map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url || '',
      views: 'N/A' // YouTube API nie zwraca views w search
    })) || [];
  }, []);

  const loadVideosFromAPI = useCallback(async (): Promise<void> => {
    try {
      const videosByCategory: VideosByCategory = {};
      
      // Użyj Promise.allSettled dla równoległego ładowania
      const categoryPromises = CATEGORIES.map(async (category) => {
        try {
          const results = await apiService.getVideosByCategory(category) as YouTubeSearchResult;
          const formattedVideos = formatYouTubeResults(results);
          
          return {
            category,
            videos: formattedVideos.length > 0 ? formattedVideos : mockVideos[category]
          };
        } catch (error) {
          console.error(`Error loading ${category}:`, error);
          return {
            category,
            videos: mockVideos[category]
          };
        }
      });

      const results = await Promise.allSettled(categoryPromises);
      
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          videosByCategory[result.value.category] = result.value.videos;
        }
      });
      
      setVideosData(videosByCategory);
    } catch (error) {
      console.error('Error loading videos:', error);
      setVideosData(mockVideos);
    }
  }, [formatYouTubeResults]);

  const handleSearch = useCallback((): void => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push({
        pathname: '/search',
        params: { query: trimmedQuery }
      });
    }
  }, [searchQuery, router]);
  
  const handleShowMore = useCallback((category: string): void => {
    router.push({
      pathname: '/search',
      params: { category }
    });
  }, [router]);
  
  const handleVideoPress = useCallback((video: Video): void => {
    console.log('Video pressed:', video.title);
    router.push({
      pathname: '/video-details',
      params: {
        videoId: String(video.id),
        title: video.title,
        views: video.views,
        duration: '15:30' // Mock duration
      }
    });
  }, [router]);

  const handleSettings = useCallback((): void => {
    // Tutaj będzie nawigacja do ustawień
    console.log('Settings clicked');
  }, []);

  const renderVideoThumbnail = useCallback((video: Video) => (
    <TouchableOpacity 
      key={video.id} 
      style={styles.videoThumbnail}
      onPress={() => handleVideoPress(video)}
      accessibilityRole="button"
      accessibilityLabel={`Watch video: ${video.title}`}
      accessibilityHint="Opens video details"
    >
      <Image 
        source={{ uri: video.thumbnail }} 
        style={styles.thumbnailImage}
        accessibilityLabel={`Thumbnail for ${video.title}`}
      />
      <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
      <Text style={styles.videoViews}>{video.views} views</Text>
    </TouchableOpacity>
  ), [handleVideoPress]);

  const renderCategory = useCallback((categoryName: string, videos: Video[]) => (
    <View key={categoryName} style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{categoryName}</Text>
        <TouchableOpacity
          style={styles.showMoreLink}
          onPress={() => handleShowMore(categoryName)}
          accessibilityRole="button"
          accessibilityLabel={`Show more ${categoryName} videos`}
          accessibilityHint="Opens search results for this category"
        >
          <Text style={styles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
        contentContainerStyle={styles.scrollContent}
        accessibilityLabel={`${categoryName} videos`}
      >
        {videos.map(renderVideoThumbnail)}
      </ScrollView>
    </View>
  ), [handleShowMore, renderVideoThumbnail]);

  // Memoize categories to prevent unnecessary re-renders
  const categoriesList = useMemo(() => 
    Object.entries(videosData).map(([category, videos]) => 
      renderCategory(category, videos)
    ), [videosData, renderCategory]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header z search barem */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TouchableOpacity 
            style={styles.searchIcon}
            accessibilityRole="button"
            accessibilityLabel="Search icon"
          >
            <Text style={styles.searchIconText}>🔍</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Videos"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            accessibilityLabel="Search videos"
            accessibilityHint="Enter search terms to find videos"
          />
        </View>
        <TouchableOpacity 
          style={styles.settingsButton} 
          onPress={handleSettings}
          accessibilityRole="button"
          accessibilityLabel="Settings"
          accessibilityHint="Opens app settings"
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Główna zawartość z kategoriami */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Video categories"
      >
        {categoriesList}
      </ScrollView>

      {/* Stopka */}
      <Footer />
    </SafeAreaView>
  );
};

export default MainAppScreen;

// Design tokens
const COLORS = {
  background: '#fff',
  primary: '#007AFF',
  secondary: '#f5f5f5',
  border: '#e0e0e0',
  text: '#333',
  textSecondary: '#666',
  textMuted: '#999',
  shadow: '#000',
} as const;

const SIZES = {
  borderRadius: 16,
  borderWidth: 2,
  padding: {
    small: 8,
    medium: 12,
    large: 16,
  },
  margin: {
    small: 8,
    medium: 12,
    large: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
} as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding.medium,
    paddingHorizontal: SIZES.padding.large,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SIZES.margin.large,
    marginTop: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: 15,
    marginRight: SIZES.margin.medium,
    borderWidth: SIZES.borderWidth,
    borderColor: '#2B2D42',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchIconText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  searchInput: {
    flex: 1,
    paddingVertical: SIZES.padding.medium,
    fontSize: 16,
    color: COLORS.text,
  },
  settingsButton: {
    padding: SIZES.padding.small,
  },
  settingsIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingTop: SIZES.padding.small,
    paddingHorizontal: SIZES.padding.large,
  },
  categoryContainer: {
    marginBottom: 32,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#2B2D42',
    paddingBottom: SIZES.padding.large,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin.medium,
    paddingHorizontal: 4,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: 'Poppins_700Bold',
  },
  horizontalScroll: {
    paddingLeft: 4,
  },
  scrollContent: {
    paddingRight: 4,
  },
  videoThumbnail: {
    width: 180,
    marginRight: SIZES.margin.large,
  },
  thumbnailImage: {
    width: 180,
    height: 112,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.secondary,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SIZES.margin.small,
    lineHeight: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  videoViews: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontFamily: 'Poppins_400Regular',
  },
  showMoreLink: {
    paddingVertical: 4,
    paddingHorizontal: SIZES.padding.small,
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2B2D42',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins_500Medium',
  },
});
