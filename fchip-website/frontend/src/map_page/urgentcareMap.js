import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import {ProviderCard} from './providercard'; // Adjust the import path if needed
import Home from './Home';
import provider_json from './fchip_provider_directory.json'; // Adjust the import path if needed
import { LanguageFilterDropdown } from './dropdowns';
import SearchBar from './searchbar'; // Adjust the import path if needed
import DistanceCalculator from './startingdestination';

console.log("This is the full json: ", provider_json)


const UrgentcareMap = () => {
    const [resultArray, setResultArray] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [typedDoctor, setTypedDoctor] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [destination, setDestination] = useState(null);
    const [calculatedDistances, setCalculatedDistances] = useState(null);
    const itemsPerPage = 5;
    const providers = provider_json["Section"][5]["County"]["City"]
    
    useEffect(() => {
        const newArray = [];

        providers.forEach(provider => {
            const Hospitals = provider.Hospitals;
            console.log("This is the hospitals: ", Hospitals)

            if (Array.isArray(Hospitals)) {
                // If groupValue is an array of dictionaries
                Hospitals.forEach(item => {
                    const hospitalDetails = item;
                    console.log("This is the hospital details: ", hospitalDetails)
                    if (hospitalDetails) {
                        newArray.push(hospitalDetails);
                    }
                });
            } else {
                // If groupValue is a dictionary
                const hospitalDetails = Hospitals;
                if (hospitalDetails) {
                    newArray.push(hospitalDetails);
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

    const handleDistancesUpdate = (distances) => {
        setCalculatedDistances(distances);
        // console.log("new distances dropped: ", distances);
    };

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
            </Row>
                <Row>
                    <Col lg={4} md={6}>
                        <div id="provider-list">
                            {currentItems.map((provider, index) => (
                                <ProviderCard
                                key={index}
                                name={provider.Name}
                                distance={calculatedDistances ? calculatedDistances[provider.Address + ", " + provider.CityName + ", CA"] : "N/A"}
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
                        <DistanceCalculator providerCards={currentItems} onDistancesUpdate={handleDistancesUpdate}/>
                    </Col>
                </Row>
            </Container>
        );
};

export default UrgentcareMap;
