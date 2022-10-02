import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tooltip } from '@rneui/themed';
import { Avatar } from '@rneui/base';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import Home from '../screens/home';
import Domestic from '../screens/domestic';
import World from '../screens/world';
import Category from '../screens/category';
import { COLORS, images } from '../contains';
import { usePage } from '../hook/usePage';
import CategoryList from '../screens/category/categoryList';
import useQuery from '../hook/useQuery';
import postService from '../servicer/postService';
import axios from 'axios';

const Tab = createBottomTabNavigator()

function BottomTab({ navigation }) {
    const { setDataBlog } = usePage()
    const [open, setOpen] = useState(false);
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    const { isOpen, setIsOpen } = usePage()
    const [isSearch, setIsSearch] = useState(true)
    const [search, setSearch] = useState('');
    const [result, setResult] = useState(false)
    const [pageSearch, setPageSearch] = useState(false)
    let { data } = useQuery(async () => await postService.getPost(), [])
    console.error(data)
    // lấy danh sách bài viết
    const [test, setTest] = useState([])
    let body = JSON.stringify({
        "mod": "get_news_home",
        "page": 1,
    });

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://hungtan.demobcb.work/api/',
            data: body
        })
            .then((res) => {
                console.log('hasil axios', res)
                setTest(res)
            })
    }, [])

    // search
    const [searchKey, setSearchKey] = useState([])
    let value = JSON.stringify({
        "mod": "search",
        "keyword": search,
        "page": 1
    });

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://hungtan.demobcb.work/api/',
            data: value
        })
            .then((res) => {
                setSearchKey(res?.data?.data)
            })
    }, [])

    const onChange = (text) => {
        setSearch(text)
    }
    const handleChange = () => {
        setResult(true)

    }
    const handleSubmit = (search) => {
        // console.error(search)
        // setSearch(search)
        // onChange(search)
    }

    const SearchPage = () => {
        return (
            <View style={{
                flex: 1,
                paddingVertical: 20
            }}>
                {result && search !== '' &&
                    <FlatList
                        data={searchKey}
                        renderItem={({ item, index }) =>
                            item.title.toLocaleUpperCase().indexOf(search?.toLocaleUpperCase()) > -1 ?
                                <View style={styles.blogItem} key={item.id}>
                                    <TouchableOpacity style={styles.blogImage} onPress={() => {
                                        navigation.navigate('Detail')
                                        setDataBlog(item)
                                    }}>
                                        <Image source={{ uri: `${item.homeimgfile ? item.homeimgfile : 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png'}` }} style={{ width: '100%', height: 80 }} resizeMethod='resize' />
                                    </TouchableOpacity>
                                    <View style={styles.blogContent}>
                                        <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
                                        <Text style={styles.time}>{item.publtime}</Text>
                                    </View>
                                </View> : null
                        }
                        keyExtractor={(item, index) => item.id}
                        listKey="search"
                    />
                    // <FlatList
                    //     data={test.data.data}
                    //     contentContainerStyle={{ paddingHorizontal: 16 }}
                    //     renderItem={({ item, index }) =>
                    //         item.title.toLocaleUpperCase().indexOf(search?.toLocaleUpperCase()) > -1 ?
                    //             <View style={styles.blogItem} key={index}>
                    //                 <TouchableOpacity style={styles.blogImage} onPress={() => {
                    //                     navigation.navigate('Detail')
                    //                     setDataBlog(item)
                    //                 }}>
                    //                     <Image source={{ uri: `${item.homeimgfile ? item.homeimgfile : 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png'}` }} style={{ width: '100%', height: 80 }} resizeMethod='resize' />
                    //                 </TouchableOpacity>
                    //                 <View style={styles.blogContent}>
                    //                     <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
                    //                     <Text style={styles.time}>{item.publtime}</Text>
                    //                 </View>
                    //             </View> : false

                    //     }
                    //     keyExtractor={(item, index) => index.toString()}
                    //     listKey="listCategory"
                    // />
                }
            </View>
        )
    }
    return (
        <>
            <View style={styles.header}>
                <ImageBackground source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/008/141/217/small/panoramic-abstract-web-background-blue-gradient-vector.jpg' }}
                    style={styles.background}>
                    {isSearch ?
                        (
                            <>
                                <View style={styles.calender}>
                                    <Image source={images.calender} style={styles.calenderIcon} />
                                    <Text style={styles.calenderText}>{date} tháng {month}, {year}</Text>
                                </View>
                                <View style={styles.action}>
                                    <TouchableOpacity activeOpacity={0.6} style={styles.search} onPress={() => setIsSearch(!isSearch)}>
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
                            </>
                        )
                        :
                        (

                            <>
                                <View style={{ flex: 1 }}>
                                    <SearchBar
                                        containerStyle={{
                                            backgroundColor: COLORS.white,
                                            height: 48,
                                            borderRadius: 30,
                                            padding: 0,
                                            overflow: 'hidden',
                                        }}
                                        inputContainerStyle={{ backgroundColor: 'white', borderRadius: 30, marginTop: -1 }}
                                        inputStyle={{ borderColor: COLORS.white }}
                                        showCancel={true}
                                        placeholder="Tìm kiếm..."
                                        value={search}
                                        onChange={handleChange}
                                        onFocus={() => setPageSearch(true)}
                                        onChangeText={text => onChange(text)}
                                        onSubmitEditing={handleSubmit}
                                    />

                                </View>
                                <TouchableOpacity activeOpacity={0.6} style={{ marginLeft: 8 }} onPress={() => {
                                    setIsSearch(true)
                                    setPageSearch(false)
                                }}>
                                    <AntDesign name="close" size={24} color={COLORS.white} />
                                </TouchableOpacity>
                            </>
                        )
                    }


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
                    component={pageSearch ? SearchPage : Home}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            <Entypo name="news" size={24} color={focused ? COLORS.primary : COLORS.secondary} />
                    }}
                />
                <Tab.Screen
                    name='Trong nước'
                    component={pageSearch ? SearchPage : Domestic}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            <AntDesign name="home" size={24} color={focused ? COLORS.primary : COLORS.secondary} />
                    }}
                />
                <Tab.Screen
                    name='Thế giới'
                    component={pageSearch ? SearchPage : World}
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
        padding: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.gray,
        borderBottomStyle: 'solid'
    },
    btnRegister: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 8
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
        paddingLeft: 8
    },
    title: {
        fontSize: 16,
        lineHeight: 24,
        flex: 1
    },
    time: {
        color: COLORS.gray2,
    },
});
export default BottomTab