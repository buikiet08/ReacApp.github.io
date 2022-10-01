import api from "../config/api";

const postService = {
    getPost () {
        return api('/posts')
    }
}

export default postService