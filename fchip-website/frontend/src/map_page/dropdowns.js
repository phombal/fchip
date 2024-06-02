import React, { useState } from 'react';
import { Dropdown, Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function DistanceFilterDropdown() {
    const { t } = useTranslation();
    const [distance, setDistance] = useState('');

    const handleSelect = (eventKey) => {
        setDistance(eventKey);
        console.log("Filtering items within:", eventKey);
    };

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
            {distance ? distance : t('distance.select')}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="5 miles">5 miles</Dropdown.Item>
                <Dropdown.Item eventKey="10 miles">10 miles</Dropdown.Item>
                <Dropdown.Item eventKey="20 miles">20 miles</Dropdown.Item>
                <Dropdown.Item eventKey="50 miles">50 miles</Dropdown.Item>
                <Dropdown.Item eventKey="100 miles">100 miles</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function LanguageFilterDropdown() {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(t(''));
  
    const handleSelect = (eventKey) => {
        setLanguage(eventKey);
        console.log("Filtering items by language:", eventKey);
    };

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
                {language ? language : t('language.select')}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="English">{t('language.english')}</Dropdown.Item>
                <Dropdown.Item eventKey="Spanish">{t('language.spanish')}</Dropdown.Item>
                <Dropdown.Item eventKey="Hmong">{t('language.hmong')}</Dropdown.Item>
                <Dropdown.Item eventKey="Punjabi">{t('language.punjabi')}</Dropdown.Item>
                <Dropdown.Item eventKey="Tagalog">{t('language.tagalog')}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export { DistanceFilterDropdown, LanguageFilterDropdown };
