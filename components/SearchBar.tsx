import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../styles';
import { SearchIcon } from '../utils';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, onSearch, placeholder }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onSearch} accessibilityRole="button" accessibilityLabel="Search">
      <SearchIcon width={20} height={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={COLORS.textLight}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSearch}
      returnKeyType="search"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    marginLeft: 8,
  },
});

export default SearchBar;
