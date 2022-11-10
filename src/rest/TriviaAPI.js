import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const TRIVIA = 'https://opentdb.com/api.php?amount=1';

export default function TriviaAPI () {
    const [reset, setReset] = useState(0)
    const [trivia, setTrivia] = useState('')

    useEffect(() => {
        const fetchPost = async() => {
            try {
                const response = await fetch(TRIVIA)
                const data = await response.json()
                console.log(data)
                setTrivia(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchPost();
    }, [reset])

    console.log(trivia)

    return(
        <Card.Body>
                <Card.Title>Random Trivia Question</Card.Title>
        <Card.Text>
            test
        </Card.Text>
            <Button onClick={() => setReset((reset) => reset + 1)}>New Trivia</Button>
        </Card.Body>
    )
}