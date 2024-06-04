import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import {ProviderCard} from './providercard'; // Adjust the import path if needed
import Home from './Home';
import provider_json from './fchip_provider_directory.json'; // Adjust the import path if needed
import { LanguageFilterDropdown } from './dropdowns';
import SearchBar from './searchbar'; // Adjust the import path if needed
import DistanceCalculator from './startingdestination';
import LanguageSelector from './languageSelector';

const VisionMap = () => {
    const [resultArray, setResultArray] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [typedDoctor, setTypedDoctor] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [destination, setDestination] = useState(null);
    const [calculatedDistances, setCalculatedDistances] = useState(null);
    const itemsPerPage = 5;

    const providers = provider_json["Section"][9]["County"]["City"];


    useEffect(() => {
        const newArray = [];

        providers.forEach(provider => {
            console.log("This is the provider: ", provider)
            if (Array.isArray(provider)) {
                provider.forEach(item => {
                    const physicianDetails = item.PhysicianDetails;
                    if (physicianDetails) {
                        if (Array.isArray(physicianDetails)) {
                            physicianDetails.forEach(detail => {
                                if (detail) {
                                    newArray.push(detail);
                                }
                            });
                        } else {
                            if (physicianDetails) {
                                newArray.push(physicianDetails);
                            }
                        }
                    }
                });
            } else {
                const physicianDetails = provider.PhysicianDetails;
                if (physicianDetails) {
                    if (Array.isArray(physicianDetails)) {
                        physicianDetails.forEach(detail => {
                            if (detail) {
                                newArray.push(detail);
                            }
                        });
                    } else {
                        if (physicianDetails) {
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

    const handleDistancesUpdate = (distances) => {
        setCalculatedDistances(distances);
        // console.log("new distances dropped: ", distances);
    };

    return (
        <Container fluid>
                       <Row>
            <Col md={4} style={{padding: '10px 10px'}}>
                <DistanceCalculator providerCards={currentItems} onDistancesUpdate={handleDistancesUpdate}/>
            </Col>
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
                    <LanguageSelector />
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
                    </Col>
            </Row>
        </Container>
    );
};

export default VisionMap;
