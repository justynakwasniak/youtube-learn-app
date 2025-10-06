export interface Video {
  id: string | number;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export interface VideosByCategory {
  [category: string]: Video[];
}

export const CATEGORIES = ['React Native', 'React', 'TypeScript', 'JavaScript'] as const;
export const MAX_VIDEOS_PER_CATEGORY = 4;

export const mockVideos: VideosByCategory = {
  'React Native': [
    { id: 1, title: 'React Native Tutorial', thumbnail: 'https://via.placeholder.com/200x120/FF6B6B/FFFFFF?text=RN+1', publishedAt: '2024-01-15' },
    { id: 2, title: 'Navigation in React Native', thumbnail: 'https://via.placeholder.com/200x120/4ECDC4/FFFFFF?text=RN+2', publishedAt: '2024-01-10' },
    { id: 3, title: 'State Management', thumbnail: 'https://via.placeholder.com/200x120/45B7D1/FFFFFF?text=RN+3', publishedAt: '2024-01-05' },
    { id: 4, title: 'React Native Performance', thumbnail: 'https://via.placeholder.com/200x120/96CEB4/FFFFFF?text=RN+4', publishedAt: '2023-12-28' },
  ],
  'React': [
    { id: 5, title: 'React Hooks Explained', thumbnail: 'https://via.placeholder.com/200x120/FFEAA7/FFFFFF?text=React+1', publishedAt: '2024-01-20' },
    { id: 6, title: 'React Context API', thumbnail: 'https://via.placeholder.com/200x120/DDA0DD/FFFFFF?text=React+2', publishedAt: '2024-01-18' },
    { id: 7, title: 'React Router Tutorial', thumbnail: 'https://via.placeholder.com/200x120/98D8C8/FFFFFF?text=React+3', publishedAt: '2024-01-12' },
    { id: 8, title: 'React Best Practices', thumbnail: 'https://via.placeholder.com/200x120/F7DC6F/FFFFFF?text=React+4', publishedAt: '2024-01-08' },
  ],
  'TypeScript': [
    { id: 9, title: 'TypeScript Basics', thumbnail: 'https://via.placeholder.com/200x120/BB8FCE/FFFFFF?text=TS+1', publishedAt: '2024-01-25' },
    { id: 10, title: 'Advanced TypeScript', thumbnail: 'https://via.placeholder.com/200x120/85C1E9/FFFFFF?text=TS+2', publishedAt: '2024-01-22' },
    { id: 11, title: 'TypeScript with React', thumbnail: 'https://via.placeholder.com/200x120/F8C471/FFFFFF?text=TS+3', publishedAt: '2024-01-19' },
    { id: 12, title: 'TypeScript Generics', thumbnail: 'https://via.placeholder.com/200x120/82E0AA/FFFFFF?text=TS+4', publishedAt: '2024-01-16' },
  ],
  'JavaScript': [
    { id: 13, title: 'ES6+ Features', thumbnail: 'https://via.placeholder.com/200x120/F1948A/FFFFFF?text=JS+1', publishedAt: '2024-01-30' },
    { id: 14, title: 'Async/Await Tutorial', thumbnail: 'https://via.placeholder.com/200x120/85C1E9/FFFFFF?text=JS+2', publishedAt: '2024-01-28' },
    { id: 15, title: 'JavaScript Closures', thumbnail: 'https://via.placeholder.com/200x120/F7DC6F/FFFFFF?text=JS+3', publishedAt: '2024-01-26' },
    { id: 16, title: 'Modern JavaScript', thumbnail: 'https://via.placeholder.com/200x120/BB8FCE/FFFFFF?text=JS+4', publishedAt: '2024-01-24' },
  ],
};

export interface ExtendedVideo extends Video {
  duration?: string;
  category?: string;
  channelTitle?: string;
  description?: string;
}

export const mockSearchResults: Video[] = [
  { id: 1, title: 'React Native Tutorial for Beginners', thumbnail: 'https://via.placeholder.com/200x120/FF6B6B/FFFFFF?text=RN+Tutorial', publishedAt: '2024-01-15' },
  { id: 2, title: 'Advanced React Patterns', thumbnail: 'https://via.placeholder.com/200x120/4ECDC4/FFFFFF?text=React+Patterns', publishedAt: '2024-01-12' },
  { id: 3, title: 'TypeScript Fundamentals', thumbnail: 'https://via.placeholder.com/200x120/45B7D1/FFFFFF?text=TS+Fundamentals', publishedAt: '2024-01-10' },
  { id: 4, title: 'JavaScript ES6+ Features', thumbnail: 'https://via.placeholder.com/200x120/96CEB4/FFFFFF?text=JS+ES6', publishedAt: '2024-01-08' },
  { id: 5, title: 'React Hooks Deep Dive', thumbnail: 'https://via.placeholder.com/200x120/FFEAA7/FFFFFF?text=React+Hooks', publishedAt: '2024-01-05' },
  { id: 6, title: 'Node.js Backend Development', thumbnail: 'https://via.placeholder.com/200x120/DDA0DD/FFFFFF?text=Node.js', publishedAt: '2024-01-03' },
];

export const extendedMockSearchResults: ExtendedVideo[] = [
  { id: 1, title: 'React Native Tutorial for Beginners', thumbnail: 'https://via.placeholder.com/200x120/FF6B6B/FFFFFF?text=RN+Tutorial', publishedAt: '2024-01-15', duration: '15:30', category: 'React Native', channelTitle: 'React Native Academy', description: 'Complete beginner guide to React Native development' },
  { id: 2, title: 'Advanced React Patterns', thumbnail: 'https://via.placeholder.com/200x120/4ECDC4/FFFFFF?text=React+Patterns', publishedAt: '2024-01-12', duration: '22:15', category: 'React', channelTitle: 'React Experts', description: 'Learn advanced React patterns and techniques' },
  { id: 3, title: 'TypeScript Fundamentals', thumbnail: 'https://via.placeholder.com/200x120/45B7D1/FFFFFF?text=TS+Fundamentals', publishedAt: '2024-01-10', duration: '18:45', category: 'TypeScript', channelTitle: 'TypeScript Academy', description: 'Master TypeScript basics and fundamentals' },
  { id: 4, title: 'JavaScript ES6+ Features', thumbnail: 'https://via.placeholder.com/200x120/96CEB4/FFFFFF?text=JS+ES6', publishedAt: '2024-01-08', duration: '25:20', category: 'JavaScript', channelTitle: 'Modern JS', description: 'Explore modern JavaScript ES6+ features' },
  { id: 5, title: 'React Native Navigation Guide', thumbnail: 'https://via.placeholder.com/200x120/FFEAA7/FFFFFF?text=RN+Navigation', publishedAt: '2024-01-05', duration: '12:10', category: 'React Native', channelTitle: 'Mobile Dev Pro', description: 'Master React Native navigation patterns' },
  { id: 6, title: 'TypeScript with React Hooks', thumbnail: 'https://via.placeholder.com/200x120/DDA0DD/FFFFFF?text=TS+Hooks', publishedAt: '2024-01-03', duration: '20:30', category: 'TypeScript', channelTitle: 'React TypeScript', description: 'Learn TypeScript with React Hooks' },
  { id: 7, title: 'React Hooks Deep Dive', thumbnail: 'https://via.placeholder.com/200x120/98D8C8/FFFFFF?text=React+Hooks', publishedAt: '2024-01-01', duration: '28:45', category: 'React', channelTitle: 'React Masters', description: 'Deep dive into React Hooks patterns' },
  { id: 8, title: 'JavaScript Async/Await', thumbnail: 'https://via.placeholder.com/200x120/F7DC6F/FFFFFF?text=JS+Async', publishedAt: '2023-12-28', duration: '19:20', category: 'JavaScript', channelTitle: 'Async Experts', description: 'Master JavaScript async/await patterns' },
  { id: 9, title: 'React Native Performance Tips', thumbnail: 'https://via.placeholder.com/200x120/BB8FCE/FFFFFF?text=RN+Perf', publishedAt: '2023-12-25', duration: '16:30', category: 'React Native', channelTitle: 'Performance Gurus', description: 'Optimize React Native app performance' },
  { id: 10, title: 'TypeScript Generics Explained', thumbnail: 'https://via.placeholder.com/200x120/85C1E9/FFFFFF?text=TS+Generics', publishedAt: '2023-12-22', duration: '24:15', category: 'TypeScript', channelTitle: 'Generic Masters', description: 'Deep dive into TypeScript generics' },
];

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
