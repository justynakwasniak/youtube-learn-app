import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Footer from '../components/Footer';
import { apiService } from '../utils/api';

// Mock data dla wyszukiwania z kategoriami
const mockSearchResults = [
  { id: 1, title: 'React Native Tutorial for Beginners', thumbnail: 'https://via.placeholder.com/200x120/FF6B6B/FFFFFF?text=RN+Tutorial', views: '1.2M', duration: '15:30', category: 'React Native' },
  { id: 2, title: 'Advanced React Patterns', thumbnail: 'https://via.placeholder.com/200x120/4ECDC4/FFFFFF?text=React+Patterns', views: '856K', duration: '22:15', category: 'React' },
  { id: 3, title: 'TypeScript Fundamentals', thumbnail: 'https://via.placeholder.com/200x120/45B7D1/FFFFFF?text=TS+Fundamentals', views: '2.1M', duration: '18:45', category: 'TypeScript' },
  { id: 4, title: 'JavaScript ES6+ Features', thumbnail: 'https://via.placeholder.com/200x120/96CEB4/FFFFFF?text=JS+ES6', views: '743K', duration: '25:20', category: 'JavaScript' },
  { id: 5, title: 'React Native Navigation Guide', thumbnail: 'https://via.placeholder.com/200x120/FFEAA7/FFFFFF?text=RN+Navigation', views: '1.5M', duration: '12:10', category: 'React Native' },
  { id: 6, title: 'TypeScript with React Hooks', thumbnail: 'https://via.placeholder.com/200x120/DDA0DD/FFFFFF?text=TS+Hooks', views: '980K', duration: '20:30', category: 'TypeScript' },
  { id: 7, title: 'React Hooks Deep Dive', thumbnail: 'https://via.placeholder.com/200x120/98D8C8/FFFFFF?text=React+Hooks', views: '1.8M', duration: '28:45', category: 'React' },
  { id: 8, title: 'JavaScript Async/Await', thumbnail: 'https://via.placeholder.com/200x120/F7DC6F/FFFFFF?text=JS+Async', views: '2.3M', duration: '19:20', category: 'JavaScript' },
  { id: 9, title: 'React Native Performance Tips', thumbnail: 'https://via.placeholder.com/200x120/BB8FCE/FFFFFF?text=RN+Perf', views: '1.1M', duration: '16:30', category: 'React Native' },
  { id: 10, title: 'TypeScript Generics Explained', thumbnail: 'https://via.placeholder.com/200x120/85C1E9/FFFFFF?text=TS+Generics', views: '1.4M', duration: '24:15', category: 'TypeScript' },
];

// Mock data dla kanałów z kategoriami
const mockChannels = [
  { id: 1, name: 'React Native Academy', thumbnail: 'https://via.placeholder.com/300x180/FF6B6B/FFFFFF?text=RN+Academy', description: 'Learn React Native from scratch with practical examples and real-world projects. Perfect for beginners and advanced developers.', category: 'React Native' },
  { id: 2, name: 'TypeScript Mastery', thumbnail: 'https://via.placeholder.com/300x180/4ECDC4/FFFFFF?text=TS+Mastery', description: 'Master TypeScript with advanced patterns, generics, and best practices. Take your JavaScript skills to the next level.', category: 'TypeScript' },
  { id: 3, name: 'React Pro', thumbnail: 'https://via.placeholder.com/300x180/45B7D1/FFFFFF?text=React+Pro', description: 'Advanced React techniques, hooks, context, and performance optimization. For experienced developers.', category: 'React' },
  { id: 4, name: 'JavaScript Fundamentals', thumbnail: 'https://via.placeholder.com/300x180/96CEB4/FFFFFF?text=JS+Fundamentals', description: 'Master JavaScript from basics to advanced concepts. ES6+, async programming, and modern patterns.', category: 'JavaScript' },
];

const SearchScreen = () => {
  const router = useRouter();
  const { query, category } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState(Array.isArray(query) ? query[0] || '' : query || '');
  const [searchResults, setSearchResults] = useState(mockSearchResults.slice(0, 2));
  const [isLoading, setIsLoading] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('Most Popular');

  useEffect(() => {
    if (query || category) {
      const searchTerm = Array.isArray(query) ? query[0] : query || Array.isArray(category) ? category[0] : category;
      if (searchTerm) {
        performSearch(searchTerm);
      }
    }
  }, [query, category]);

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm || typeof searchTerm !== 'string') {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const results = await apiService.searchVideos(searchTerm, selectedSortOption) as any;
      
      // Konwertuj wyniki YouTube API na format aplikacji
      const formattedResults = results.items?.map((item: any, index: number) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        views: 'N/A', // YouTube API nie zwraca views w search
        duration: 'N/A', // YouTube API nie zwraca duration w search
        category: item.snippet.channelTitle
      })) || [];
      
      setSearchResults(formattedResults);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback do mock data w przypadku błędu
      setSearchResults(mockSearchResults.slice(0, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    const trimmedQuery = typeof searchQuery === 'string' ? searchQuery.trim() : '';
    if (trimmedQuery && trimmedQuery.length > 0) {
      performSearch(trimmedQuery);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleVideoPress = (video: any) => {
    console.log('Video pressed:', video.title);
    router.push({
      pathname: '/video-details',
      params: {
        videoId: video.id,
        title: video.title,
        views: video.views,
        duration: video.duration
      }
    });
  };

  const handleSortPress = () => {
    setShowSortModal(true);
  };

  const handleSortOptionSelect = (option: string) => {
    setSelectedSortOption(option);
  };

  const handleConfirmSort = () => {
    setShowSortModal(false);
    // Tutaj można dodać logikę sortowania wyników
    console.log('Sorting by:', selectedSortOption);
  };

  const renderSearchResult = (video: any) => (
    <TouchableOpacity 
      key={video.id} 
      style={styles.searchResult}
      onPress={() => handleVideoPress(video)}
    >
      <Image source={{ uri: video.thumbnail }} style={styles.resultThumbnail} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle} numberOfLines={2}>{video.title}</Text>
        <Text style={styles.resultViews}>{video.views} views</Text>
        <Text style={styles.resultDuration}>{video.duration}</Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      {/* Header z search barem */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Videos"
            placeholderTextColor="#999"
            value={typeof searchQuery === 'string' ? searchQuery : ''}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoFocus
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
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
              2 results found for "{typeof searchQuery === 'string' ? searchQuery : Array.isArray(category) ? category[0] : category || 'search'}"
            </Text>
            
            {/* Sortowanie */}
            <View style={styles.sortRow}>
              <TouchableOpacity style={styles.sortContainer} onPress={handleSortPress}>
                <Text style={styles.sortText}>Sort by: <Text style={styles.sortOptionBold}>{selectedSortOption}</Text></Text>
              </TouchableOpacity>
            </View>

            {/* Filmy */}
            <View style={styles.videosSection}>
              {searchResults.map(renderSearchResult)}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Stopka */}
      <Footer />

      {/* Modal sortowania */}
      <Modal
        visible={showSortModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSortModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort records by</Text>
            
            {/* Opcje sortowania */}
            <View style={styles.sortOptions}>
              <TouchableOpacity 
                style={styles.sortOption} 
                onPress={() => handleSortOptionSelect('Upload Date Latest')}
              >
                <View style={styles.radioButton}>
                  {selectedSortOption === 'Upload Date Latest' && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.sortOptionText}>Upload date: latest</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.sortOption} 
                onPress={() => handleSortOptionSelect('Upload Date Oldest')}
              >
                <View style={styles.radioButton}>
                  {selectedSortOption === 'Upload Date Oldest' && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.sortOptionText}>Upload date: oldest</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.sortOption} 
                onPress={() => handleSortOptionSelect('Most Popular')}
              >
                <View style={styles.radioButton}>
                  {selectedSortOption === 'Most Popular' && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.sortOptionText}>Most popular</Text>
              </TouchableOpacity>
            </View>

            {/* Przycisk Confirm */}
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmSort}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginTop: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backIcon: {
    fontSize: 20,
    color: '#007AFF',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    padding: 8,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#8D99AE',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'left',
    marginBottom: 20,
    fontFamily: 'Poppins_700Bold',
  },
  sortOptions: {
    marginBottom: 24,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2B2D42',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    fontFamily: 'Poppins_400Regular',
  },
  confirmButton: {
    backgroundColor: '#2B2D42',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins_700Bold',
  },
});
