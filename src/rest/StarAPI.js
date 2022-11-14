import React, { useState, useEffect } from 'react';
import TriviaAPI from './TriviaAPI'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

const APILINK = 'https://634f6de2df22c2af7b512858.mockapi.io/pickem/poopedia'


//these links helpful pointers for this section
//https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/
//https://www.w3schools.com/react/react_useeffect.asp


export default function StarAPI(props) {

    const [loading, setLoading] = useState(true)
    const [likes, setLikes] = useState([]) //for GET

    //GET using fetch API
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await fetch(APILINK)
                const data = await response.json();
                setLikes(data)
                setLoading(false)
            } catch (error){
                console.log('caught error while fetching')
                console.log(error)
            }
        }
        fetchLikes()

    }, [])

    //DELETE with fetch API
    const deleteLike = async (id) => {
        let response = await fetch (APILINK + `/${id}`, {
            method: 'DELETE'//NEED TO FINISH THIS METHOD
        })

    }

    //POST with fetchAPI
    const addLikedPost = async (id, permalink, sourceurl, text) => { //NEED TO ADD IN USESTATE FOR WHATEVER IS FED IN HERE
        //console.log(id)
        //console.log(permalink)
        //console.log(sourceurl)
        //console.log(text)
        console.log('attempting to post to mockAPI')
        let response = await fetch (APILINK, {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                permalink: permalink,
                sourceurl: sourceurl,
                text: text

                //ADD IN EXACT ARRAY DETAILS HERE
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        console.log('new like posted to mockAPI')
        let data = await response.json();
        setLikes((likes) => [data, ...likes])
        //RESET OTHER STATES HERE
    }

    if (loading) {
        return (
            <div>No likes yet...</div>
        )
    }

    /*const handleSubmit = (event) => {
        event.preventDefault()
        addLikedPost(object)//PUT THAT SH IN HERE
    }*/

    return(
        <>
        <TriviaAPI addLikedPost = {addLikedPost}/>
        <Card>
            <Card.Title>Saved Facts</Card.Title>
            <Card.Body>
                {console.log(likes)}
                {likes.map((like) => (
                    <Col key={like.id}>
                    {like.text}
                    <Button onClick={() => deleteLike(like.id)}>Delete</Button>
                    </Col>
                ))
                }
                
            </Card.Body>
        </Card>
        </>
    )
}