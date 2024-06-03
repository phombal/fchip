import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import calculateDistance from './distancecalculation'; // Adjust the path as needed

const DistanceCalculator = ({ providerCards }) => {
    console.log(providerCards)
    const [location, setLocation] = useState('');
    const [distances, setDistances] = useState([]);

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Calculate distance for each provider card
        const calculatedDistances = providerCards.map(card => {
            const distance = calculateDistance(location, card.address);
            return { name: card.name, distance: distance };
        });
        setDistances(calculatedDistances);
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
            <div>
                {distances.map((item, index) => (
                    <p key={index}>{item.name}: {item.distance} km</p>
                ))}
            </div>
        </div>
    );
};

export default DistanceCalculator;
