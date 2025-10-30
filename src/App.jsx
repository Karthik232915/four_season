import { useTranslation } from 'react-i18next';
import LanguageButton from './components/LanguageButton/LanguageButton';
import './i18n/i18n';

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <LanguageButton />
      <h1>{t('welcome')}</h1>
      {/* Rest of your app content using t('key') for translations */}
    </div>
  );
}

export default App;
