import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProviderCard from './providercard';

const ProviderMap = () => {
    const providers = [
        {
            name: 'Dr. Sally Smith',
            distance: 0.2,
            rating: 4.8,
            reviews: 49
        },
        {
            name: 'Dr. John Robers',
            distance: 16,
            rating: 4.8,
            reviews: 49
        }
    ];

    return (
        <Container fluid>
            <Row>
                <Col lg={4} md={6}>
                    <div id="provider-list">
                        {providers.map(provider => (
                            <ProviderCard
                                key={provider.name}
                                name={provider.name}
                                distance={provider.distance}
                                rating={provider.rating}
                                reviews={provider.reviews}
                            />
                        ))}
                    </div>
                </Col>
                <Col lg={8} md={6}>
                    {/* Placeholder for where the map would be */}
                    <div id="map-placeholder" style={{ width: '100%', height: '500px', backgroundColor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h3>Map Placeholder</h3>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProviderMap;
