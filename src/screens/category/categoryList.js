import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from "@rneui/themed";
import { COLORS, images } from '../../contains'
import { usePage } from '../../hook/usePage'
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
            url: 'https://hungtan.demobcb.work/api/',
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
            url: 'https://hungtan.demobcb.work/api/',
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
            <ActivityIndicator size='large' animating={true} /> : <Text style={{ color: COLORS.gray, textAlign: 'center', width: '100%' }}>Không tìm thấy dữ liệu</Text>
        )
    }
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() =>
                    setIsOpen(false)
                }>
                    <AntDesign name="arrowleft" size={24} color={COLORS.black4} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
            </View>
            {loading ? <ActivityIndicator size='small' animating={true} /> :
                <>
                    {listNews.category_child?.length > 0 &&
                        <FlatList
                            data={listNews.category_child}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ padding: 16, paddingTop: 0 }}
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
                                        url: 'https://hungtan.demobcb.work/api/',
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
                    <FlatList
                        contentContainerStyle={{ padding: 16 }}
                        data={listNews.data}
                        renderItem={({ item, index }) =>
                            <View style={styles.blogItem} key={item.id}>
                                <View style={styles.blogImage}>
                                    <Image source={item.homeimgfile ? { uri: item.homeimgfile} : images.noImage} style={{ width: '100%', height: 90 }} resizeMethod='resize' />
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
                        listKey="listNewsCategory"
                        ListFooterComponent={renderFooter}
                        onEndReached={onLoadMore}
                        onEndReachedThreshold={0}
                    />
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