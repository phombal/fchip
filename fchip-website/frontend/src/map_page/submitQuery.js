import React, { useState } from 'react';
import { Dropdown, Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './languageSelector.js'
import axios from 'axios';
import { DistanceFilterDropdown, LanguageFilterDropdown } from './dropdowns.js'

function SubmitQuery({onDataReceived}) {
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/firstFiveItems');
            console.log("received data: ", response)
            onDataReceived(response.data); // Pass the fetched data to the parent component
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div>
            {error && <p>Error: {error.message}</p>}
            <Button onClick={fetchData} variant="dark">Submit</Button>
        </div>
    );
}

export default SubmitQuery;
