import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import {MHCard} from './providercard'; // Adjust the import path if needed
import Home from './Home';
import provider_json from './fchip_provider_directory.json'; // Adjust the import path if needed
import {LanguageFilterDropdown } from './dropdowns';
import SearchBar from './searchbar'; // Adjust the import path if needed
import DistanceCalculator from './startingdestination';

const MentalHealthMap = () => {
    const [resultArray, setResultArray] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [typedDoctor, setTypedDoctor] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [destination, setDestination] = useState(null);
    const [calculatedDistances, setCalculatedDistances] = useState(null);
    
    const itemsPerPage = 5;

    const providers = provider_json["Section"][11]["County"]["City"];
    // console.log("mental health", providers)
    
    useEffect(() => {
        const newArray = [];
        const physIds = new Set();

        providers.forEach(provider => {
            const physicianDetails = provider.PhysicianDetails;
            if (Array.isArray(physicianDetails)) {
                // If PhysicianDetails is an array, add each dictionary to resultArray
                physicianDetails.forEach(detail => {
                    const prev_len = physIds.size;
                    physIds.add(detail.LicenseNumber);
                    if (prev_len !== physIds.size) {
                        newArray.push(detail);
                    }
                });
            } else {
                const prev_len = physIds.size;
                physIds.add(physicianDetails.LicenseNumber);
                if (prev_len !== physIds.size) {
                    newArray.push(physicianDetails);
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
                <Col md={5} style={{ padding: '10px 10px' }}>
                    <div id="provider-list">
                        {currentItems.map((provider, index) => (
                            <MHCard
                                key={index}
                                name={provider.Name}
                                accepting={provider.PanelStatus}
                                distance={calculatedDistances ? calculatedDistances[provider.Address + ", " + provider.CityName + ", CA"] : "N/A"}
                                SUhours={provider.SiteHoursDay7}
                                Mhours={provider.SiteHoursDay1}
                                Thours={provider.SiteHoursDay2}
                                Whours={provider.SiteHoursDay3}
                                THhours={provider.SiteHoursDay4}
                                Fhours={provider.SiteHoursDay5}
                                SAhours={provider.SiteHoursDay6}
                                address={provider.Address1}
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
                    <DistanceCalculator providerCards={currentItems} onDistancesUpdate={handleDistancesUpdate}/>
                </Col>
            </Row>
        </Container>
    );
};

export default MentalHealthMap;
