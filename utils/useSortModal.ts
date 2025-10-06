import { useState, useCallback } from 'react';

interface UseSortModalReturn {
  showSortModal: boolean;
  selectedSortOption: string;
  handleSortPress: () => void;
  handleSortOptionSelect: (option: string) => void;
  handleConfirmSort: () => void;
  handleCloseModal: () => void;
}

const DEFAULT_SORT_OPTION = 'Most Popular';

export const useSortModal = (): UseSortModalReturn => {
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [selectedSortOption, setSelectedSortOption] = useState<string>(DEFAULT_SORT_OPTION);

  const handleSortPress = useCallback((): void => {
    setShowSortModal(true);
  }, []);

  const handleSortOptionSelect = useCallback((option: string): void => {
    setSelectedSortOption(option);
  }, []);

  const handleConfirmSort = useCallback((): void => {
    setShowSortModal(false);
    console.log('Sorting by:', selectedSortOption);
  }, [selectedSortOption]);

  const handleCloseModal = useCallback((): void => {
    setShowSortModal(false);
  }, []);

  return {
    showSortModal,
    selectedSortOption,
    handleSortPress,
    handleSortOptionSelect,
    handleConfirmSort,
    handleCloseModal,
  };
};
