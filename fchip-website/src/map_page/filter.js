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
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
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

function LanguageFilterDropdown() {
    const [language, setLanguage] = useState('Select language');

    const handleSelect = (eventKey) => {
        setLanguage(eventKey);
        console.log("Filtering items by language:", eventKey);
    };

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
                {language}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="English">English</Dropdown.Item>
                <Dropdown.Item eventKey="Spanish">Spanish</Dropdown.Item>
                <Dropdown.Item eventKey="Hmong">Hmong</Dropdown.Item>
                <Dropdown.Item eventKey="Punjabi">Punjabi</Dropdown.Item>
                <Dropdown.Item eventKey="Tagalog">Tagalog</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function FullWidthTextInput() {
    return (
        <Form>
            <Form.Group as={Row} controlId="fullWidthTextInput" className="align-items-center">
                <Form.Label column sm="auto" className="pr-2">My Location:</Form.Label>
                <Col>
                    <Form.Control type="text" placeholder="Enter location" size="sm" />
                </Col>
            </Form.Group>
        </Form>
    );
}

function CombinedComponents() {
    return (
        <Container style={{ padding: '10px 0' }}>
            <Row className="align-items-center">
                <Col md={3} style={{ padding: '10px 0' }}>
                    <DistanceFilterDropdown />
                </Col>
                <Col md={3} style={{ padding: '10px 0' }}>
                    <LanguageFilterDropdown />
                </Col>
                <Col md={6} style={{ padding: '10px 0' }}>
                    <FullWidthTextInput />
                </Col>
            </Row>
        </Container>
    );
}

export { CombinedComponents };
