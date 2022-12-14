import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import StarAPI from '../rest/StarAPI.js'
import '../App.css';



export default function MainPage () {

    //using three columns to better center the content in the middle of the screen
    //this is similar to a website layout with sidebars on it
    return (
        <Container>
            <Row className='justify-content-center'>
                <Col style={{maxWidth: 800}}>
                    <StarAPI/>
                </Col>
            </Row>
        </Container>
    )
}