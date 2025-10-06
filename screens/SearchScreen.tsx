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
  extendedMockSearchResults, 
  mockChannels, 
  ExtendedVideo, 
  Channel,
  SortModal,
  useSortModal,
  SearchIcon,
  BackArrowIcon
} from '../utils';
import { useYouTubeApi } from '../utils';
import { COLORS, TYPOGRAPHY, SPACING, commonStyles } from '../styles';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const router = useRouter();
  const { query, category } = useLocalSearchParams();
  const { searchVideos } = useYouTubeApi();
  const [searchQuery, setSearchQuery] = useState(Array.isArray(query) ? query[0] || '' : query || '');
  const [searchResults, setSearchResults] = useState(extendedMockSearchResults.slice(0, 2));
  const [isLoading, setIsLoading] = useState(false);
  
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
      performSearch(searchTerm); 
    }
  }, [query, category, selectedSortOption]);
  
  const formatYouTubeResults = useCallback((results: YouTubeSearchResult): ExtendedVideo[] => {
    return results.items?.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url || '',
      publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString('pl-PL', { 
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
      const results = await searchVideos.call(searchTerm, selectedSortOption) as YouTubeSearchResult;
      const formattedResults = formatYouTubeResults(results);
  
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
  }, [selectedSortOption, formatYouTubeResults, getFallbackResults, searchVideos]);
  
  

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
        publishedAt: video.publishedAt,
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
        <Text style={styles.resultChannel} numberOfLines={1}>{video.channelTitle}</Text>
        <Text style={styles.resultDescription} numberOfLines={2}>{video.description}</Text>
        <Text style={styles.resultViews}>{video.publishedAt}</Text>
      </View>
    </TouchableOpacity>
  ), [handleVideoPress]);

  const memoizedSearchResults = useMemo(() => 
    searchResults.map(renderSearchResult), 
    [searchResults, renderSearchResult]
  );

  const displayQuery = useMemo(() => 
    typeof searchQuery === 'string' ? searchQuery : 
    Array.isArray(category) ? category[0] : 
    category || 'search', 
    [searchQuery, category]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        
        <View style={styles.searchContainer}>
          <SearchIcon width={20} height={20} color={COLORS.borderDark} style={styles.searchIconLeft} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('common.search') + ' Videos'}
            placeholderTextColor={COLORS.textLight}
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

      <ScrollView style={styles.content}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>{t('common.search')}...</Text>
          </View>
        ) : (
          <View style={styles.resultsContainer}>
          
            <Text style={styles.resultsCount}>
              {searchResults.length} {t('search.resultsFor')} <Text style={styles.queryText}>"{displayQuery}"</Text>
            </Text>
            
            
            <View style={styles.sortRow}>
              <TouchableOpacity 
                style={styles.sortContainer} 
                onPress={handleSortPress}
                accessibilityRole="button"
                accessibilityLabel="Sort options"
                accessibilityHint="Opens sort options modal"
              >
                <Text style={styles.sortText}>{t('search.sortBy')} <Text style={styles.sortOptionBold}>{selectedSortOption}</Text></Text>
              </TouchableOpacity>
            </View>

        
            <View style={styles.videosSection}>
              {memoizedSearchResults}
            </View>
          </View>
        )}
      </ScrollView>

     
      <Footer />

      
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

const styles = StyleSheet.create({
  container: commonStyles.container,
  header: {
    ...commonStyles.header,
    marginTop: 20,
  },
  backButton: {
    ...commonStyles.backButton,
    marginRight: SPACING.margin.sm,
  },
  backIcon: {
    fontSize: 20,
    color: COLORS.primary,
  },
  searchContainer: commonStyles.searchContainer,
  searchInput: commonStyles.searchInput,
  searchButton: {
    padding: SPACING.padding.sm,
  },
  searchIconLeft: {
    marginRight: 8,
  },
  searchIcon: {
    fontSize: TYPOGRAPHY.fontSize.lg,
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
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textSecondary,
  },
  resultsContainer: {
    padding: 16,
  },
  resultsTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  searchResult: {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  resultThumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: COLORS.border,
    marginBottom: 12,
  },
  resultInfo: {
    paddingHorizontal: 4,
  },
  resultChannel: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 18,
    marginBottom: 4,
    fontFamily: 'Poppins_700Bold',
  },
  resultDescription: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    lineHeight: 16,
    marginBottom: 6,
    fontFamily: 'Poppins_400Regular',
  },
  resultViews: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
    marginBottom: 2,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'right',
  },
  resultsCount: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
    marginBottom: 8,
    paddingHorizontal: 16,
    fontFamily: 'Poppins_400Regular',
  },
  queryText: {
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.text,
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
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.borderDark,
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
