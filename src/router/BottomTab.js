import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SearchBar, Tooltip } from '@rneui/themed';
import { Avatar } from '@rneui/base';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';

import Home from '../screens/home';
import Domestic from '../screens/domestic';
import World from '../screens/world';
import Category from '../screens/category';
import { COLORS, images } from '../contains';
import { usePage } from '../hook/usePage';
import CategoryList from '../screens/category/categoryList';

const Tab = createBottomTabNavigator()

function BottomTab({ navigation }) {
    const [open, setOpen] = useState(false);
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    const { isOpen, setIsOpen } = usePage()
    const [isSearch, setIsSearch] = useState(false)
    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
        console.error(search);
    };
    return (
        <>
            <View style={styles.header}>
                <ImageBackground source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/008/141/217/small/panoramic-abstract-web-background-blue-gradient-vector.jpg' }}
                    style={styles.background}>
                    {isSearch ?
                        <View style={styles.calender}>
                            <Image source={images.calender} style={styles.calenderIcon} />
                            <Text style={styles.calenderText}>{date} tháng {month}, {year}</Text>
                        </View>
                        :
                        <View style={styles.searchBox}>
                            <TouchableOpacity onPress={() => setIsSearch(true)} style={{marginRight:10}}>
                                <AntDesign name="arrowleft" size={24} color={COLORS.black4} />
                            </TouchableOpacity>
                            <View style={{ flex: 1 }}>
                                <SearchBar
                                    style={{
                                        height: 40,
                                    }}
                                    containerStyle={{
                                        backgroundColor: COLORS.white,
                                        height: 50,
                                        borderRadius: 30,
                                        padding: 0,
                                        overflow: 'hidden'
                                    }}
                                    inputContainerStyle={{ backgroundColor: 'white', borderRadius: 30 }}
                                    searchIcon={{ size: 24 }}
                                    inputStyle={{
                                        flex: 1,
                                        width: 300,
                                        backgroundColor: COLORS.white
                                    }}
                                    rightIconContainerStyle={<AntDesign name="search1" size={24} color={COLORS.black4} />}
                                    showCancel={true}
                                    placeholder="Tìm kiếm..."
                                    onChangeText={updateSearch}
                                    value={search}
                                />
                            </View>
                        </View>
                    }
                    <View style={styles.action}>
                        <TouchableOpacity activeOpacity={0.6} style={styles.search}>
                            <AntDesign name="search1" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                        <View>
                            <Tooltip
                                visible={open}
                                onOpen={() => {
                                    setOpen(true)
                                }}
                                onClose={() => {
                                    setOpen(false)
                                }}
                                closeOnlyOnBackdropPress={true}
                                animationType='fade'
                                backgroundColor={COLORS.white}
                                width={140}
                                height='auto'
                                popover={
                                    <View style={styles.modadAuth}>
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.replace('Login')}><Text style={styles.btnLogin}>Đăng nhập</Text></TouchableOpacity>
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.replace('Register')}><Text style={styles.btnRegister}>Đăng ký</Text></TouchableOpacity>
                                    </View>
                                }
                                withPointer={false}
                            >
                                <TouchableOpacity onPress={() => setOpen(true)}>
                                    <Avatar
                                        size={40}
                                        rounded
                                        icon={{ name: 'user', type: 'font-awesome' }}
                                        containerStyle={{ backgroundColor: '#6733b9' }}
                                    />
                                </TouchableOpacity>
                            </Tooltip>
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
                    component={!isOpen ? Category : CategoryList}
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
        marginLeft: 4
    },
    searchBox:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
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
        padding: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.gray,
        borderBottomStyle: 'solid'
    },
    btnRegister: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 8
    }
});
export default BottomTab