import React, { useState } from 'react';
import { Dropdown, Form, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function DistanceFilterDropdown() {
    const { t } = useTranslation();
    const [distance, setDistance] = useState('Select distance');

    const handleSelect = (eventKey) => {
        setDistance(eventKey);
        console.log("Filtering items within:", eventKey);
    };

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
            {t('distance.select')}
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
    const [language, setLanguage] = useState(t('language.select'));
  
    const handleSelect = (eventKey) => {
        setLanguage(eventKey);
        console.log("Filtering items by language:", eventKey);
    };

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
                {t('language.select')}
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

function FullWidthTextInput() {
    const { t } = useTranslation(); // Hook to access translation function
    return (
        <Form>
            <Form.Group as={Row} controlId="fullWidthTextInput" className="align-items-center">
                <Form.Label column sm="auto" className="pr-2">{t('text_input.my_loc')}:</Form.Label>
                <Col>
                    <Form.Control type="text" placeholder={t('text_input.ent_loc')} size="sm" />
                </Col>
            </Form.Group>
        </Form>
    );
}

function CombinedComponents() {
    return (
        <Container style={{ padding: '10px 0' }}>
            <Row className="align-items-center">
                <Col md={3} style={{ padding: '10px 0' }}>
                    <DistanceFilterDropdown />
                </Col>
                <Col md={3} style={{ padding: '10px 0' }}>
                    <LanguageFilterDropdown />
                </Col>
                <Col md={3} style={{ padding: '10px 0' }}>
                    <FullWidthTextInput />
                </Col>
                <Col md={3} style={{ padding: '10px 0' }}>
                    <LanguageSelector />
                </Col>
            </Row>
        </Container>
    );
}

function LanguageSelector() {
    const { t, i18n } = useTranslation();
  
    const changeLanguage = (language) => {
      i18n.changeLanguage(language);
    };
  
    return (
      <Dropdown onSelect={changeLanguage}>
        <Dropdown.Toggle variant="danger" id="dropdown-basic">
          {i18n.language.toUpperCase()}
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item eventKey="en">{t('language.english')}</Dropdown.Item>
          <Dropdown.Item eventKey="es">{t('language.spanish')}</Dropdown.Item>
          {/* Add dropdown items for other languages */}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

export { CombinedComponents };
