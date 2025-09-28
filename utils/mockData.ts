// Types
export interface Video {
  id: string | number;
  title: string;
  thumbnail: string;
  views: string;
}

export interface VideosByCategory {
  [category: string]: Video[];
}

// Constants
export const CATEGORIES = ['React Native', 'React', 'TypeScript', 'JavaScript'] as const;
export const MAX_VIDEOS_PER_CATEGORY = 4;

// Mock data dla filmów (fallback)
export const mockVideos: VideosByCategory = {
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

// Extended Video interface for SearchScreen
export interface ExtendedVideo extends Video {
  duration?: string;
  category?: string;
  channelTitle?: string;
  description?: string;
}

// Mock data dla wyszukiwania
export const mockSearchResults: Video[] = [
  { id: 1, title: 'React Native Tutorial for Beginners', thumbnail: 'https://via.placeholder.com/200x120/FF6B6B/FFFFFF?text=RN+Tutorial', views: '1.2M' },
  { id: 2, title: 'Advanced React Patterns', thumbnail: 'https://via.placeholder.com/200x120/4ECDC4/FFFFFF?text=React+Patterns', views: '856K' },
  { id: 3, title: 'TypeScript Fundamentals', thumbnail: 'https://via.placeholder.com/200x120/45B7D1/FFFFFF?text=TS+Fundamentals', views: '2.1M' },
  { id: 4, title: 'JavaScript ES6+ Features', thumbnail: 'https://via.placeholder.com/200x120/96CEB4/FFFFFF?text=JS+ES6', views: '3.5M' },
  { id: 5, title: 'React Hooks Deep Dive', thumbnail: 'https://via.placeholder.com/200x120/FFEAA7/FFFFFF?text=React+Hooks', views: '2.8M' },
  { id: 6, title: 'Node.js Backend Development', thumbnail: 'https://via.placeholder.com/200x120/DDA0DD/FFFFFF?text=Node.js', views: '1.9M' },
];

// Extended mock data dla SearchScreen (z dodatkowymi polami)
export const extendedMockSearchResults: ExtendedVideo[] = [
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

// Mock data dla kanałów
export interface Channel {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  category: string;
}

export const mockChannels: Channel[] = [
  { id: 1, name: 'React Native Academy', thumbnail: 'https://via.placeholder.com/300x180/FF6B6B/FFFFFF?text=RN+Academy', description: 'Learn React Native from scratch with practical examples and real-world projects. Perfect for beginners and advanced developers.', category: 'React Native' },
  { id: 2, name: 'TypeScript Mastery', thumbnail: 'https://via.placeholder.com/300x180/4ECDC4/FFFFFF?text=TS+Mastery', description: 'Master TypeScript with advanced patterns, generics, and best practices. Take your JavaScript skills to the next level.', category: 'TypeScript' },
  { id: 3, name: 'React Pro', thumbnail: 'https://via.placeholder.com/300x180/45B7D1/FFFFFF?text=React+Pro', description: 'Advanced React techniques, hooks, context, and performance optimization. For experienced developers.', category: 'React' },
  { id: 4, name: 'JavaScript Fundamentals', thumbnail: 'https://via.placeholder.com/300x180/96CEB4/FFFFFF?text=JS+Fundamentals', description: 'Master JavaScript from basics to advanced concepts. ES6+, async programming, and modern patterns.', category: 'JavaScript' },
];
