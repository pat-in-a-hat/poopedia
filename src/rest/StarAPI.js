import React, { useState, useEffect } from 'react';
import TriviaAPI from './TriviaAPI'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import CloseButton from 'react-bootstrap/CloseButton'

//using mock api to store the random facts
const APILINK = 'https://634f6de2df22c2af7b512858.mockapi.io/pickem/poopedia'


//these links helpful pointers for this section
//https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/
//https://www.w3schools.com/react/react_useeffect.asp

export default function StarAPI(props) {

    //using a variety of use state hooks here
    const [revealed, setRevealed] = useState(false)//to determine whether the saved facts are revealed
    const [deleted, setDelete] = useState(0)//to call fetch each time an item is deleted
    const [loading, setLoading] = useState(true)//so that the returns don't load until after
    const [likes, setLikes] = useState([]) //for GET data storage after it is fetched

    //GET using fetch API
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await fetch(APILINK)
                const data = await response.json();
                setLikes(data)//puts the fetched data into this state array
                setLoading(false)//triggers the load state so the jsx is then loaded
            } catch (error){
                console.log('caught error while fetching')
                console.log(error)
            }
        }
        fetchLikes()

    }, [deleted])//recalls useeffect when an item is deleted

    //DELETE with fetch API
    const deleteLike = async (id) => {
        let response = await fetch (APILINK + `/${id}`, {
            method: 'DELETE'
        })
        setDelete(({deleted}) => delete + 1)//updates delete state, triggering re fecth via useeffect
    }

    //POST with fetchAPI
    const addLikedPost = async (id, permalink, sourceurl, text) => {
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

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        console.log('new like posted to mockAPI')
        let data = await response.json();
        setLikes((likes) => [data, ...likes])//adds newly posted item to the like state
    }

    //this stops the main jsx from loading, preventing an error from the like state array being blank
    //fetch has a slight delay so this prevents that delay from messing up the code loading
    if (loading) {
        return (
            <div>No likes yet...</div>
        )
    }

    //these two methods open and close the 'liked' items card
    const revealLikedFacts = () => {
            //console.log('revealed saved facts')
            setRevealed(true)
        }
    
    const concealLikedFacts = () => {
        setRevealed(false)
    }

    /*const handleSubmit = (event) => {
        event.preventDefault()
        addLikedPost(object)//PUT THAT SH IN HERE
    }*/

    //using the revealed state we can toggle between the fact viewer and the liked facts cards
    //added a max height and overflow auto styling so the mobile design stays clean
    return(
        <>
        {!revealed && <TriviaAPI addLikedPost = {addLikedPost} revealLikedFacts={revealLikedFacts}/>}
        {revealed && (
        <Card className='overflow-auto' style={{maxHeight: 600}}>
            <Card.Body>
                <CloseButton className='float-start' onClick={() => concealLikedFacts()}/>
                Saved Facts
            </Card.Body>
            <ListGroup variant='flush'>
            {likes.map((like) => (
                <ListGroup.Item variant='secondary' bg='dark' text='light' key={like.id}>
                    <Row>
                        <Col xs={9}>
                        {like.text}
                        </Col>
                        <Col>
                        <Button variant='secondary' size='sm' onClick={() => deleteLike(like.id)}>Unsave</Button>
                        </Col>
                    </Row>
                </ListGroup.Item> 
                ))
                }
            </ListGroup>
        </Card>)}
        </>
    )
}