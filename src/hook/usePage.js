import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext({})
export const PageProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCateChild, setIsOpenCateChild] = useState(false)

    const [dataBlog,setDataBlog] = useState()
    const [cateNews,setCateNews] = useState()
    const [cateNewsChild,setCateNewsChild] = useState()
    const [relate,setRelate] = useState()
    const [user, setUser] = useState()

    const infoUser = async () => {
        let token = await AsyncStorage.getItem('token');
        token = JSON.parse(token)
        if (token) {
            let axios = require('axios')
            let body = JSON.stringify({
                "mod": "get_info_user"
            })
            const config = {
                method: 'post',
                url: 'https://hungtan.demobcb.work/users/register/',
                headers: {
                    Authorization: `bearer ${token}`
                },
                data: body
            }
            if (token) {
                return axios(config)
                    .then(function (res) {
                        const user = AsyncStorage.getItem('user')
                        if(user) {
                            setUser(res.data)
                        }
                    })
                    .catch(function (error) {
                        console.error(error)
                    });
            }
        }
    }
    useEffect(() => {

        infoUser()
    },[])
    // thay đổi dữ liệu máy này thì máy khác cũng dc cập nhật
    // useEffect(() => {
    //     const info = async () => {
    //         let token = await AsyncStorage.getItem('token')
    //         if (token) {
    //             const user = await userService.infoUser()
    //             AsyncStorage.getItem('user', JSON.parse(user.data))
    //             setUser(user.data)
    //         }
    //     }
    //     info()
    // }, [])

    return <Context.Provider value={{ user,setUser,isOpen, setIsOpen,isOpenCateChild,setIsOpenCateChild, dataBlog,setDataBlog,cateNews,setCateNews,relate,setRelate,cateNewsChild,setCateNewsChild }}>
        {children}
    </Context.Provider>
}

export const usePage = () => useContext(Context)