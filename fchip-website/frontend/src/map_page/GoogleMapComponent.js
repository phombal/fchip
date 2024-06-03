import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const libraries=["places"];


const GoogleMapComponent = ({ origin, destination, modeOfTransport, onDirectionsChanged }) => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  
  useEffect(() => {
    if (origin && destination && modeOfTransport) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode[modeOfTransport],
      }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          onDirectionsChanged(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    } else {
      setDirections(null);  // Clear directions when either origin or destination is missing
    }
  }, [origin, destination, modeOfTransport, onDirectionsChanged]);

  return (
    <LoadScript
      googleMapsApiKey='AIzaSyCvA_66tIjHiQzM3K6xw-McFXlP8p-LiSQ'
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={origin || { lat: 0, lng: 0 }}
        zoom={origin ? 10 : 2} // Adjust zoom level based on the availability of origin
        onLoad={map => setMap(map)}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapComponent;

