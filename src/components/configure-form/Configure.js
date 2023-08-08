import React, { useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaExchangeAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import './Configure.css';


const ConfigureForm = () => {
    const [formData, setFormData] = React.useState(
        {
          queryType: "firstLetterQuery",
          words: [],
          fromLang: 'Ru',
          toLang: 'Ger',
          numWords: 30
        }
    );

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const executeQueryAndContinue = async () => {

        try {
            const response = await axios.get("http://localhost:5001/api/getwords");
            // This is actually executed asynchronously, but it is made sure that the data will be updated before the next render 
            setFormData( prevFormData => {
                return {
                ...prevFormData,
                words: response.data
                }
            });
            dispatch({type: 'voc/words', payload: response.data});

            // Assign a numeric value to the numWords variable
            dispatch({type: 'voc/num_words', payload: parseInt(formData.numWords)});
            navigate('/trainer', {state: {propsData: response.data}});

        } catch(error) {
            console.log(`Error: ${error}`);
        }
    };

    const handleChange = (event) => {

        const {name, value, type, checked} = event.target;
        console.log(value);
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
      executeQueryAndContinue();
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
                <option value="30">easy(30 words)</option>
                <option value="50">still easy(50 words)</option>
                <option value="75">medium(75 words)</option>
                <option value="100">hard(100 words)</option>
                <option value="0">insane(All words)</option>
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
        </Container>
    )
};



export default ConfigureForm;