import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

const SearchBar = ({ searchTerm, onSearchChange }) => {
    const handleSearchChange = (event) => {
        onSearchChange(event.target.value);
    };

    return (
        <Form inline="true">
            <FormControl
                type="text"
                placeholder="Search by name"
                className="mr-sm-2"
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </Form>
    );
};

export default SearchBar;
