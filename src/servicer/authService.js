import api from "../config/api";

const userService = {
    register (data) {
        return api.post('/users/register/', {
            data: JSON.stringify({
                "mod": "api_register_user",
                data
            })
        })
    }
}

export default userService