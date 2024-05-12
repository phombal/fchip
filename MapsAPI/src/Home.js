import React, { useState, useRef, useEffect } from 'react';
import { Container, Navbar, Nav, Form} from 'react-bootstrap';
import GoogleMapComponent from './GoogleMapComponent';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

function Home() {
  const [destination, setDestination] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
  const [routeDetails, setRouteDetails] = useState(null);
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

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Medical Services</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#services">Services</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="p-5">
        <h1>Welcome to Medical Services</h1>
        <p>Thank you for using our service. We look forward to assisting you.</p>
        <Form>
          <Form.Group controlId="modeOfTransport">
            <Form.Label>Select Mode of Transport</Form.Label>
            <Form.Control as="select" value={modeOfTransport} onChange={e => setModeOfTransport(e.target.value)}>
              <option value="DRIVING">Driving</option>
              <option value="WALKING">Walking</option>
              <option value="BICYCLING">Bicycling</option>
              <option value="TRANSIT">Transit</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <LoadScript
          googleMapsApiKey="AIzaSyDuBX2b6y-SpGeuj7KFSgBTrxBoJpV3VQA"
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
