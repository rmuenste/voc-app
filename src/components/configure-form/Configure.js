import React, { useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaExchangeAlt } from "react-icons/fa";
import './Configure.css';


const ConfigureForm = () => {
    const [formData, setFormData] = React.useState(
        {
          queryType: "firstLetterQuery",
          words: [],
          queryLetter: 'A',
          fromLang: 'Ru',
          toLang: 'Ger',
          numWords: 30
        }
    );

    const allWordsQuery = async () => {

        try {
            const response = await axios.get("http://localhost:5001/api/getwords");
            // This is actually executed asynchronously, but it is made sure that the data will be updated before the next render 
            setFormData( prevFormData => {
                return {
                ...prevFormData,
                words: response.data
                }
            });

        } catch(error) {
            console.log(`Error: ${error}`);
        }
    };

    const firstLetterQuery = async () => {

        try {
            const response = await axios.get("http://localhost:5001/api/getwords");
            // This is actually executed asynchronously, but it is made sure that the data will be updated before the next render 
            setFormData( prevFormData => {
                return {
                ...prevFormData,
                words: response.data
                }
            });

        } catch(error) {
            console.log(`Error: ${error}`);
        }
    };

    const handleChange = (event) => {

        const {name, value, type, checked} = event.target;
        console.log(name);
        setFormData( prevFormData => {
            return {
              ...prevFormData,
              [name]: value,
            }
        });

    };

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData)
      if(formData.queryType === "firstLetterQuery") {
        console.log(`Doing a firstLetterQuery with the letter: ${formData.queryLetter}`);
        firstLetterQuery();
      } 
      else if(formData.queryType === "allWordsQuery") {
        allWordsQuery();
      }
      else {
        console.log("Doing an empty query");
      }
    }

    return(
        <Container className="d-flex justify-content-center mycard">
        <Card style={{ width: '18rem', textAlign: 'center' }}>
        <Card.Body>
            <Card.Title>Trainer Configuration</Card.Title>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.sel1">
                <Form.Label>Number of Words</Form.Label>
                <Form.Select 
                    aria-label="Default select example"
                    value={formData.numWords}
                    onChange={handleChange}
                    name="numWords"
                    style={{marginBottom: '1rem'}}
                >
                <option value="easy">easy(30 words)</option>
                <option value="easy2">still easy(50 words)</option>
                <option value="medium">medium(75 words)</option>
                <option value="hard">hard(100 words)</option>
                <option value="insave">insane(All words)</option>
                </Form.Select>
                </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Query Letter</Form.Label>
                <Form.Control 
                      type="text" 
                      onChange={handleChange}
                      placeholder="A"
                      aria-label="Query letter input"
                      name="queryLetter"
                      value={formData.queryLetter}
                      disabled={formData.queryType !== 'firstLetterQuery' ? 'True' : null}
                />
            </Form.Group>
            <Container>
                <Row>
                    <Col xs={5}>
                    <Form.Group controlId="exampleForm.Select1">
                    <Form.Label>From</Form.Label>
                    <Form.Select 
                    aria-label="Default select example"
                    value={formData.fromLang}
                    onChange={handleChange}
                    name="fromLang"
                    style={{marginBottom: '1rem'}}
                    >
                    <option value="Ru">Ru</option>
                    <option value="Ger">Ger</option>
                    </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col>
                    <FaExchangeAlt/>
                    </Col>
                    <Col xs={5}>
                    <Form.Group controlId="exampleForm.Select2">
                    <Form.Label>To</Form.Label>
                    <Form.Select 
                    aria-label="Default select example"
                    value={formData.toLang}
                    onChange={handleChange}
                    name="toLang"
                    style={{marginBottom: '1rem'}}
                    >
                    <option value="Ger">Ger</option>
                    <option value="Ru">Ru</option>
                    </Form.Select>
                    </Form.Group>
                    </Col>
                </Row>
            </Container>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </Card.Body>
        </Card>
        { (formData.words.length > 0) ? (
        <ul>
            {formData.words.slice(0,1).map((word, index) => (
            <li key={index}>{word.german_word}</li>
            ))}
        </ul>            
        ) : null
        }
        </Container>
    )
};



export default ConfigureForm;