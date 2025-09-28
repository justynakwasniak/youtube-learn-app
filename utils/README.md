# Utils Folder

Ten folder zawiera wszystkie narzędzia, komponenty i logikę pomocniczą dla aplikacji.

## Struktura

```
utils/
├── api.ts              # Serwis API do komunikacji z YouTube
├── mockData.ts         # Dane testowe i typy
├── SortModal.tsx       # Komponent modala do sortowania
├── useSortModal.ts     # Hook do zarządzania stanem modala
├── index.ts            # Eksport wszystkich modułów
└── README.md           # Ta dokumentacja
```

## Komponenty

### SortModal

Modal do wyboru opcji sortowania wyników wyszukiwania.

**Props:**
- `visible: boolean` - czy modal jest widoczny
- `selectedOption: string` - aktualnie wybrana opcja
- `onClose: () => void` - funkcja zamykania modala
- `onSelect: (option: string) => void` - funkcja wyboru opcji
- `onConfirm: () => void` - funkcja potwierdzenia wyboru

**Użycie:**
```tsx
import { SortModal } from '../utils';

<SortModal
  visible={showModal}
  selectedOption={selectedOption}
  onClose={handleClose}
  onSelect={handleSelect}
  onConfirm={handleConfirm}
/>
```

## Hooks

### useSortModal

Hook do zarządzania stanem modala sortowania.

**Zwraca:**
- `showSortModal: boolean` - stan widoczności modala
- `selectedSortOption: string` - wybrana opcja sortowania
- `handleSortPress: () => void` - otwiera modal
- `handleSortOptionSelect: (option: string) => void` - wybiera opcję
- `handleConfirmSort: () => void` - potwierdza wybór
- `handleCloseModal: () => void` - zamyka modal

**Użycie:**
```tsx
import { useSortModal } from '../utils';

const {
  showSortModal,
  selectedSortOption,
  handleSortPress,
  handleSortOptionSelect,
  handleConfirmSort,
  handleCloseModal,
} = useSortModal();
```

## API

### apiService

Serwis do komunikacji z YouTube API.

**Metody:**
- `getVideosByCategory(category: string)` - pobiera filmy z kategorii
- `searchVideos(query: string, sortBy?: string)` - wyszukuje filmy
- `getCategories()` - pobiera kategorie
- `getVideoDetails(videoId: string)` - pobiera szczegóły filmu

## Mock Data

### Typy
- `Video` - podstawowy typ filmu
- `VideosByCategory` - filmy pogrupowane według kategorii
- `ExtendedVideo` - rozszerzony typ filmu z dodatkowymi polami
- `Channel` - typ kanału

### Dane
- `mockVideos` - filmy testowe pogrupowane według kategorii
- `extendedMockSearchResults` - rozszerzone wyniki wyszukiwania
- `mockChannels` - kanały testowe
- `CATEGORIES` - lista kategorii
- `MAX_VIDEOS_PER_CATEGORY` - maksymalna liczba filmów na kategorię

## Importy

Wszystkie moduły można importować z głównego pliku utils:

```tsx
import { 
  apiService, 
  SortModal, 
  useSortModal,
  mockVideos,
  Video,
  // ... inne eksporty
} from '../utils';
```

## Korzyści

- **Modularność** - każdy komponent ma swoją odpowiedzialność
- **Reużywalność** - komponenty można używać w różnych miejscach
- **Łatwość testowania** - każdy moduł można testować osobno
- **Czytelność** - jasna struktura i dokumentacja
- **Type Safety** - wszystkie komponenty mają typy TypeScript
