import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const ButtonFetch = () => {

    const [words, setWords] = useState([]);

    const handleClick = async () => {

        try {
            const response = await axios.get("http://localhost:5001/api/getwords");
            // This is actually executed asynchronously, but it is made sure that the data will be updated before the next render 
            setWords(response.data);

        } catch(error) {
            console.log(`Error: ${error}`);
        }

    };

    return (
      <div>
        <Button variant="primary" onClick={handleClick}>
            Fetch Words
        </Button>
        <ul>
            {words.slice(0,1).map((word, index) => (
            <li key={index}>{word.german_word}</li>
            ))}
        </ul>            
      </div>
    );
};

export default ButtonFetch;