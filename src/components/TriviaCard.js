import React from 'react';
import Card from 'react-bootstrap/Card';
import TriviaAPI from '../rest/TriviaAPI'

export default function TriviaCard(){

    return(
        <Card>
            <TriviaAPI />
        </Card>
    )
}