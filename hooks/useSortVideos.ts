import { useState, useCallback } from 'react';

export const useSortVideos = (defaultOption = 'Relevance') => {
  const [selectedSortOption, setSelectedSortOption] = useState(defaultOption);
  const [showSortModal, setShowSortModal] = useState(false);

  const handleSortPress = useCallback(() => setShowSortModal(true), []);
  const handleCloseModal = useCallback(() => setShowSortModal(false), []);
  const handleSortOptionSelect = useCallback((option: string) => setSelectedSortOption(option), []);
  const handleConfirmSort = useCallback(() => setShowSortModal(false), []);

  return {
    showSortModal,
    selectedSortOption,
    handleSortPress,
    handleCloseModal,
    handleSortOptionSelect,
    handleConfirmSort,
  };
};
