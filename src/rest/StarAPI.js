import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const APILINK = ''


//these links helpful pointers for this section
//https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/
//https://www.w3schools.com/react/react_useeffect.asp


export default function StarAPI(props) {


    const [likes, setLikes] = useState([]) //for GET

    //GET using fetch API
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await fetch(APILINK)
                const data = await response.json();
                setLikes(data)
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
    const addLikedPost = async (object) => { //NEED TO ADD IN USESTATE FOR WHATEVER IS FED IN HERE
        let response = await fetch (APILINK, {
            method: 'POST',
            body: JSON.stringify({
                title: object.title
                //ADD IN EXACT ARRAY DETAILS HERE
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        let data = await response.json();
        setLikes((likes) => [data, ...likes])
        //RESET OTHER STATES HERE
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addLikedPost(object)//PUT THAT SH IN HERE
    }
}