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
import { 
  apiService,
  Video, 
  VideosByCategory, 
  CATEGORIES, 
  MAX_VIDEOS_PER_CATEGORY, 
  mockVideos,
  SearchIcon,
  SettingsIcon
} from '../utils';
import { COLORS, TYPOGRAPHY, SPACING, commonStyles } from '../styles';

const { width } = Dimensions.get('window');

// Types
interface MainAppScreenProps {}

interface YouTubeSearchResult {
  items?: Array<{
    id: { videoId: string };
    snippet: {
      title: string;
      publishedAt: string;
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
  const [isLoading, setIsLoading] = useState(true);

  //filmy z API przy starcie
  useEffect(() => {
    loadVideosFromAPI();
  }, []);

  const formatYouTubeResults = useCallback((results: YouTubeSearchResult): Video[] => {
    return results.items?.slice(0, MAX_VIDEOS_PER_CATEGORY).map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url || '',
      publishedAt: item.snippet.publishedAt ? new Date(item.snippet.publishedAt).toLocaleDateString('pl-PL') : 'N/A'
    })) || [];
  }, []);

  const loadVideosFromAPI = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const videosByCategory: VideosByCategory = {};
      
      //Promise.allSettled dla równoległego ładowania
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
    } finally {
      setIsLoading(false);
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
        publishedAt: video.publishedAt,
        duration: '15:30'
      }
    });
  }, [router]);

  const handleSettings = useCallback((): void => {
    console.log('Settings clicked');
  }, []);

  const renderSkeletonVideo = useCallback(() => (
    <View key={`skeleton-${Math.random()}`} style={styles.videoThumbnail}>
      <View style={styles.skeletonThumbnail} />
      <View style={styles.skeletonTitle} />
      <View style={styles.skeletonDate} />
    </View>
  ), []);

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
      <Text style={styles.videoTitle} numberOfLines={2}>{video.title || 'No Title'}</Text>
      <Text style={styles.videoViews}>{video.publishedAt}</Text>
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
        {isLoading ? Array.from({ length: 4 }, (_, index) => renderSkeletonVideo()) : videos.map(renderVideoThumbnail)}
      </ScrollView>
    </View>
  ), [handleShowMore, renderVideoThumbnail, renderSkeletonVideo, isLoading]);

  // Memoize categories to prevent unnecessary re-renders
  const categoriesList = useMemo(() => 
    Object.entries(videosData).map(([category, videos]) => 
      renderCategory(category, videos)
    ), [videosData, renderCategory]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.searchIcon}
            accessibilityRole="button"
            accessibilityLabel="Search icon"
          >
            <SearchIcon width={20} height={20} color="#666" />
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
          <SettingsIcon width={24} height={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Video categories"
      >
        {categoriesList}
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

export default MainAppScreen;


// Using design tokens from styles

const styles = StyleSheet.create({
  container: commonStyles.container,
  header: {
    ...commonStyles.header,
    marginBottom: SPACING.margin.lg,
    marginTop: 20,
  },
  searchContainer: {
    ...commonStyles.searchContainer,
    marginRight: SPACING.margin.md,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchIconText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textSecondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  searchInput: commonStyles.searchInput,
  settingsButton: commonStyles.settingsButton,
  settingsIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingTop: SPACING.padding.sm,
    paddingHorizontal: SPACING.padding.lg,
  },
  categoryContainer: {
    marginBottom: 32,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#2B2D42',
    paddingBottom: SPACING.padding.lg,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.margin.md,
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
  videoThumbnail: commonStyles.videoThumbnail,
  thumbnailImage: commonStyles.thumbnailImage,
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 8,
    lineHeight: 20,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'left',
  },
  videoViews: commonStyles.videoViews,
  showMoreLink: {
    paddingVertical: 4,
    paddingHorizontal: SPACING.padding.sm,
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2B2D42',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins_500Medium',
  },
  skeletonThumbnail: {
    width: 180,
    height: 112,
    backgroundColor: '#E0E0E0',
    borderRadius: SPACING.borderRadius.lg,
    marginBottom: SPACING.margin.sm,
  },
  skeletonTitle: {
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 4,
    width: '80%',
  },
  skeletonDate: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    width: '60%',
  },
});
