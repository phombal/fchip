import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ProviderCard = ({ name, distance, languages, specialty, address, city, hours, onDirectionsClick }) => {
    const { t } = useTranslation(); // Hook to access translation function
    return (
        <Card style={{ marginBottom: '1rem' }}>
            <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#ccc', marginRight: '1rem' }}></div>
                <div style={{ flex: '1' }}>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{distance} mi</Card.Text>
                    <Card.Text>{t('prov_card.languages')}: English{languages ? ", " + languages : languages}</Card.Text>
                    <Card.Text>{t('prov_card.specialty')}: {specialty}</Card.Text>
                    <Card.Text>Hours: {hours}</Card.Text>
                    <Card.Text>Address: {address}, {city}, CA</Card.Text> {/* Display the address */}
                </div>
                <Button variant="danger" onClick={() => onDirectionsClick(address)}>{"Get Directions"}</Button> {/* Pass the address to the handleDirectionsClick function */}
            </Card.Body>
        </Card>
    );
};

const MHCard = ({ name, distance, accepting, address, city, Mhours, Thours, Whours, THhours, Fhours, SAhours, SUhours, onDirectionsClick }) => {
    const { t } = useTranslation(); // Hook to access translation function
    return (
        <Card style={{ marginBottom: '1rem' }}>
            <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#ccc', marginRight: '1rem' }}></div>
                <div style={{ flex: '1' }}>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{distance} mi</Card.Text>
                    <Card.Text>{accepting}</Card.Text>
                    <Card.Text>Monday hours: {Mhours}</Card.Text>
                    <Card.Text>Tuesday hours: {Thours}</Card.Text>
                    <Card.Text>Wednesday hours: {Whours}</Card.Text>
                    <Card.Text>Thursday hours: {THhours}</Card.Text>
                    <Card.Text>Friday hours: {Fhours}</Card.Text>
                    <Card.Text>Saturday hours: {SAhours}</Card.Text>
                    <Card.Text>Sunday hours: {SUhours}</Card.Text>
                    <Card.Text>Address: {address}, {city}, CA</Card.Text> {/* Display the address */}
                </div>
                <Button variant="danger" onClick={() => onDirectionsClick(address)}>{"Get Directions"}</Button> {/* Pass the address to the handleDirectionsClick function */}
            </Card.Body>
        </Card>
    );
};



export {ProviderCard, MHCard };
