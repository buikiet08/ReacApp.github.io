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
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    // lấy danh sách bài viết
    const [data, setData] = useState([])



    useEffect(() => {
        getData(search)
    }, [page])
    const getData = async () => {
        const axios = require('axios')
        let value = JSON.stringify({
            "mod": "search",
            "keyword": search.toLocaleUpperCase().trim(),
            "page": page
        });
        const config = {
            method: 'post',
            url: 'https://hungtan.demobcb.work/api/',
            data: value
        }
        await axios(config)
            .then(function (response) {
                setLoading(false)
                setData(response?.data?.data)
            })
            .catch(function (error) {
                setLoading(false)
                console.error(error)
            });
    }
    const onLoadMore = async () => {
        let axios = require('axios')
        let value = JSON.stringify({
            "mod": "search",
            "keyword": search,
            "page": page + 1
        });
        const config = {
            method: 'post',
            url: 'https://hungtan.demobcb.work/api/',
            data: value
        }
        await axios(config)
            .then(function (response) {
                setLoading(false)
                if(response.data.data.length > 0) {
                    setData([...data, ...response?.data?.data])
                    setPage(page + 1)
                  }
            })
            .catch(function (error) {
                setLoading(false)
                console.error(error)
            });
    }
    // loading
    const renderFooter = () => {
        return (loading ?
            <ActivityIndicator size='large' animating={true} /> : <Text style={{ color: COLORS.gray, textAlign: 'center', width: '100%', marginBottom: 30 }}>Không tìm thấy dữ kiệu</Text>
        )
    }
    const handleSubmit = (search) => {
        setResult(true)
        setSearch(search)
        getData(search)
        onLoadMore(search)
    }
    // --------------------------
    const onChange = (text) => {
        setSearch(text)
    }
    
    const SearchPage = () => {
        return (
            <View style={{
                flex: 1,
                paddingVertical: 20,
                paddingHorizontal: 16
            }}>
                {result && search !== '' && <Text style={{ marginBottom: 10, }}>Kết quả tìm kiếm có ({data ? data.length : 0}) tin tức</Text>}
                {result && search !== '' &&
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) =>
                            <View style={styles.blogItem} key={item.id}>
                                <View style={styles.blogImage}>
                                    <Image source={{ uri: `${item.homeimgfile ? item.homeimgfile : 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png'}` }} style={{ width: '100%', height: 90 }} resizeMethod='resize' />
                                </View>
                                <TouchableOpacity style={styles.blogContent} onPress={() => {
                                    navigation.navigate('Detail')
                                    setDataBlog(item)
                                }}>
                                    <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
                                    <Text style={styles.time}>{item.publtime}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={(item, index) => item.id}
                        listKey="search"
                        ListFooterComponent={renderFooter}
                        onEndReached={onLoadMore}
                        onEndReachedThreshold={0}
                    />
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
                                        {open && <Tooltip
                                            visible={open}
                                            onClose={() => setOpen(!open)}
                                            containerStyle={{
                                                backgroundColor: 'rgba(255,255,255,0)',
                                                padding: 0,
                                                marginTop: 80,
                                                marginLeft: 20
                                            }}
                                            overlayColor='rgba(0,0,0,0.2)'
                                            popover={
                                                <View visible={open} style={styles.modadAuth}>
                                                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                                        setOpen(false)
                                                        navigation.replace('Login')
                                                    }}><Text style={styles.btnLogin}>Đăng nhập</Text></TouchableOpacity>
                                                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                                        setOpen(false)
                                                        navigation.replace('Register')
                                                    }}><Text style={styles.btnRegister}>Đăng ký</Text></TouchableOpacity>
                                                </View>
                                            }
                                            withPointer={false}
                                        />}
                                        <TouchableOpacity onPress={() => setOpen(!open)}>
                                            <Avatar
                                                size={40}
                                                rounded
                                                title='K'
                                                icon={{ name: 'user', type: 'font-awesome' }}
                                                containerStyle={{ backgroundColor: COLORS.primary, borderColor: COLORS.white, borderWidth: 0.5, borderStyle: 'solid' }}
                                            />
                                        </TouchableOpacity>
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
                                        onFocus={() => setPageSearch(true)}
                                        onChangeText={text => onChange(text)}
                                        onSubmitEditing={handleSubmit}
                                    />

                                </View>
                                <TouchableOpacity activeOpacity={0.6} style={{ marginLeft: 8 }} onPress={() => {
                                    setIsSearch(true)
                                    setPageSearch(false)
                                    setResult(false)
                                    setData([])
                                    setPage(1)
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
        paddingVertical: 16,
        paddingHorizontal: 32,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        overflow: 'hidden',
        color: COLORS.white,
        marginBottom: 20
    },
    btnRegister: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 16,
        paddingHorizontal: 32,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        overflow: 'hidden',
        color: COLORS.white,

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