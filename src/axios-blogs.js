import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-blog-698ba-default-rtdb.firebaseio.com/'
})

export default instance;