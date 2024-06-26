import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ProviderCard = ({ name, distance, languages, specialty, address, onDirectionsClick }) => {
    const { t } = useTranslation(); // Hook to access translation function
    return (
        <Card style={{ marginBottom: '1rem' }}>
            <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#ccc', marginRight: '1rem' }}></div>
                <div style={{ flex: '1' }}>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{distance} mi</Card.Text>
                    <Card.Text>{t('prov_card.languages')}: {languages}</Card.Text>
                    <Card.Text>{t('prov_card.specialty')}: {specialty}</Card.Text>
                    <Card.Text>Address: {address}</Card.Text> {/* Display the address */}
                </div>
                <Button variant="danger" onClick={() => onDirectionsClick(address)}>{"Get Directions"}</Button> {/* Pass the address to the handleDirectionsClick function */}
            </Card.Body>
        </Card>
    );
};



export default ProviderCard;
