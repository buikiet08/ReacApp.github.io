import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl, SafeAreaView } from 'react-native'
import { COLORS, images } from '../../contains'
import { usePage } from '../../hook/usePage'

function ListAlbum({ navigation }) {
    let listNews = useRef()
    const { setIsAlbum, setDataAlbum } = usePage()
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        setLoading(true)
        let axios = require('axios')
        let body = JSON.stringify({
            "mod": "get_album",
            "page": page
        });
        const config = {
            method: 'post',
            url: 'https://hungtan-hungnguyen.nghean.gov.vn/nvalbums/api/',
            data: body
        }
        await axios(config)
            .then(function (response) {
                setLoading(false)
                setData(response?.data.data)
            })
            .catch(function (error) {
                setLoading(false)
                console.error(error)
            });
    }

    const onLoadMore = async () => {
        let axios = require('axios')
        let body = JSON.stringify({
            "mod": "get_album",
            "page": page + 1
        });
        const config = {
            method: 'post',
            url: 'https://hungtan-hungnguyen.nghean.gov.vn/nvalbums/api/',
            data: body
        }
        await axios(config)
            .then(function (response) {
                setLoading(false)
                setData([...dataNotification, ...response?.data.data])
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
            <ActivityIndicator size='small' animating={true} /> : page.length - 1 ? <Text style={{ color: COLORS.gray, textAlign: 'center', width: '100%' }}>Bạn đã xem hết tin</Text> : null
        )
    }

    const scrollTop = () => {
        listNews.scrollToOffset({ offset: 0, animated: true })
    }
    const onRefreshMore = () => {
        setData([])
        getData()
    }
    let dataKey = Object.keys(data)
    let dataValue = Object.values(data)

    // const data2 = data.map(key => console.log(data1[key]))
    // console.log(data2)

    // console.log(data.map(key => dataNotification[key].title))
    // onScroll={(event) => setPosition(event.nativeEvent.contentOffset.y)}
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    setIsAlbum(false)
                }}>
                    <AntDesign name="arrowleft" size={24} color={COLORS.black4} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: 'bold' }}>Hình ảnh</Text>
            </View>
            {loading ? <ActivityIndicator size='small' animating={true} style={{ marginTop: 10 }} /> :
                <FlatList
                    data={dataValue}
                    renderItem={(item, index) =>
                        // console.log(data1[key.item]?.title, 'vào nha')
                        <TouchableOpacity
                            key={item.item?.id}
                            onPress={() => {
                                setDataAlbum(item.item)
                                navigation.navigate('DetailListAlbum')
                            }}
                            activeOpacity={0.8}
                            style={{ marginBottom: 20, paddingBottom: 20, borderBottomWidth: 0.5, borderBottomColor: COLORS.gray, borderBottomStyle: 'solid' }}>
                            <Image
                                style={styles.video}
                                source={{
                                    uri: item.item?.thumb,
                                }}
                                // resizeMode="contain"
                            />
                            <Text numberOfLines={3} style={{ marginTop: 8, fontSize: 16, lineHeight: 24 }}>{item.item?.title}</Text>
                            <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: COLORS.black4 }}>{item.item?.post_name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, color: COLORS.black4 }}>{item.item?.post_time}</Text>
                                    <Text style={{ fontSize: 12, color: COLORS.black4, marginLeft: 8 }}>({item.item?.num_views} ảnh)</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    contentContainerStyle={{ padding: 16 }}
                    keyExtractor={(item, index) => item.id}
                    listKey={`list${Math.random()}`}
                    ListFooterComponent={renderFooter}
                    onEndReached={onLoadMore}
                    onEndReachedThreshold={0.5}
                    ref={(ref) => listNews = ref}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={onRefreshMore}
                        />
                    }
                />
            }
            <TouchableOpacity style={styles.scrollTopButton} onPress={scrollTop}>
                <AntDesign name="upcircle" size={36} color={COLORS.primary} />
            </TouchableOpacity>
        </>
    )
}

export default ListAlbum

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16
    },
    video: {
        height: 200,
        borderRadius: 10
    },
    scrollTopButton: {
        position: 'absolute',
        bottom: 20,
        right: 10
    },
});