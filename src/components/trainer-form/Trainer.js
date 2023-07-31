import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaExchangeAlt } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Trainer.css';


const TrainerForm = () => {
    const [formData, setFormData] = React.useState(
        {
          queryType: "firstLetterQuery",
          words: [],
          queryLetter: 'A',
          fromLang: 'ru word',
          toLang: '',
          numWords: 30
        }
    );

//    const [wordData, setWordData] = React.useState(
//        {
//            currentIndex: 0,
//            
//        }
//    );

    const location = useLocation();

    let questionData = location.state && location.state.propsData;

    const [wordsLoaded, setWordsLoaded] = useState(false);

    const [currentIndex, setCurrentIndexLoaded] = useState(0);

    const words = useSelector((state) => state.voc.vocData.words);

    const dispatch = useDispatch();

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

    questionData = questionData.slice(0, 30);

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(questionData[currentIndex].german_word);
      const lowercaseString1 = questionData[currentIndex].german_word.toLowerCase();
      const lowercaseString2 = formData.toLang.toLocaleLowerCase();
      if(lowercaseString1 === lowercaseString2) {
        console.log("correct");
      } else {
        console.log(`wrong ${lowercaseString1} !== ${lowercaseString2}`);
      }
      setCurrentIndexLoaded( prevIndex => (prevIndex + 1) % questionData.length )
      setFormData( prevFormData => {
          return {
            ...prevFormData,
            toLang: '',
          }
      });

    }

    return(
        <Container className="d-flex justify-content-center mycard">
        <Card style={{ width: '18rem', textAlign: 'center' }}>
        <Card.Body>
            <Card.Title>Vocabulary Trainer</Card.Title>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>From Lang</Form.Label>
                <Form.Control 
                      readOnly value={questionData[currentIndex].russian_word}
                      type="text" 
                      placeholder="from language"
                      aria-label="From language input"
                      name="fromLang"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>To Lang</Form.Label>
                <Form.Control 
                      type="text" 
                      onChange={handleChange}
                      placeholder="to language"
                      aria-label="To language input"
                      name="toLang"
                      value={formData.toLang}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </Card.Body>
        </Card>
        <div>
            Number of words: {(words !== undefined) ? words.length : "undef"}
        </div>
        </Container>
    )
};



export default TrainerForm;