import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Footer from '../components/Footer';
import { 
  apiService, 
  extendedMockSearchResults, 
  mockChannels, 
  ExtendedVideo, 
  Channel,
  SortModal,
  useSortModal,
  SearchIcon,
  BackArrowIcon
} from '../utils';

// Types
interface SearchScreenProps {}

interface YouTubeSearchResult {
  items?: Array<{
    id: { videoId: string };
    snippet: {
      title: string;
      thumbnails: {
        medium?: { url: string };
        default?: { url: string };
      };
      channelTitle: string;
      description: string;
      publishedAt: string;
    };
  }>;
}

const SearchScreen: React.FC<SearchScreenProps> = () => {
  const router = useRouter();
  const { query, category } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState(Array.isArray(query) ? query[0] || '' : query || '');
  const [searchResults, setSearchResults] = useState(extendedMockSearchResults.slice(0, 2));
  const [isLoading, setIsLoading] = useState(false);
  
  // Use sort modal hook
  const {
    showSortModal,
    selectedSortOption,
    handleSortPress,
    handleSortOptionSelect,
    handleConfirmSort,
    handleCloseModal,
  } = useSortModal();

  useEffect(() => {
    const searchTerm = Array.isArray(query) ? query[0] : query || (Array.isArray(category) ? category[0] : category);
    
    if (searchTerm) {
      performSearch(searchTerm); // 🔥 obsługuje zarówno kategorię, jak i frazę
    }
  }, [query, category, selectedSortOption]);
  
  const formatYouTubeResults = useCallback((results: YouTubeSearchResult): ExtendedVideo[] => {
    return results.items?.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url || '',
      views: new Date(item.snippet.publishedAt).toLocaleDateString('pl-PL', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description
    })) || [];
  }, []);

  const getFallbackResults = useCallback((searchTerm: string): ExtendedVideo[] => {
    if (category) {
      return extendedMockSearchResults.filter(v => v.category === category);
    } else if (query) {
      return extendedMockSearchResults.filter(v => 
        v.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return extendedMockSearchResults.slice(0, 2);
    }
  }, [category, query]);

  const performSearch = useCallback(async (searchTerm: string): Promise<void> => {
    if (!searchTerm) return;
    
    setIsLoading(true);
  
    try {
      const results = await apiService.searchVideos(searchTerm, selectedSortOption) as YouTubeSearchResult;
      const formattedResults = formatYouTubeResults(results);
  
      // Fallback jeśli API nic nie zwróci
      if (formattedResults.length === 0) {
        setSearchResults(getFallbackResults(searchTerm));
      } else {
        setSearchResults(formattedResults);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults(getFallbackResults(searchTerm));
    } finally {
      setIsLoading(false);
    }
  }, [selectedSortOption, formatYouTubeResults, getFallbackResults]);
  
  

  const handleSearch = useCallback((): void => {
    const trimmedQuery = typeof searchQuery === 'string' ? searchQuery.trim() : '';
    if (trimmedQuery && trimmedQuery.length > 0) {
      performSearch(trimmedQuery);
    }
  }, [searchQuery, performSearch]);

  const handleBack = useCallback((): void => {
    router.back();
  }, [router]);

  const handleVideoPress = useCallback((video: ExtendedVideo): void => {
    console.log('Video pressed:', video.title);
    router.push({
      pathname: '/video-details',
      params: {
        videoId: String(video.id),
        title: video.title,
        views: video.views,
        duration: video.duration || '15:30'
      }
    });
  }, [router]);


  const renderSearchResult = useCallback((video: ExtendedVideo) => (
    <TouchableOpacity 
      key={video.id} 
      style={styles.searchResult}
      onPress={() => handleVideoPress(video)}
      accessibilityRole="button"
      accessibilityLabel={`Watch video: ${video.title}`}
      accessibilityHint="Opens video details"
    >
      <Image 
        source={{ uri: video.thumbnail }} 
        style={styles.resultThumbnail}
        accessibilityLabel={`Thumbnail for ${video.title}`}
      />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle} numberOfLines={2}>{video.title}</Text>
        <Text style={styles.resultViews}>{video.views} views</Text>
        <Text style={styles.resultDuration}>{video.duration}</Text>
      </View>
    </TouchableOpacity>
  ), [handleVideoPress]);

  // Memoize search results to prevent unnecessary re-renders
  const memoizedSearchResults = useMemo(() => 
    searchResults.map(renderSearchResult), 
    [searchResults, renderSearchResult]
  );

  // Memoize search query display
  const displayQuery = useMemo(() => 
    typeof searchQuery === 'string' ? searchQuery : 
    Array.isArray(category) ? category[0] : 
    category || 'search', 
    [searchQuery, category]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header z search barem */}
      <View style={styles.header}>
        
        <View style={styles.searchContainer}>
          <SearchIcon width={20} height={20} color="#2B2D42" style={styles.searchIconLeft} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Videos"
            placeholderTextColor="#999"
            value={typeof searchQuery === 'string' ? searchQuery : ''}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoFocus
            accessibilityLabel="Search videos"
            accessibilityHint="Enter search terms to find videos"
          />
        </View>
      </View>

      {/* Zawartość wyszukiwania */}
      <ScrollView style={styles.content}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        ) : (
          <View style={styles.resultsContainer}>
            {/* Informacja o wynikach */}
            <Text style={styles.resultsCount}>
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found for "{displayQuery}"
            </Text>
            
            {/* Sortowanie */}
            <View style={styles.sortRow}>
              <TouchableOpacity 
                style={styles.sortContainer} 
                onPress={handleSortPress}
                accessibilityRole="button"
                accessibilityLabel="Sort options"
                accessibilityHint="Opens sort options modal"
              >
                <Text style={styles.sortText}>Sort by: <Text style={styles.sortOptionBold}>{selectedSortOption}</Text></Text>
              </TouchableOpacity>
            </View>

            {/* Filmy */}
            <View style={styles.videosSection}>
              {memoizedSearchResults}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Stopka */}
      <Footer />

      {/* Modal sortowania */}
      <SortModal
        visible={showSortModal}
        selectedOption={selectedSortOption}
        onClose={handleCloseModal}
        onSelect={handleSortOptionSelect}
        onConfirm={handleConfirmSort}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

// Design tokens
const COLORS = {
  background: '#fff',
  primary: '#007AFF',
  secondary: '#8D99AE',
  border: '#e0e0e0',
  text: '#333',
  textSecondary: '#666',
  textMuted: '#999',
  white: '#fff',
} as const;

const SIZES = {
  borderRadius: 16,
  padding: {
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
  },
  margin: {
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 20,
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
    paddingHorizontal: SIZES.padding.large,
    paddingVertical: SIZES.padding.medium,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginTop: 20,
  },
  backButton: {
    padding: SIZES.padding.small,
    marginRight: SIZES.margin.small,
  },
  backIcon: {
    fontSize: 20,
    color: COLORS.primary,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#2B2D42',
  },
  searchInput: {
    flex: 1,
    paddingVertical: SIZES.padding.medium,
    fontSize: 16,
    color: COLORS.text,
  },
  searchButton: {
    padding: SIZES.padding.small,
  },
  searchIconLeft: {
    marginRight: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  resultsContainer: {
    padding: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  searchResult: {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultThumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
  },
  resultInfo: {
    paddingHorizontal: 4,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    lineHeight: 22,
    marginBottom: 6,
    fontFamily: 'Poppins_600SemiBold',
  },
  resultViews: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
    fontFamily: 'Poppins_400Regular',
  },
  resultDuration: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Poppins_400Regular',
  },
  resultsCount: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    paddingHorizontal: 16,
    fontFamily: 'Poppins_400Regular',
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sortContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  sortText: {
    fontSize: 14,
    color: '#2B2D42',
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
  },
  sortOptionBold: {
    fontWeight: '700',
    fontFamily: 'Poppins_700Bold',
  },
  videosSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
});
