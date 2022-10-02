import api from "../config/api";
let body = JSON.stringify({
    "mod": "get_news_home",
    "page": 1,
});
const postService = {
    getPost() {
        return api.post('/api/', {
            body
        })
    },
    // getNews () {
    //     return api.get('/elearning/v4/courses')
    // }
}

export default postService