import React, { useState, useRef, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import GoogleMapComponent from './GoogleMapComponent';
import { useTranslation } from 'react-i18next';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries=["places"];

function Home({ destination, setDestination }) {
  const [currentLocation, setCurrentLocation] = useState(null); // Default to null
  const [routeDetails, setRouteDetails] = useState(null);
  const { t, i18n } = useTranslation();
  const [modeOfTransport, setModeOfTransport] = useState('DRIVING');
  const searchBoxRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation && !currentLocation) {
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
    } else if (!navigator.geolocation) {
      alert("Error: Your browser doesn't support geolocation.");
    }
  }, [currentLocation]);

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[places.length - 1].geometry.location;
      setCurrentLocation({
        lat: place.lat(),
        lng: place.lng()
      });
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

  return (
    <div>
      <Container className="p-5">
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
          googleMapsApiKey='AIzaSyCvA_66tIjHiQzM3K6xw-McFXlP8p-LiSQ'
          libraries={libraries}
        >
          <label htmlFor="location-search">{t('text_input.my_loc')}:</label>
          <StandaloneSearchBox
            onLoad={ref => searchBoxRef.current = ref}
            onPlacesChanged={handlePlacesChanged}
          >
            <input
              id="location-search"
              type="text"
              placeholder={t('text_input.ent_loc')}
              className="form-control mb-3"
            />
          </StandaloneSearchBox>
        </LoadScript>
        <GoogleMapComponent origin={currentLocation} destination={destination} modeOfTransport={modeOfTransport} onDirectionsChanged={displayRouteDetails} />
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
