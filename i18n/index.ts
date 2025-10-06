import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      common: {
        home: 'Home',
        search: 'Search',
        details: 'Details',
        notes: 'Notes',
        description: 'Description',
        statistics: 'Statistics',
        buffering: 'Buffering...',
        confirm: 'Confirm',
        showMore: 'Show More'
      },
      login: {
        welcome1: 'Welcome to the best',
        welcome2: 'YouTube-based learning',
        welcome3: 'application',
        guest: 'Log in as guest',
        termsPrompt: 'By continuing, you agree with',
        terms: 'Terms and Conditions',
        privacy: 'Privacy Policy'
      },
      search: {
        resultsFor: 'results found for',
        sortBy: 'Sort by:',
        uploadLatest: 'Upload date: latest',
        uploadOldest: 'Upload date: oldest',
        mostPopular: 'Most popular'
      },
      video: {
        views: 'views',
        likes: 'likes',
        unknownChannel: 'Unknown channel',
        noDescription: 'No description available'
      }
    }
  },
  pl: {
    translation: {
      common: {
        home: 'Strona główna',
        search: 'Szukaj',
        details: 'Szczegóły',
        notes: 'Notatki',
        description: 'Opis',
        statistics: 'Statystyki',
        buffering: 'Buforowanie...',
        confirm: 'Potwierdź',
        showMore: 'Pokaż więcej'
      },
      login: {
        welcome1: 'Witamy w najlepszej',
        welcome2: 'aplikacji edukacyjnej',
        welcome3: 'opartej o YouTube',
        guest: 'Zaloguj jako gość',
        termsPrompt: 'Kontynuując, akceptujesz',
        terms: 'Regulamin',
        privacy: 'Politykę prywatności'
      },
      search: {
        resultsFor: 'wyników dla',
        sortBy: 'Sortuj według:',
        uploadLatest: 'Data publikacji: najnowsze',
        uploadOldest: 'Data publikacji: najstarsze',
        mostPopular: 'Najpopularniejsze'
      },
      video: {
        views: 'wyświetleń',
        likes: 'polubień',
        unknownChannel: 'Nieznany kanał',
        noDescription: 'Brak opisu'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;


