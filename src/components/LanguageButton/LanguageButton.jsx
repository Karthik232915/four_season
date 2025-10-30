import React, { useState } from 'react';
import './LanguageButton.css';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

const LanguageButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  const handleLanguageChange = (langCode) => {
    setCurrentLang(langCode);
    const svgLogo = document.getElementById('four-season-svg');
    if (svgLogo) {
      svgLogo.setAttribute('data-lang', langCode);
    }
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  return (
    <div className="language-button-container">
      <button 
        className="language-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <span className="arrow">▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`language-option ${currentLang === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageButton;
