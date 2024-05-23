
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProviderCard = ({ name, distance, rating, reviews }) => {
    return (
        <Card style={{ marginBottom: '1rem' }}>
            <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#ccc', marginRight: '1rem' }}></div>
                <div style={{ flex: '1' }}>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{distance} mi</Card.Text>
                    <Card.Text>⭐ {rating} ({reviews} Reviews)</Card.Text>
                </div>
                <Button variant="primary">Make Appointment</Button>
            </Card.Body>
        </Card>
    );
};

export default ProviderCard;
