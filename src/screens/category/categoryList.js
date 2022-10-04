import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view';

import { Text, Button } from "@rneui/themed";
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

function CategoryList({ navigation }) {
    const { dataBlog, setDataBlog, setIsOpen,setCateNews } = usePage()
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
            "id": dataBlog.id,
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
                setListNews(response?.data.data)
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
            "id": dataBlog.id,
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
                if (response.data.data.length > 0) {
                    setListNews([...listNews, ...response?.data?.data])
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
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setIsOpen(false)}>
                    <AntDesign name="arrowleft" size={24} color={COLORS.black4} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: 'bold' }}>{dataBlog.title}</Text>
            </View>
            <ScrollView style={styles.container}>
                {loading ? <ActivityIndicator size='large' animating={true} /> :
                    <FlatList
                        data={listNews}
                        renderItem={({ item, index }) =>
                            <View style={styles.blogItem} key={item.id}>
                                <View style={styles.blogImage}>
                                    <Image source={{ uri: `${item.homeimgfile ? item.homeimgfile : 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png'}` }} style={{ width: '100%', height: 90 }} resizeMethod='resize' />
                                </View>
                                <TouchableOpacity style={styles.blogContent} onPress={() => {
                                    navigation.navigate('Detail')
                                    setCateNews(item)
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
                }
            </ScrollView>
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