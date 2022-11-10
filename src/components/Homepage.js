import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TriviaCard from './TriviaCard'



export default function MainPage () {

    return (
        <Container>
            <Row>
                <Col>

                </Col>
                <Col xs={6}>
                    <TriviaCard />
                </Col>
                <Col>
                
                </Col>
            </Row>
        </Container>
    )
}