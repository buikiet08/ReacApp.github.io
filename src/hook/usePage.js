import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from "../config/api";

const Context = createContext({})
export const PageProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isVideo, setIsVideo] = useState(false)
    const [isAlbum, setIsAlbum] = useState(false)

    const [isOpenCateChild, setIsOpenCateChild] = useState(false)
    const [dataAlbum, setDataAlbum] = useState()
    const [dataVideo, setDataVideo] = useState()
    const [dataBlog, setDataBlog] = useState()
    const [dataLaws, setDataLaws] = useState()
    const [cateNews, setCateNews] = useState()
    const [relate, setRelate] = useState()
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
                url: `${url}users/register/`,
                headers: {
                    Authorization: `bearer ${token}`
                },
                data: body
            }
            if (token) {
                return axios(config)
                    .then(function (res) {
                        const user = AsyncStorage.getItem('user')
                        if (user) {
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
    }, [])
    // thay đổi dữ liệu máy này thì máy khác cũng dc cập nhật
    useEffect(() => {
        const info = async () => {
            let token = await AsyncStorage.getItem('token')
            let body = JSON.stringify({
                "mod": "get_info_user"
            })
            const config = {
                method: 'post',
                url: `${url}users/register/`,
                headers: {
                    Authorization: `bearer ${token}`
                },
                data: body
            }
            if (token) {
                return axios(config)
                    .then(function (res) {
                        const user = AsyncStorage.getItem('user', JSON.stringify(res.data))
                        if (user) {
                            setUser(res.data)
                        }
                    })
                    .catch(function (error) {
                        console.error(error)
                    });
            }
        }
        info()
    }, [])

    return <Context.Provider value={{
        user,
        setUser,
        isOpen,
        setIsOpen,
        isVideo,
        setIsVideo,
        isAlbum,
        setIsAlbum,
        dataAlbum,
        setDataAlbum,
        dataVideo,
        setDataVideo,
        dataLaws,
        setDataLaws,
        isOpenCateChild,
        setIsOpenCateChild,
        dataBlog,
        setDataBlog,
        cateNews,
        setCateNews,
        relate,
        setRelate,
    }}>
        {children}
    </Context.Provider>
}

export const usePage = () => useContext(Context)