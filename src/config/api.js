import axios from "axios";
const api = axios.create({
    baseURL: 'https://hungtan.demobcb.work'
})

api.interceptors.response.use((res) => {
    return res.data
}, (res) => {
    throw res.response.data
})

export default api