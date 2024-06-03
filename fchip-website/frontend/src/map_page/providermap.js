import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import ProviderCard from './providercard'; // Adjust the import path if needed
import Home from './Home';
import provider_json from './fchip provider directory.json'

const ProviderMap = () => {
    const providers = provider_json["Section"][1]["County"]["City"]

    const [resultArray, setResultArray] = useState([]);

    // TO-DO: turn resultArray into an array of dictionaries containing only the info we will use to populate provider cards!
    useEffect(() => {
        const newArray = [];
        const physIds = new Set();
    
        providers.forEach(provider => {
            const groupValue = provider.Group;
    
            if (Array.isArray(groupValue)) {
                // If groupValue is an array of dictionaries
                groupValue.forEach(item => {
                    const specialities = item.Specialities;
                    const physicianDetails = specialities && specialities.PhysicianDetails;
                    if (physicianDetails) {
                        if (Array.isArray(physicianDetails)) {
                            // If PhysicianDetails is an array, push each dictionary to newArray
                            physicianDetails.forEach(detail => {
                                const prev_len = physIds.size;
                                physIds.add(detail.PhyId);
                                if (prev_len != physIds.size) {
                                    newArray.push(detail);
                                }
                            });
                        } else {
                            // If PhysicianDetails is a single dictionary, push it to newArray
                            const prev_len = physIds.size;
                            physIds.add(physicianDetails.PhyId);
                            if (prev_len != physIds.size) {
                                newArray.push(physicianDetails);
                            }
                        }
                    }
                });
            } else {
                // If groupValue is a dictionary
                const specialities = groupValue.Specialities;
                const physicianDetails = specialities && specialities.PhysicianDetails;
                if (physicianDetails) {
                    if (Array.isArray(physicianDetails)) {
                        // If PhysicianDetails is an array, push each dictionary to newArray
                        physicianDetails.forEach(detail => {
                            const prev_len = physIds.size;
                            physIds.add(detail.PhyId);
                            if (prev_len != physIds.size) {
                                newArray.push(detail);
                            }
                        });
                    } else {
                        // If PhysicianDetails is a single dictionary, push it to newArray
                        const prev_len = physIds.size;
                        physIds.add(physicianDetails.PhyId);
                        if (prev_len != physIds.size) {
                            newArray.push(physicianDetails);
                        }

                    }
                }
            }
        });
        setResultArray(newArray);
    }, [providers]);
    

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
                            languages={provider.Languages}
                            specialty={provider.Speciality}
                            hours={provider.Hours}
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
