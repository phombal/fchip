import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import {ProviderCard} from './providercard';// Adjust the import path if needed
import Home from './Home';
import provider_json from './fchip_provider_directory.json'

console.log("This is the full data: ", provider_json)

const ProviderMap = () => {
    const providers = provider_json["Section"][0]["County"]["City"]
    console.log("This is the providers: ", providers)

    const [resultArray, setResultArray] = useState([]);

    useEffect(() => {
        // Fetch or set your providers array
        // Example: setProviders([...]);

        // Generate the result array inline
        const newArray = [];

        providers.forEach(provider => {
            const groupValue = provider.ClinicDetails;
            console.log("This is the groupValue: ", groupValue)

            if (Array.isArray(groupValue)) {
                // If groupValue is an array of dictionaries
                groupValue.forEach(item => {
                    const clinicDetails = item;
                    console.log("This is the clinic details: ", clinicDetails)
                    if (clinicDetails) {
                        newArray.push(clinicDetails);
                    }
                });
            } else {
                // If groupValue is a dictionary
                const clinicDetails = groupValue;
                if (clinicDetails) {
                    newArray.push(clinicDetails);
                }
            }
        });

        setResultArray(newArray);
    }, [providers]);

    console.log("This is the result array: ", resultArray)
    
    const [currentPage, setCurrentPage] = useState(0);
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
    const currentItems = resultArray.slice(indexOfFirstItem, indexOfLastItem);
    console.log("CurrentItems = ", currentItems)

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(resultArray.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

        return (
            <Container fluid>
                <Row>
                    <Col lg={4} md={6}>
                        <div id="provider-list">
                            {currentItems.map((provider, index) => (
                                <ProviderCard
                                key={index}
                                name={provider.Name}
                                distance={provider.Name}
                                languages={provider.SiteStaffLang}
                                specialty={provider.Name}
                                address={provider.Address} // Pass the address
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