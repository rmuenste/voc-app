import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Trainer.css';
import { permutationShuffe } from "../../utils/shuffleFunctions";


const TrainerForm = () => {
    const [formData, setFormData] = React.useState(
        {
          queryType: "firstLetterQuery",
          words: [],
          queryLetter: 'A',
          fromLang: 'ru word',
          toLang: '',
        }
    );

    const location = useLocation();

    let questionData = location.state && location.state.propsData;

    const [wordsArray, setWordsArray] = useState([]);

    const [currentIndex, setCurrentIndexLoaded] = useState(0);

    const words = useSelector((state) => state.voc.vocData.words);
    const numWords = useSelector((state) => state.voc.vocData.numWords);

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



    // Code that needs to run only once on initialization
    useEffect(() => {

      // Your one-time initialization logic here
      console.log('Component initialized');

      if (numWords !== 0)
        questionData = questionData.slice(0, numWords);

      let permutation = [];

      [questionData, permutation] = permutationShuffe(questionData);

      setWordsArray(questionData);
      
      // Cleanup function (optional)
      return () => {
        console.log('Component unmounted');
      };
    }, []); // Empty dependency array makes the effect run only once    

    const handleSubmit = (event) => {
      // Stop the default form handling
      event.preventDefault();

      console.log(wordsArray[currentIndex].german_word);

      // Convert to lower string as we do case insensetive checks
      const lowercaseString1 = wordsArray[currentIndex].german_word.toLowerCase();
      const lowercaseString2 = formData.toLang.toLocaleLowerCase();

      // Check whether the user input was correct
      if(lowercaseString1 === lowercaseString2) {
        console.log("correct");
      } else {
        console.log(`wrong ${lowercaseString1} !== ${lowercaseString2}`);
      }

      if ( (currentIndex + 1)  % wordsArray.length === 0 ) {
        console.log("Test finished");
      }

      // Advance the current index
      setCurrentIndexLoaded( prevIndex => (prevIndex + 1) % wordsArray.length )
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
                      readOnly value={(wordsArray.length === 0) ? "" : wordsArray[currentIndex].russian_word}
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
            Number of words: {(words !== undefined) ? numWords : "undef"}
        </div>
        </Container>
    )
};

export default TrainerForm;