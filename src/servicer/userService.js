const infoUser = async () => {
    let axios = require('axios')
    let body = JSON.stringify({
        "mod": "get_info_user"
    });
    let token = localStorage.getItem('token');
    if (token) {
        token = JSON.parse(token)
        await axios({
            method: 'post',
            url: 'https://hungtan.demobcb.work/users/register/',
            headers: {
                Authorization: `bearer ${token.token}`
            },
            data: body
        })
            .then(function (response) {
                setTest(response?.data.data)
            })
            .catch(function (error) {
                console.error(error)
            });
    }
}

export default infoUser