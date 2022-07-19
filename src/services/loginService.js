const axios = require('axios')
const baseURL = '/api/login'

const login = ({username, password}) => {
    const user = axios.post(baseURL, {
        username:username,
        password:password
    })
    return user.then(response => {
        return response.data
    })
} 

export default {
    login
}