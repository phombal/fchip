
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SecondQuestionPage from './SecondQuestionPage';
import Home from './Home';
import './App.css';

function App() {
  // Expanded list of options
  const navigate = useNavigate();
  const options = [
    "Dentist", "Pediatrician", "Cardiologist", "Dermatologist",
    "Neurologist", "Orthopedist", "Ophthalmologist", "Gynecologist",
    "Psychiatrist", "General Practitioner"
  ];

  const handleOptionClick = (option, nextPage) => {
    alert(`You selected: ${option}`);
    navigate(nextPage);
  };

  return (
    <Routes>
      <Route path="/" element={
        <Container className="p-5">
          <h1 className="mb-4">What type of medical service are you looking for?</h1>
          <Card>
            <Card.Body>
              {options.map((option, index) => (
                <Button
                  key={index}
                  variant="light"
                  className="d-block mb-2 w-100"
                  onClick={() => handleOptionClick(option, '/SecondQuestionPage')}
                >
                  {option}
                </Button>
              ))}
            </Card.Body>
          </Card>
        </Container>
      } />
      <Route path="/SecondQuestionPage" element={<SecondQuestionPage />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
}

export default App;
