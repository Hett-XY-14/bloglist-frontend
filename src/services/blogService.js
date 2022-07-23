import axios from 'axios'

const baseURL = '/api/blogs'
let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (blogObject) => {
    const configuration = {
        headers: {
            Authorization:token
        }
    }
    const request = axios.post(baseURL, blogObject, configuration)
    return request.then(response => response.data)
}

export default {
    getAll,
    setToken,
    create
}