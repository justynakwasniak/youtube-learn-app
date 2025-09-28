import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Types
interface SortOption {
  id: string;
  label: string;
}

interface SortModalProps {
  visible: boolean;
  selectedOption: string;
  onClose: () => void;
  onSelect: (option: string) => void;
  onConfirm: () => void;
}

// Constants
const SORT_OPTIONS: SortOption[] = [
  { id: 'Upload Date Latest', label: 'Upload date: latest' },
  { id: 'Upload Date Oldest', label: 'Upload date: oldest' },
  { id: 'Most Popular', label: 'Most popular' },
];

// Design tokens
const COLORS = {
  background: '#8D99AE',
  white: '#fff',
  overlay: 'rgba(0, 0, 0, 0.7)',
  primary: '#007AFF',
  darkBlue: '#2B2D42', // Ciemny granatowy dla radio button
} as const;

const SIZES = {
  borderRadius: 24,
  confirmButtonRadius: 8,
  padding: {
    large: 24,
    medium: 16,
    small: 8,
  },
  margin: {
    large: 20,
    medium: 12,
    small: 8,
  },
} as const;

const SortModal: React.FC<SortModalProps> = ({
  visible,
  selectedOption,
  onClose,
  onSelect,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sort records by:</Text>
          
          {/* Opcje sortowania */}
          <View style={styles.sortOptions}>
            {SORT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.sortOption}
                onPress={() => onSelect(option.id)}
                accessibilityRole="radio"
                accessibilityLabel={option.label}
                accessibilityState={{ checked: selectedOption === option.id }}
              >
                <View style={styles.radioButton}>
                  {selectedOption === option.id && (
                    <View style={styles.radioButtonSelected} />
                  )}
                </View>
                <Text style={styles.sortOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Przycisk Confirm */}
          <TouchableOpacity 
            style={styles.confirmButton} 
            onPress={onConfirm}
            accessibilityRole="button"
            accessibilityLabel="Confirm sort selection"
            accessibilityHint="Applies the selected sort option"
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding.large,
    width: 320,
    height: 400,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'left',
    marginBottom: SIZES.margin.medium,
    fontFamily: 'Poppins_700Bold',
  },
  sortOptions: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: SIZES.padding.small,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding.small,
    marginBottom: SIZES.margin.small,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
    marginRight: SIZES.margin.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.darkBlue, // Ciemny granatowy zamiast białego
  },
  sortOptionText: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: 'Poppins_400Regular',
  },
  confirmButton: {
    backgroundColor: COLORS.darkBlue, // #2B2D42
    width: 256,
    height: 40,
    borderRadius: SIZES.confirmButtonRadius,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins_700Bold',
  },
});

export default SortModal;
