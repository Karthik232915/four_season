import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';

const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
  { code: 'ja', label: 'Japanese', native: '日本語' },
  { code: 'ko', label: 'Korean', native: '한국어' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'de', label: 'German', native: 'Deutsch' }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    document.documentElement.lang = code;
    const svgLogo = document.getElementById('four-season-svg');
    if (svgLogo) {
      svgLogo.setAttribute('data-lang', code);
    }
  };

  return (
    <div className="language-selector">
      <select 
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="language-select"
      >
        {languages.map(({ code, native }) => (
          <option key={code} value={code}>
            {native}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
