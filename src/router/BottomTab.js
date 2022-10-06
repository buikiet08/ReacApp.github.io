import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tooltip } from '@rneui/themed';
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
    const { isOpen, setIsOpen, user, setUser } = usePage()

    return (
        <>
            <View style={styles.header}>
                <ImageBackground source={images.header}
                    style={styles.background}>
                    <View style={styles.calender}>
                        {/* <Image source={images.calender} style={styles.calenderIcon} /> */}
                        <Text style={styles.calenderText}>{daysToSrting()}, {date} tháng {month}, {year}</Text>
                    </View>
                    <View style={styles.action}>
                        <TouchableOpacity activeOpacity={0.6} style={styles.search} onPress={() => navigation.navigate('Search')}>
                            <AntDesign name="search1" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                        <View>
                            {open && <Tooltip
                                visible={open}
                                onClose={() => setOpen(!open)}
                                containerStyle={{
                                    backgroundColor: 'rgba(255,255,255,0)',
                                    padding: 0,
                                    marginTop: 80,
                                    marginLeft: 20,
                                }}
                                overlayColor='rgba(0,0,0,0.2)'
                                popover={
                                    <View visible={open} style={styles.modadAuth}>
                                        {user?.status === 1 ?
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                                AsyncStorage.removeItem('user')
                                                AsyncStorage.removeItem('token')
                                                setUser(null)
                                                setOpen(false)
                                                setTimeout(
                                                    function () {
                                                        navigation.replace("Login", { replace: true })
                                                    }, 500
                                                );
                                            }}><Text style={styles.btnLogout}>Đăng xuất</Text></TouchableOpacity>
                                            :
                                            <>
                                                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                                    setOpen(false)
                                                    navigation.replace('Login')
                                                }}><Text style={styles.btnLogin}>Đăng nhập</Text></TouchableOpacity>
                                                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                                    setOpen(false)
                                                    navigation.replace('Register')
                                                }}><Text style={styles.btnRegister}>Đăng ký</Text></TouchableOpacity>
                                            </>
                                        }
                                    </View>
                                }
                                withPointer={false}
                            />}
                            <TouchableOpacity onPress={() => setOpen(!open)}>
                                <Avatar
                                    size={32}
                                    rounded
                                    title={user ? user?.data?.first_name.slice(0, 1) : null}
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
                    name='Trong nước'
                    component={Domestic}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            <AntDesign name="home" size={24} color={focused ? COLORS.primary : COLORS.secondary} />
                    }}
                />
                <Tab.Screen
                    name='Thế giới'
                    component={World}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            <Ionicons name="earth" size={24} color={focused ? COLORS.primary : COLORS.secondary} />
                    }}
                />
                <Tab.Screen
                    name='Danh mục'
                    component={isOpen ? CategoryList : Category}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            <AntDesign name="appstore-o" size={24} color={focused ? COLORS.primary : COLORS.secondary} />
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
        paddingTop: 20
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