import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';

//Utilizing the useless facts api. Access via the link
const FACT = 'https://uselessfacts.jsph.pl/today.json?language=en';

export default function TriviaAPI (props) {
    const [reset, setReset] = useState(0)
    const [fact, setFact] = useState(false)

    useEffect(() => {
        const fetchPost = async() => {
            try {
                const response = await fetch(FACT)
                const data = await response.json()
                console.log('printing fact fetch data below')
                console.log(data)
                setFact(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchPost();
    }, [reset])//add reset state here once fixed

    
    const {id, language, permalink, source, source_url, text} = fact
    
    //console.log('printing fact results below')
    //console.log(source_url)
    //console.log(question)
    //console.log(correctAnswer)

    return(
        <Card>
        <Card.Body>
                <Card.Title>Random Fact</Card.Title>
        <Card.Text>
            {text}

        </Card.Text>
            <Button onClick={() => setReset(({reset}) => reset + 1)}>New Random Fact</Button>
            <Button onClick={() => props.addLikedPost(id, permalink, source_url, text)}>Save this fact</Button>
        </Card.Body>
        </Card>
    )
}