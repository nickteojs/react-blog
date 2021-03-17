import React from 'react'
import axios from '../axios-blogs'

const CreateBlog = () => {
    const sendData = () => {

        const data = {
            name: 'entry one',
            author: 'nick',
            desc: 'day in life'
        }

        axios.post('/blogs.json', data)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <button onClick={sendData}>Send dummy data</button>
        </div>
    )
}

export default CreateBlog
