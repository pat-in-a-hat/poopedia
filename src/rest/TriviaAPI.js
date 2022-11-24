import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

//Utilizing the useless facts api. Access via the link
const FACT = 'https://uselessfacts.jsph.pl/random.json?language=en';

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
        <Card bg='secondary'>
        <Card.Body>
                <Card.Header>
                    <Card.Title>Poopedia</Card.Title>
                    <Card.Subtitle>Learn whilst doing yer business</Card.Subtitle>
                </Card.Header>
                
        <Card.Text>
            {<br></br>}
            {text}
            {<br></br>}
            {<br></br>}
        </Card.Text>
            <Row>
                <Col>
                    <Button 
                        
                        variant='outline-dark' 
                        size='sm' 
                        onClick={() => setReset(({reset}) => reset + 1)}
                    >New Fact</Button>
                </Col>
                <Col>
                    <Button
                        variant='outline-dark'
                        size='sm'
                        onClick={() => props.revealLikedFacts()}
                    >View Saved Facts</Button>
                </Col>
                <Col>
                    <Button 
                        
                        variant='outline-dark' 
                        size='sm' 
                        onClick={() => props.addLikedPost(id, permalink, source_url, text)}
                    >Save fact</Button>
                </Col>
            </Row>
        </Card.Body>
        </Card>
    )
}