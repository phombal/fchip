import { Container } from 'react-bootstrap';
import './App.css';
import React, {useState, useEffect} from 'react';
import NavigationBar from './map_page/navbar'; // Assuming NavigationBar is in the same directory
import ProviderMap from './map_page/providermap.js';
import { Row, Col } from 'react-bootstrap';
import SearchSelector from './map_page/searchSelector.js';
import { I18nextProvider } from 'react-i18next';
import LanguageSelector from './map_page/languageSelector.js'
import { DistanceFilterDropdown, LanguageFilterDropdown } from './map_page/dropdowns.js'
import i18n from './i18n'; // Import i18n configuration
import MentalHealthMap from './map_page/mentalHealthMap.js';
import ClinicMap from './map_page/clinicMap.js';
import HospitalMap from './map_page/hospitalMap.js';

function App() {
  // const [jsonData, setJsonData] = useState('');
  const [selectedMap, setSelectedMap] = useState('pcpMap');

  // useEffect(() => {
  //   console.log("jsonData updated: ", jsonData);
  // }, [jsonData]);


  const renderSelectedMap = () => {
    switch (selectedMap) {
        case 'pcpMap':
          return <ProviderMap index={1} />;
        case 'specialistMap':
          return <ProviderMap index={3} />;
        case 'mhMap':
          return <MentalHealthMap />;
        case 'clinicMap':
          return <ClinicMap />;
        case 'hospitalMap':
          return <HospitalMap />;
        default:
          return <ProviderMap index={1} />
    }};
    
    return (
    <div>
      <NavigationBar />
      <Container style={{ padding: '10px 0' }}>
          <Row className="align-items-center">
              {/* <Col md={3} style={{ padding: '10px 0' }}>
                  <DistanceFilterDropdown />
              </Col>
              <Col md={3} style={{ padding: '10px 0' }}>
                  <LanguageFilterDropdown />
              </Col> */}
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
