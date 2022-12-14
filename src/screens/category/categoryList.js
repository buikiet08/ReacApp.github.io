import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from "@rneui/themed";
import { COLORS, images } from '../../contains'
import { usePage } from '../../hook/usePage'
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import url from '../../config/api';

function CategoryList({ navigation }) {
    const { setIsOpen, cateNews, setDataBlog } = usePage()
    const [listNews, setListNews] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [getId, setGetId] = useState(cateNews.id)
    const [title, setTitle] = useState(cateNews.title)

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        setLoading(true)
        let axios = require('axios')
        let body = JSON.stringify({
            "mod": "get_news_category",
            "id": getId,
            "page": page
        });
        const config = {
            method: 'post',
            url: `${url}api/`,
            data: body
        }
        await axios(config)
            .then(function (response) {
                setLoading(false)
                setListNews(response?.data)
            })
            .catch(function (error) {
                setLoading(false)
                console.error(error)
            });
    }

    const onLoadMore = async () => {
        let axios = require('axios')
        let body = JSON.stringify({
            "mod": "get_news_category",
            "id": getId,
            "page": page + 1
        });
        const config = {
            method: 'post',
            url: `${url}api/`,
            data: body
        }
        await axios(config)
            .then(function (response) {
                setLoading(false)
                setListNews([...listNews, ...response?.data])
                setPage(...page, page + 1)
            })
            .catch(function (error) {
                setLoading(false)
                console.error(error)
            });
    }
    // loading
    const renderFooter = () => {
        return (loading ?
            <ActivityIndicator size='small' animating={true} /> : page.length - 1 ? <Text style={{ color: COLORS.gray, textAlign: 'center', width: '100%' }}>B???n ???? xem h???t tin</Text> : null
        )
    }
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    setTitle(cateNews.title)
                    setListNews([])
                    getData()
                    title === cateNews.title && setIsOpen(false)
                }
                }>
                    <AntDesign name="arrowleft" size={24} color={COLORS.black4} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: 'bold', flexWrap: 'wrap', width: '85%' }}>{title}</Text>
            </View>
            {loading ? <ActivityIndicator size='small' animating={true} /> :
                <>
                    {listNews.category_child?.length > 0 &&
                        <FlatList
                            data={listNews.category_child}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ padding: 16, paddingTop: 0, height: 'auto' }}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity activeOpacity={0.8} key={Number(item.id)} style={{ minWidth: 200 }} onPress={async () => {
                                    setTitle(item.title)
                                    setLoading(true)
                                    let axios = require('axios')
                                    let body = JSON.stringify({
                                        "mod": "get_news_category",
                                        "id": item.id,
                                        "page": page
                                    });
                                    const config = {
                                        method: 'post',
                                        url: 'https://hungtan-hungnguyen.nghean.gov.vn/api/',
                                        data: body
                                    }
                                    await axios(config)
                                        .then(function (response) {
                                            setLoading(false)
                                            setListNews(response?.data)
                                        })
                                        .catch(function (error) {
                                            setLoading(false)
                                            console.error(error)
                                        });
                                }
                                }>
                                    <LinearGradient
                                        colors={['#097ead', '#097ead', '#0891ae']}
                                        style={{ borderRadius: 4, marginRight: 16, height: 50, padding: 16, paddingVertical: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>{item.title}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            }
                            keyExtractor={(item, index) => index.toString()}
                            listKey="listNewsCategoryChild"
                        />
                    }
                    {listNews.data?.length === 0 ? <Text style={{color:COLORS.black4, textAlign:'center', marginTop:20}}>Hi???n kh??ng c?? tin t???c</Text> :
                        <FlatList
                            contentContainerStyle={{ padding: 16 }}
                            data={listNews.data}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity activeOpacity={0.8} style={styles.blogItem} key={item.id} onPress={() => {
                                    navigation.navigate('Detail')
                                    setDataBlog(item)
                                }}>
                                    <View style={styles.blogImage}>
                                        <Image source={item.homeimgfile ? { uri: item.homeimgfile } : images.noImage} style={{ width: '100%', height: 90 }} resizeMethod='resize' />
                                    </View>
                                    <View style={styles.blogContent}>
                                        <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
                                        <Text style={styles.time}>{item.publtime}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={(item, index) => item.id}
                            listKey="listNewsCategory"
                            ListFooterComponent={renderFooter}
                            onEndReached={onLoadMore}
                            onEndReachedThreshold={0}
                        />
                    }
                </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16
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
})
export default CategoryList