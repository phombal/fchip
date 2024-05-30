import React, { useState, useRef, useEffect } from 'react';
import { Dropdown, Container, Form} from 'react-bootstrap';
import GoogleMapComponent from './GoogleMapComponent';
import { useTranslation } from 'react-i18next';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

function Home() {
  const [destination, setDestination] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
  const [routeDetails, setRouteDetails] = useState(null);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(t('language.select'));
  const [modeOfTransport, setModeOfTransport] = useState('DRIVING');
  const searchBoxRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(pos); // Set user's current location
        },
        () => {
          alert("Error: The Geolocation service failed.");
        }
      );
    } else {
      // Browser doesn't support Geolocation
      alert("Error: Your browser doesn't support geolocation.");
    }
  }, []);

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0].geometry.location;
      setDestination(place);
    }
  };

  const displayRouteDetails = (result) => {
    if (result.routes && result.routes.length > 0) {
      const route = result.routes[0];
      const leg = route.legs[0];
      setRouteDetails({
        duration: leg.duration.text,
        distance: leg.distance.text
      });
    }
  };

  // function TransportationDropDown() {
  //   return (
  //       <Dropdown id="modeOfTransport" onChange={e => setModeOfTransport(e.target.eventKey)}>
  //           <Dropdown.Toggle variant="danger" id="dropdown-basic">
  //               {t('mode.select')}
  //           </Dropdown.Toggle>

  //           <Dropdown.Menu>
  //               <Dropdown.Item eventKey="DRIVING">{t('mode.driving')}</Dropdown.Item>
  //               <Dropdown.Item eventKey="WALKING">{t('mode.walking')}</Dropdown.Item>
  //               <Dropdown.Item eventKey="BICYCLING">{t('mode.bicycling')}</Dropdown.Item>
  //               <Dropdown.Item eventKey="TRANSIT">{t('mode.transit')}</Dropdown.Item>
  //           </Dropdown.Menu>
  //       </Dropdown>
  //   );
  // }

  return (
    <div>
      <Container className="p-5">
        {/* <TransportationDropDown /> */}
        <Form>
          <Form.Group controlId="modeOfTransport">
            <Form.Label>{t('mode.select')}:</Form.Label>
            <Form.Control as="select" value={modeOfTransport} onChange={e => setModeOfTransport(e.target.value)}>
              <option value="DRIVING">{t('mode.driving')}</option>
              <option value="WALKING">{t('mode.walking')}</option>
              <option value="BICYCLING">{t('mode.bicycling')}</option>
              <option value="TRANSIT">{t('mode.transit')}</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <LoadScript
          googleMapsApiKey='AIzaSyDuBX2b6y-SpGeuj7KFSgBTrxBoJpV3VQA'
          libraries={["places"]}
        >
          <StandaloneSearchBox
            onLoad={ref => searchBoxRef.current = ref}
            onPlacesChanged={handlePlacesChanged}
          >
            <input
              type="text"
              placeholder="Enter a location"
              className="form-control mb-3"
            />
          </StandaloneSearchBox>
        </LoadScript>
        <GoogleMapComponent origin={currentLocation} destination={destination} modeOfTransport={modeOfTransport} onDirectionsChanged={displayRouteDetails}/>
        {routeDetails && (
          <div>
            <p>Estimated travel time: {routeDetails.duration}</p>
            <p>Distance: {routeDetails.distance}</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
