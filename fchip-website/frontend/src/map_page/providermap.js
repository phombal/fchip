import React, { useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import ProviderCard from './providercard'; // Adjust the import path if needed
import Home from './Home';
import { LanguageFilterDropdown, SpecialtyFilterDropdown } from './dropdowns'; // Adjust the import path if needed
import SearchBar from './searchbar'; // Adjust the import path if needed

const ProviderMap = ({ json_data }) => {
    const defaultData = [
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
        // Add more providers here with consistent address field
        {
            name: 'Dr. Jane Doe',
            distance: 1.5,
            languages: 'Punjabi, English',
            specialty: 'Dermatology',
            address: '123 Main St, Fresno, CA 93701'
        },
        {
            name: 'Dr. Emily White',
            distance: 2.3,
            languages: 'English',
            specialty: 'Neurology',
            address: '456 Center St, San Francisco, CA 94103'
        },
        {
            name: 'Dr. Michael Green',
            distance: 4.7,
            languages: 'English',
            specialty: 'Orthopedics',
            address: '789 Oak St, Sacramento, CA 95814'
        },
        {
            name: 'Dr. David Black',
            distance: 3.6,
            languages: 'Spanish',
            specialty: 'Gastroenterology',
            address: '101 Pine St, Menlo Park, CA 94025'
        },
    ];

    const providers = json_data || defaultData;
    const [currentPage, setCurrentPage] = useState(1);
    const [destination, setDestination] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 3;

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

    const handleSpecialtySelect = (specialty) => {
        setSelectedSpecialty(specialty);
        setCurrentPage(1); // Reset to first page when language filter changes
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
        setCurrentPage(1); // Reset to first page when search term changes
    };

    const filteredProviders = providers.filter(provider => {
        const matchesLanguage = selectedLanguage ? provider.languages.includes(selectedLanguage) : true;
        const matchesSearchTerm = provider.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = selectedSpecialty ? provider.specialty.includes(selectedSpecialty) : true;
        return matchesLanguage && matchesSearchTerm && matchesSpecialty;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProviders.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredProviders.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Container fluid>
            <Row>
                <Col lg={4} md={6}>
                    <div className="d-flex mb-3">
                        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                        <LanguageFilterDropdown
                            selectedLanguage={selectedLanguage}
                            onLanguageSelect={handleLanguageSelect}
                        />
                        <SpecialtyFilterDropdown
                            selectedSpecialty={selectedSpecialty}
                            onSpecialtySelect={handleSpecialtySelect}
                        />
                    </div>
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
