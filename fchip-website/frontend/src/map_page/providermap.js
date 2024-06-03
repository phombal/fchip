import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import ProviderCard from './providercard'; // Adjust the import path if needed
import Home from './Home';
import provider_json from './fchip provider directory.json'; // Adjust the import path if needed
import { DistanceFilterDropdown, LanguageFilterDropdown } from './dropdowns';
import SearchBar from './searchbar'; // Adjust the import path if needed
import DistanceCalculator from './startingdestination';

const ProviderMap = () => {
    const providers = provider_json["Section"][1]["County"]["City"];

    const [resultArray, setResultArray] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [typedDoctor, setTypedDoctor] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [destination, setDestination] = useState(null);
    const itemsPerPage = 10;

    useEffect(() => {
        const newArray = [];
        const physIds = new Set();

        providers.forEach(provider => {
            const groupValue = provider.Group;

            if (Array.isArray(groupValue)) {
                groupValue.forEach(item => {
                    const specialities = item.Specialities;
                    const physicianDetails = specialities && specialities.PhysicianDetails;
                    if (physicianDetails) {
                        if (Array.isArray(physicianDetails)) {
                            physicianDetails.forEach(detail => {
                                const prev_len = physIds.size;
                                physIds.add(detail.PhyId);
                                if (prev_len !== physIds.size) {
                                    newArray.push(detail);
                                }
                            });
                        } else {
                            const prev_len = physIds.size;
                            physIds.add(physicianDetails.PhyId);
                            if (prev_len !== physIds.size) {
                                newArray.push(physicianDetails);
                            }
                        }
                    }
                });
            } else {
                const specialities = groupValue.Specialities;
                const physicianDetails = specialities && specialities.PhysicianDetails;
                if (physicianDetails) {
                    if (Array.isArray(physicianDetails)) {
                        physicianDetails.forEach(detail => {
                            const prev_len = physIds.size;
                            physIds.add(detail.PhyId);
                            if (prev_len !== physIds.size) {
                                newArray.push(detail);
                            }
                        });
                    } else {
                        const prev_len = physIds.size;
                        physIds.add(physicianDetails.PhyId);
                        if (prev_len !== physIds.size) {
                            newArray.push(physicianDetails);
                        }
                    }
                }
            }
        });
        setResultArray(newArray);
    }, [providers]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const onDirectionsFunc = (address) => {
        setDestination(address);
    };

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setCurrentPage(1); // Reset to first page when language filter changes
    };

    const handleDoctorTyped = (doctor) => {
        setTypedDoctor(doctor);
        setCurrentPage(1); // Reset to first page when doctor search changes
    };

    const filteredProviders = selectedLanguage
        ? resultArray.filter(provider => provider.Languages && provider.Languages.includes(selectedLanguage))
        : resultArray;
    console.log(typedDoctor.toLowerCase())
    const filteredByDoctor = typedDoctor
        ? filteredProviders.filter(provider => provider.Name.toLowerCase().includes(typedDoctor.toLowerCase()))
        : filteredProviders;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredByDoctor.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredByDoctor.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Container fluid>
            <Row>
            <Col md={2} style={{ padding: '10px 10px' }}>
                    <LanguageFilterDropdown
                        selectedLanguage={selectedLanguage}
                        onLanguageSelect={handleLanguageSelect}
                    />
            </Col>
            <Col md={2} style={{ padding: '10px 10px' }}>
                    <SearchBar onSearchChange={handleDoctorTyped} />
            </Col>
            <Col md={2} style={{ padding: '10px 10px' }}>
                    <DistanceCalculator/>
            </Col>
            </Row>
            <Row>
                <Col md={5} style={{ padding: '10px 10px' }}>
                    <div id="provider-list">
                        {currentItems.map((provider, index) => (
                            <ProviderCard
                                key={index}
                                name={provider.Name}
                                distance={provider.Distance}
                                languages={provider.Languages}
                                specialty={provider.Speciality}
                                hours={provider.Hours}
                                address={provider.Address}
                                city={provider.CityName}
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
                <Col lg={5}>
                    <Home destination={destination} setDestination={setDestination} />
                    <DistanceCalculator providerCards={providers} />
                </Col>
            </Row>
        </Container>
    );
};

export default ProviderMap;
