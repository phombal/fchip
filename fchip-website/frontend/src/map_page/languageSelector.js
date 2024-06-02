import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
    const { t, i18n } = useTranslation();
  
    const changeLanguage = (language) => {
      i18n.changeLanguage(language);
    };

    const language = i18n.language ? i18n.language.toUpperCase() : '';
  
    return (
      <Dropdown onSelect={changeLanguage}>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          {i18n.language.toUpperCase()}
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item eventKey="en">{t('language.english')}</Dropdown.Item>
          <Dropdown.Item eventKey="es">{t('language.spanish')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  export default LanguageSelector;