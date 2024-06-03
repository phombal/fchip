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
                <Dropdown.Item eventKey="hospitalMap">Hospital Map</Dropdown.Item>
                <Dropdown.Item eventKey="specialistMap">Specialist Map</Dropdown.Item>
                <Dropdown.Item eventKey="obygnMap">ObyGn Map</Dropdown.Item>

            </Dropdown.Menu>
        </Dropdown>
    );
}

export default SearchSelector;