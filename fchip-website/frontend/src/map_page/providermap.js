import React, { useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import ProviderCard from './providercard'; // Adjust the import path if needed
import Home from './Home';
import provider_json from './fchip provider directory.json'

const ProviderMap = ({provider_json}) => {
    const defaultData = [    
    ];

    const providers = provider_json
    console.log("This is the json_data: ", provider_json)
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
                            key={provider.Section.County.City.ClinicDetails.Name}
                            name={provider.Section.County.City.ClinicDetails.Name}
                            distance={provider.distance}
                            languages={provider.Section.County.City.ClinicDetails.OfficeStaffLang}
                            specialty={provider.Section.County.City.ClinicDetails.Speciality}
                            address={provider.Section.County.City.ClinicDetails.Address} // Pass the address
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
