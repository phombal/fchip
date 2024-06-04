import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const DistanceCalculator = ({ providerCards, onDistancesUpdate }) => {
    const [location, setLocation] = useState('');
    const [distances, setDistances] = useState({});

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };
   

    const updateDistances = () => {
        let calculatedDistances = {};
        
        const service = new window.google.maps.DistanceMatrixService();
        const origins_array = new Array(providerCards.length).fill(location);
        const dest_array = providerCards.map(card => card.Address + ", " + card.CityName + ", CA");
        const request = {
        origins: origins_array,
        destinations: dest_array,
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false,
        };
        // get distance matrix response
        service.getDistanceMatrix(request).then((response) => {
            // Iterate through the response to construct the array of calculated distances
            console.log("response! ", response);
            response.rows[0].elements.forEach((element, index) => {
                // Extract distance information from the response
                console.log("element", element);
                const distanceText = element.distance.text;
                console.log("distance", distanceText)
                // Construct an object with the provider's name and the calculated distance
                // const calculatedDistance = { dest: dest_array[index], distance: distanceText };
                // Push the calculated distance object to the array
                calculatedDistances[dest_array[index]] = distanceText;
        });
        setDistances(calculatedDistances);
        onDistancesUpdate(calculatedDistances);
        }
    )};

    useEffect(() => {
        // Call updateDistances whenever providerCards changes
        if (providerCards && window.google && window.google.maps) {
            updateDistances();
        }
    }, [providerCards]);

    const handleSubmit = (event) => {
        event.preventDefault();
        updateDistances();
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="locationInput">
                    <Form.Label>Enter Location:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={handleLocationChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Calculate Distance
                </Button>
            </Form>
        </div>
    );
};

export default DistanceCalculator;
