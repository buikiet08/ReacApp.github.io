import { createContext, useContext, useEffect, useState } from "react"
import { AsyncStorage } from 'react-native';
import userService from "../servicer/userService"

const Context = createContext({})
export const PageProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCateChild, setIsOpenCateChild] = useState(false)

    const [dataBlog,setDataBlog] = useState()
    const [cateNews,setCateNews] = useState()
    const [cateNewsChild,setCateNewsChild] = useState()
    const [relate,setRelate] = useState()

    const [user, setUser] = useState(async () => {
        const user = await AsyncStorage.getItem('user')
        if (user) return JSON.parse(user)
        return false
    })
    // thay đổi dữ liệu máy này thì máy khác cũng dc cập nhật
    useEffect(() => {
        async function info() {
            let token = AsyncStorage.getItem('token')
            if (token) {
                const user = await userService.infoUser()
                AsyncStorage.getItem('user', JSON.parse(user.data))
                setUser(user.data)
            }
        }
        info()
    }, [])

    return <Context.Provider value={{ user,setUser,isOpen, setIsOpen,isOpenCateChild,setIsOpenCateChild, dataBlog,setDataBlog,cateNews,setCateNews,relate,setRelate,cateNewsChild,setCateNewsChild }}>
        {children}
    </Context.Provider>
}

export const usePage = () => useContext(Context)