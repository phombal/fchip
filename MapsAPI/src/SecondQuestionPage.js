import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function QuestionTwo() {
  const navigate = useNavigate();
  const options = ["California", "New York", "Texas", "Florida", "Other"];

  const handleOptionClick = (option) => {
    alert(`You selected: ${option}`);
    navigate('/home');
  };

  return (
    <div>
      <Container className="p-5">
        <h1 className="mb-4">Where are you located?</h1>
        <Card>
          <Card.Body>
            {options.map((option, index) => (
              <Button
                key={index}
                variant="light"
                className="d-block mb-2 w-100"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Button>
            ))}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default QuestionTwo;
