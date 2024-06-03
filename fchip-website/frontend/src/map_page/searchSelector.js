import React from 'react';
import { Dropdown } from 'react-bootstrap';

function SearchSelector({ selectedMap, onSelectMap }) {
    return (
        <Dropdown onSelect={onSelectMap}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {selectedMap}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="pcpMap">Primary Care Physicians</Dropdown.Item>
                <Dropdown.Item eventKey="hospitalMap">Hospitals</Dropdown.Item>
                <Dropdown.Item eventKey="specialistMap">Specialists</Dropdown.Item>
                <Dropdown.Item eventKey="obygnMap">ObyGns</Dropdown.Item>
                <Dropdown.Item eventKey="mhMap">Mental Health Providers</Dropdown.Item>

            </Dropdown.Menu>
        </Dropdown>
    );
}

export default SearchSelector;