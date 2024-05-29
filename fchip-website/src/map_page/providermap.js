import React, { useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import ProviderCard from './providercard'; // Adjust the import path if needed

const ProviderMap = () => {
    const providers = [
        {
            name: 'Dr. Sally Smith',
            distance: 0.2,
            languages: 'English, Spanish',
            specialty: 'Pediatrics'
        },
        {
            name: 'Dr. John Robers',
            distance: 16,
            languages: 'Hmong, Spanish, English',
            specialty: 'Cardiology'
        },
        // Add more providers here
        {
            name: 'Dr. Jane Doe',
            distance: 1.5,
            languages: 'Punjabi, English',
            specialty: 'Dermatology'
        },
        {
            name: 'Dr. Emily White',
            distance: 2.3,
            languages: 'English',
            specialty: 'Neurology'
        },
        {
            name: 'Dr. Michael Green',
            distance: 4.7,
            languages: 'English',
            specialty: 'Orthopedics'
        },
        {
            name: 'Dr. David Black',
            distance: 3.6,
            languages: 'Spanish',
            specialty: 'Gastroenterology'
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = providers.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(providers.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Container fluid>
            <Row>
                <Col lg={4} md={6}>
                    <div id="provider-list">
                        {currentItems.map(provider => (
                            <ProviderCard
                                key={provider.name}
                                name={provider.name}
                                distance={provider.distance}
                                languages={provider.languages}
                                specialty={provider.specialty}
                            />
                        ))}
                    </div>
                    <Pagination>
                        {pageNumbers.map(number => (
                            <Pagination.Item
                                key={number}
                                active={number === currentPage}
                                onClick={() => handlePageChange(number)}
                            >
                                {number}
                            </Pagination.Item>
                        ))}
                    </Pagination>
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
