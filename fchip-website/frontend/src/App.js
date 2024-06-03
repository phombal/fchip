import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import SubmitQuery from './map_page/submitQuery';
import React, {useState, useEffect} from 'react';
import NavigationBar from './map_page/navbar'; // Assuming NavigationBar is in the same directory
import ProviderCard from './map_page/providercard';
import ProviderMap from './map_page/providermap';
import { Dropdown, Row, Col, Button } from 'react-bootstrap';
import SearchSelector from './map_page/searchSelector.js';
import { I18nextProvider } from 'react-i18next';
import LanguageSelector from './map_page/languageSelector.js'
import { DistanceFilterDropdown, LanguageFilterDropdown } from './map_page/dropdowns.js'
import i18n from './i18n'; // Import i18n configuration
import MentalHealthMap from './map_page/mentalHealthMap.js';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [selectedMap, setSelectedMap] = useState('pcpMap');

  useEffect(() => {
    console.log("jsonData updated: ", jsonData);
  }, [jsonData]);


  const renderSelectedMap = () => {
    switch (selectedMap) {
        case 'pcpMap':
          return <ProviderMap index={1} />;
        case 'specialistMap':
          return <ProviderMap index={3} />;
        case 'mhMap':
          return <MentalHealthMap />;
        default:
          return <ProviderMap index={1} />
    }};
    
    return (
    <div>
      <NavigationBar />
      <Container style={{ padding: '10px 0' }}>
          <Row className="align-items-center">
              <Col md={3} style={{ padding: '10px 0' }}>
                  <DistanceFilterDropdown />
              </Col>
              <Col md={3} style={{ padding: '10px 0' }}>
                  <LanguageFilterDropdown />
              </Col>
              <Col md={3} style={{ padding: '10px 0' }}>
                  <SearchSelector selectedMap={selectedMap} onSelectMap={setSelectedMap}/>
              </Col>
              <Col md={3} style={{ padding: '10px 0' }}>
                  <LanguageSelector />
              </Col>
          </Row>
      </Container>
      {renderSelectedMap()}
    </div>
  );
}

export default App;
