import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'

import { Text } from "@rneui/themed";
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

function CategoryListChild({ navigation }) {
    const { setIsOpen,setIsOpenCateChild, setCateNews, cateNews, cateNewsChild, setCateNewsChild, setDataBlog } = usePage()
    const [listNews, setListNews] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        let axios = require('axios')
        let body = JSON.stringify({
            "mod": "get_news_category",
            "id": cateNews.id,
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
            "id": cateNews.id,
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
                <TouchableOpacity onPress={() => {
                    setIsOpenCateChild(false)
                    setIsOpen(true)
                }
                }>
                    <AntDesign name="arrowleft" size={24} color={COLORS.black4} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: 'bold' }}>{cateNewsChild.title}</Text>
            </View>
            {loading ? <ActivityIndicator size='large' animating={true} /> :
                <>
                    <FlatList
                        data={listNews.category_child}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity key={item.id} style={{ minWidth: 200 }}>
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
                    <FlatList
                        contentContainerStyle={{ padding: 16 }}
                        data={listNews.data}
                        renderItem={({ item, index }) =>
                            <View style={styles.blogItem} key={item.id}>
                                <View style={styles.blogImage}>
                                    <Image source={{ uri: `${item.homeimgfile ? item.homeimgfile : 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png'}` }} style={{ width: '100%', height: 90 }} resizeMethod='resize' />
                                </View>
                                <TouchableOpacity style={styles.blogContent} onPress={() => {
                                    navigation.navigate('Detail')
                                    setDataBlog(item)
                                    setCateNewsChild(item)
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
export default CategoryListChild