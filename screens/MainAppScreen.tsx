import React, { useState, useEffect } from 'react';
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

const { width } = Dimensions.get('window');


// Mock data dla filmów
const mockVideos = {
  'React Native': [
    { id: 1, title: 'React Native Tutorial', thumbnail: 'https://via.placeholder.com/200x120/FF6B6B/FFFFFF?text=RN+1', views: '1.2M' },
    { id: 2, title: 'Navigation in React Native', thumbnail: 'https://via.placeholder.com/200x120/4ECDC4/FFFFFF?text=RN+2', views: '856K' },
    { id: 3, title: 'State Management', thumbnail: 'https://via.placeholder.com/200x120/45B7D1/FFFFFF?text=RN+3', views: '2.1M' },
    { id: 4, title: 'React Native Performance', thumbnail: 'https://via.placeholder.com/200x120/96CEB4/FFFFFF?text=RN+4', views: '743K' },
  ],
  'React': [
    { id: 5, title: 'React Hooks Explained', thumbnail: 'https://via.placeholder.com/200x120/FFEAA7/FFFFFF?text=React+1', views: '3.2M' },
    { id: 6, title: 'React Context API', thumbnail: 'https://via.placeholder.com/200x120/DDA0DD/FFFFFF?text=React+2', views: '1.8M' },
    { id: 7, title: 'React Router Tutorial', thumbnail: 'https://via.placeholder.com/200x120/98D8C8/FFFFFF?text=React+3', views: '2.5M' },
    { id: 8, title: 'React Best Practices', thumbnail: 'https://via.placeholder.com/200x120/F7DC6F/FFFFFF?text=React+4', views: '1.1M' },
  ],
  'TypeScript': [
    { id: 9, title: 'TypeScript Basics', thumbnail: 'https://via.placeholder.com/200x120/BB8FCE/FFFFFF?text=TS+1', views: '2.8M' },
    { id: 10, title: 'Advanced TypeScript', thumbnail: 'https://via.placeholder.com/200x120/85C1E9/FFFFFF?text=TS+2', views: '1.5M' },
    { id: 11, title: 'TypeScript with React', thumbnail: 'https://via.placeholder.com/200x120/F8C471/FFFFFF?text=TS+3', views: '2.2M' },
    { id: 12, title: 'TypeScript Generics', thumbnail: 'https://via.placeholder.com/200x120/82E0AA/FFFFFF?text=TS+4', views: '967K' },
  ],
  'JavaScript': [
    { id: 13, title: 'ES6+ Features', thumbnail: 'https://via.placeholder.com/200x120/F1948A/FFFFFF?text=JS+1', views: '4.1M' },
    { id: 14, title: 'Async/Await Tutorial', thumbnail: 'https://via.placeholder.com/200x120/85C1E9/FFFFFF?text=JS+2', views: '3.7M' },
    { id: 15, title: 'JavaScript Closures', thumbnail: 'https://via.placeholder.com/200x120/F7DC6F/FFFFFF?text=JS+3', views: '2.9M' },
    { id: 16, title: 'Modern JavaScript', thumbnail: 'https://via.placeholder.com/200x120/BB8FCE/FFFFFF?text=JS+4', views: '1.6M' },
  ],
};

const MainAppScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [videosData, setVideosData] = useState(mockVideos);

  // Ładuj filmy z API przy starcie
  useEffect(() => {
    loadVideosFromAPI();
  }, []);

  const loadVideosFromAPI = async () => {
    try {
      const categories = Object.keys(mockVideos);
      const videosByCategory: any = {};
      
      for (const category of categories) {
        try {
          const results = await apiService.getVideosByCategory(category) as any;
          
          // Konwertuj wyniki YouTube API na format aplikacji
          const formattedVideos = results.items?.slice(0, 4).map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            views: 'N/A' // YouTube API nie zwraca views w search
          })) || [];
          
          videosByCategory[category] = formattedVideos.length > 0 ? formattedVideos : mockVideos[category];
        } catch (error) {
          console.error(`Error loading ${category}:`, error);
          // Fallback do mock data
          videosByCategory[category] = mockVideos[category];
        }
      }
      
      setVideosData(videosByCategory);
    } catch (error) {
      console.error('Error loading videos:', error);
      // Użyj mock data jako fallback
      setVideosData(mockVideos);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/search',
        params: { query: searchQuery.trim() }
      });
    }
  };

  const handleShowMore = (category: string) => {
    router.push({
      pathname: '/search',
      params: { category: category }
    });
  };

  const handleSettings = () => {
    // Tutaj będzie nawigacja do ustawień
    console.log('Settings clicked');
  };

  const renderVideoThumbnail = (video: any) => (
    <TouchableOpacity key={video.id} style={styles.videoThumbnail}>
      <Image source={{ uri: video.thumbnail }} style={styles.thumbnailImage} />
      <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
      <Text style={styles.videoViews}>{video.views} views</Text>
    </TouchableOpacity>
  );

  const renderCategory = (categoryName: string, videos: any[]) => (
    <View key={categoryName} style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{categoryName}</Text>
        <TouchableOpacity
          style={styles.showMoreLink}
          onPress={() => handleShowMore(categoryName)}
        >
          <Text style={styles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
        contentContainerStyle={styles.scrollContent}
      >
        {videos.map(renderVideoThumbnail)}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header z search barem */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchIcon}>
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
          />
        </View>
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Główna zawartość z kategoriami */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.entries(videosData).map(([category, videos]) =>
          renderCategory(category, videos)
        )}
      </ScrollView>

      {/* Stopka */}
      <Footer />
    </SafeAreaView>
  );
};

export default MainAppScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 16,
    marginTop: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchIconText: {
    fontSize: 16,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  categoryContainer: {
    marginBottom: 32,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#2B2D42',
    paddingBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
    marginRight: 16,
  },
  thumbnailImage: {
    width: 180,
    height: 112,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    lineHeight: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  videoViews: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontFamily: 'Poppins_400Regular',
  },
  showMoreLink: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2B2D42',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins_500Medium',
  },
});
