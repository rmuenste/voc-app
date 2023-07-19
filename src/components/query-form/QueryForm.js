import React, { useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


const QueryForm = () => {
    const [formData, setFormData] = React.useState(
        {
          queryType: "firstLetterQuery",
          words: [],
          queryLetter: 'A'
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
        <div class="queryBox">
        <Card style={{ width: '18rem', textAlign: 'center' }}>
        <Card.Body>
            <Card.Title>Test Queries</Card.Title>
            <Form onSubmit={handleSubmit}>
                <Form.Select 
                    aria-label="Default select example"
                    value={formData.queryType}
                    onChange={handleChange}
                    name="queryType"
                    style={{marginBottom: '1rem'}}
                >
                <option value="firstLetterQuery">First letter query</option>
                <option value="allWordsQuery">All words query</option>
                </Form.Select>
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
        </div>
    )
};



export default QueryForm;