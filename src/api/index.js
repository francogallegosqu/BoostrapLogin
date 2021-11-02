import axios from 'axios'

const Api = axios.create({
    baseURL:'https://strapi-app-franco.herokuapp.com',
    headers:{
        'Content-Type':'application/json;charset=utf-8',
    },
})



export default Api