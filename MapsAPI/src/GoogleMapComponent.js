import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

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
    }
  }, [origin, destination, modeOfTransport, onDirectionsChanged]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDuBX2b6y-SpGeuj7KFSgBTrxBoJpV3VQA" 
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={origin}
        zoom={10}
        onLoad={map => setMap(map)}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapComponent;
