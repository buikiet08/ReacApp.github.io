import { createContext, useContext, useEffect, useState } from "react"
import { AsyncStorage } from 'react-native';
import userService from "../servicer/userService"

const Context = createContext({})
export const PageProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [dataBlog,setDataBlog] = useState()
    // initialValues là 1 callback
    // const [user, setUser] = useState(() => {
    //     const user = AsyncStorage.getItem('user')
    //     // if (user) return JSON.parse(user)
    //     return false
    // })
    // thay đổi dữ liệu máy này thì máy khác cũng dc cập nhật
    // useEffect(() => {
    //     async function info() {
    //         let token = AsyncStorage.getItem('token')
    //         if (token) {
    //             const user = await userService.infoUser()
    //             AsyncStorage.getItem('user', JSON.parse(user.data))
    //             setUser(user.data)
    //         }
    //     }
    //     info()
    // }, [])

    return <Context.Provider value={{ isOpen, setIsOpen, dataBlog,setDataBlog }}>
        {children}
    </Context.Provider>
}

export const usePage = () => useContext(Context)