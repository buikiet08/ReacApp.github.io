import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from '@rneui/base';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import Home from '../screens/home';
import Domestic from '../screens/domestic';
import World from '../screens/world';
import Category from '../screens/category';
import { COLORS, images } from '../contains';
import { usePage } from '../hook/usePage';
import CategoryList from '../screens/category/categoryList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListVideo from '../screens/category/listVideo';
import ListAlbum from '../screens/category/listAlbum';
import Event from '../screens/category/event';

const Tab = createBottomTabNavigator()

function BottomTab({ navigation }) {
    const [open, setOpen] = useState(false);
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    let today = new Date()

    //Function To Convert Day Integer to String

    function daysToSrting() {
        const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        return daysOfWeek[today.getDay()]
    }

    console.log(daysToSrting())
    const { isOpen, setIsOpen,isVideo,setIsVideo,isAlbum,setIsAlbum,isEvent,setIsEvent, user, setUser } = usePage()
    const nameUser = user?.data?.first_name
    // console.log(nameUser.split(" ")[nameUser.split(" ").length-1].slice(0,1))
    return (
        <>
            <View style={styles.header}>
                <ImageBackground source={images.header}
                    style={styles.background}>
                    <View style={styles.calender}>
                        <Text style={styles.calenderText}>{daysToSrting()}, {date} tháng {month}, {year}</Text>
                    </View>
                    <View style={styles.action}>
                        <TouchableOpacity activeOpacity={0.6} style={styles.search} onPress={() => navigation.navigate('Search')}>
                            <AntDesign name="search1" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity onPress={() => user?.status === 1 ? navigation.replace('Info') : navigation.navigate('Login')}>
                                <Avatar
                                    size={32}
                                    rounded
                                    title={user ? nameUser?.split(" ")[nameUser?.split(" ").length - 1].slice(0, 1).toLocaleUpperCase() : null}
                                    icon={{ name: 'user', type: 'font-awesome' }}
                                    containerStyle={{ backgroundColor: COLORS.primary, borderColor: COLORS.white, borderWidth: 0.5, borderStyle: 'solid' }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarInactiveTintColor: COLORS.secondary,
                    headerShown: false
                }}>
                <Tab.Screen
                    name='Tin tức'
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            <Entypo name="news" size={24} color={focused ? COLORS.primary : COLORS.secondary} />
                    }}
                />
                <Tab.Screen
                    name='Thông báo'
                    component={Domestic}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            <Ionicons name="notifications-outline" size={24} color={focused ? COLORS.primary : COLORS.secondary} />
                    }}
                />
                <Tab.Screen
                    name='Văn bản'
                    component={World}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            <Ionicons name="receipt-outline" size={24} color={focused ? COLORS.primary : COLORS.secondary} />
                    }}
                />
                <Tab.Screen
                    name='Danh mục'
                    component={isOpen ? CategoryList : isVideo ? ListVideo : isAlbum ? ListAlbum : isEvent ? Event : Category}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            <AntDesign name="appstore-o" size={24} color={focused ? COLORS.primary : COLORS.secondary} />
                    }}
                    listeners={{
                        tabPress: () => {
                            Category
                            setIsOpen(false)
                            setIsVideo(false)
                            setIsAlbum(false) 
                            setIsEvent(false)
                        },
                    }}
                />
            </Tab.Navigator>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 80,
    },
    calender: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    calenderIcon: {
        width: 24,
        height: 24,
    },
    calenderText: {
        color: COLORS.white,
        fontSize: 16,
        marginLeft: 4,
        fontWeight: 'bold',
    },
    searchBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: "center",
    },
    background: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: null,
        height: null,
        paddingHorizontal: 16,
        paddingTop: 24
    },
    search: {
        marginRight: 16
    },
    modadAuth: {
    },
    btnLogin: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 16,
        paddingHorizontal: 32,
        backgroundColor: COLORS.white,
        borderRadius: 4,
        overflow: 'hidden',
        color: COLORS.black,
        marginBottom: 20,
    },
    btnRegister: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 16,
        paddingHorizontal: 32,
        backgroundColor: COLORS.white,
        borderRadius: 4,
        overflow: 'hidden',
        color: COLORS.black,
    },
    btnLogout: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 16,
        height: 50,
        paddingHorizontal: 32,
        backgroundColor: COLORS.white,
        borderRadius: 4,
        overflow: 'hidden',
        color: COLORS.black,
        marginTop: -40
    },
    blogItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.gray,
        borderBottomStyle: 'solid'
    },
    blogImage: {
        width: '30%',
        borderRadius: 4,
        overflow: 'hidden',
    },
    blogContent: {
        paddingLeft: 8,
        width: '70%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: 90
    },
    title: {
        fontSize: 17,
        lineHeight: 24,
        flex: 1
    },
    time: {
        color: COLORS.gray2,
    },
});
export default BottomTab