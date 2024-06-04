import React, {useState} from 'react';
import { Dropdown } from 'react-bootstrap';

function SearchSelector({ selectedMap, onSelectMap }) {
    const [selectedText, setSelectedText] = useState('Primary Care Physicians');

    const handleSelect = (eventKey, event) => {
        setSelectedText(event.target.textContent);
        onSelectMap(eventKey)
    };
    return (
        <div>
        <label htmlFor="dropdown-basic" style={{ marginRight: '10px' }}>What resource are you looking for?</label>
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {selectedText}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="pcpMap">Primary Care Physicians</Dropdown.Item>
                <Dropdown.Item eventKey="hospitalMap">Hospitals</Dropdown.Item>
                <Dropdown.Item eventKey="specialistMap">Specialists</Dropdown.Item>
                <Dropdown.Item eventKey="obygnMap">ObyGns</Dropdown.Item>
                <Dropdown.Item eventKey="mhMap">Mental Health Providers</Dropdown.Item>
                <Dropdown.Item eventKey="clinicMap">Clinics</Dropdown.Item>
                <Dropdown.Item eventKey="urgentcareMap">Urgent Care Facilities</Dropdown.Item>
                <Dropdown.Item eventKey="skillednursingMap">Skilled Nursing Facilities</Dropdown.Item>

            </Dropdown.Menu>
        </Dropdown>
        </div>
    );
}

export default SearchSelector;