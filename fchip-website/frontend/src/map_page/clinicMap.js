import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import {ProviderCard} from './providercard'; // Adjust the import path if needed
import Home from './Home';
import provider_json from './fchip_provider_directory.json'; // Adjust the import path if needed
import { DistanceFilterDropdown, LanguageFilterDropdown } from './dropdowns';
import SearchBar from './searchbar'; // Adjust the import path if needed
import DistanceCalculator from './startingdestination';


const ClinicMap = () => {
    const [resultArray, setResultArray] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [typedDoctor, setTypedDoctor] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [destination, setDestination] = useState(null);
    const itemsPerPage = 5;
    const providers = provider_json["Section"][0]["County"]["City"]
    console.log("This is the providers: ", providers)

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
    console.log("current = ", currentItems);

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
                    <Col lg={4} md={6}>
                        <div id="provider-list">
                            {currentItems.map((provider, index) => (
                                <ProviderCard
                                key={index}
                                name={provider.Name}
                                distance={provider.Distance}
                                languages={provider.Languages}
                                specialty={provider.ClinicType}
                                hours={provider.Hours}
                                address={provider.Address}
                                city={provider.City}
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

export default ClinicMap;