import { createContext, useContext, useEffect, useState } from "react"
import { AsyncStorage } from 'react-native';
import userService from "../servicer/userService"

const Context = createContext({})
export const PageProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [dataBlog,setDataBlog] = useState()
    const [cateNews,setCateNews] = useState()
    const [relate,setRelate] = useState()


    return <Context.Provider value={{ isOpen, setIsOpen, dataBlog,setDataBlog,cateNews,setCateNews,relate,setRelate }}>
        {children}
    </Context.Provider>
}

export const usePage = () => useContext(Context)