import React, { useState } from 'react';
import { Dropdown, Form, Container, Row, Col } from 'react-bootstrap';

function DistanceFilterDropdown() {
    const [distance, setDistance] = useState('Select distance');

    const handleSelect = (eventKey) => {
        setDistance(eventKey);
        console.log("Filtering items within:", eventKey);
    };

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {distance}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="5 miles">5 miles</Dropdown.Item>
                <Dropdown.Item eventKey="10 miles">10 miles</Dropdown.Item>
                <Dropdown.Item eventKey="20 miles">20 miles</Dropdown.Item>
                <Dropdown.Item eventKey="50 miles">50 miles</Dropdown.Item>
                <Dropdown.Item eventKey="100 miles">100 miles</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function FullWidthTextInput() {
    return (
        <Form>
            <Form.Group controlId="fullWidthTextInput">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Enter location" size="sm" />
            </Form.Group>
        </Form>
    );
}

function CombinedComponents() {
    return (
        <Container>
            <Row className="align-items-center">
                <Col md={4}>
                    <DistanceFilterDropdown />
                </Col>
                <Col md={8}>
                    <FullWidthTextInput />
                </Col>
            </Row>
        </Container>
    );
}

export { CombinedComponents };
