import React, { useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import ProviderCard from './providercard'; // Adjust the import path if needed
import Home from './Home';

const ProviderMap = () => {
    const providers = [
        {
            name: 'Dr. Sally Smith',
            distance: 0.2,
            languages: 'English, Spanish',
            specialty: 'Pediatrics',
            address: '681 Omaha Ave, Clovis, CA 93619'

        },
        {
            name: 'Dr. John Robers',
            distance: 16,
            languages: 'Hmong, Spanish, English',
            specialty: 'Cardiology',
            address: '525 El Camino Real, Menlo Park, CA 94025'
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
            specialty: 'Gastroenterology',
            address: '525 El Camino Real, Menlo Park, CA 94025'
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [destination, setDestination] = useState(null);
    const itemsPerPage = 3;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const onDirectionsFunc = (address) => {
        setDestination(address)
    }

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
                            address={provider.address} // Pass the address
                            onDirectionsClick={onDirectionsFunc}
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
                    <Home destination={destination} setDestination={setDestination} />
                </Col>
            </Row>
        </Container>
    );
};

export default ProviderMap;
