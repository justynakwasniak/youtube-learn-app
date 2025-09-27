# Instrukcje uruchomienia z expo prebuild

## Krok 1: Zainstaluj EAS CLI (jeśli nie masz)
```bash
npm install -g @expo/eas-cli
```

## Krok 2: Uruchom expo prebuild
```bash
npx expo prebuild
```

## Krok 3: Uruchom aplikację
### Dla Android:
```bash
npx expo run:android
```

### Dla iOS:
```bash
npx expo run:ios
```

## Alternatywnie - uruchom z Expo Go (może nie działać z react-native-video):
```bash
npx expo start
```

## Ważne informacje:
- `expo prebuild` generuje natywne pliki Android/iOS
- Po prebuild możesz używać `react-native-video`
- Pliki natywne będą w folderach `android/` i `ios/`
- Możesz edytować natywne pliki jeśli potrzebujesz

## Jeśli masz problemy:
1. Usuń foldery `android/` i `ios/` jeśli istnieją
2. Uruchom `npx expo prebuild --clean`
3. Spróbuj ponownie

## Sprawdź czy react-native-video jest zainstalowany:
```bash
npm list react-native-video
```


