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


    return <Context.Provider value={{ isOpen, setIsOpen,isOpenCateChild,setIsOpenCateChild, dataBlog,setDataBlog,cateNews,setCateNews,relate,setRelate,cateNewsChild,setCateNewsChild }}>
        {children}
    </Context.Provider>
}

export const usePage = () => useContext(Context)