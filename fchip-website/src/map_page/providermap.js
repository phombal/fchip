// src/map_page/ProviderMap.js

import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import mapboxgl from 'mapbox-gl';
import ProviderCard from '../components/ProviderCard';

const ProviderMap = () => {
    useEffect(() => {
        mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
        new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-119.4179, 36.7378], // Example coordinates for Fresno, CA
            zoom: 10
        });
    }, []);

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
                    <div id="map" style={{ width: '100%', height: '500px' }}></div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProviderMap;
