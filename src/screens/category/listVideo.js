import { AntDesign, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, ImageBackground } from 'react-native'
import { COLORS, images } from '../../contains'
import { usePage } from '../../hook/usePage'

function ListVideo({ navigation}) {
    const { width } = useWindowDimensions();
    let listNews = useRef()
    const { setIsOpen, setIsVideo,setDataVideo } = usePage()
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
            "mod": "get_videoclips",
            "page": page
        });
        const config = {
            method: 'post',
            url: 'https://hungtan-hungnguyen.nghean.gov.vn/videoclips/api/',
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
            "mod": "get_videoclips",
            "page": page + 1
        });
        const config = {
            method: 'post',
            url: 'https://hungtan-hungnguyen.nghean.gov.vn/videoclips/api/',
            data: body
        }
        await axios(config)
            .then(function (response) {
                setLoading(false)
                setData([...data, ...response?.data.data])
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
    // console.log(dataValue.reverse())
    // console.log(dataValue)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    setIsVideo(false)
                    setIsOpen(false)
                }}>
                    <AntDesign name="arrowleft" size={24} color={COLORS.black4} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: 'bold' }}>Video nổi bật</Text>
            </View>
            <FlatList
                contentContainerStyle={{ padding: 16, paddingTop: 0 }}
                data={dataValue.reverse()}
                renderItem={(item, index) =>
                    // console.log(item.item?.title, 'vào nha')
                    <TouchableOpacity onPress={() => {
                        setDataVideo(item.item)
                        navigation.navigate('DetailListVideo')
                    }} activeOpacity={0.8} style={{ marginBottom: 20, paddingBottom: 20, borderBottomWidth: 0.5, borderBottomColor: COLORS.gray, borderBottomStyle: 'solid' }}>
                        <ImageBackground source={{ uri: item.item?.img }} style={{ height: 200, borderRadius: 10, overflow: 'hidden' }} resizeMode='cover'>
                            <View  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <Ionicons name='play-outline' size={80} color='white' />
                            </View>
                        </ImageBackground>
                        <Text numberOfLines={3} style={{ marginVertical: 10, fontSize: 16, lineHeight: 24 }}>{item.item?.title}</Text>
                        <Text style={{ flexDirection: 'row', alignItems: 'center', color: COLORS.black4 }}><Ionicons name='eye-outline' size={14} /> lượt xem: {item.item?.view}</Text>
                    </TouchableOpacity>
                }
                keyExtractor={(item, index) => item.id}
                listKey="listVideo"
                ListFooterComponent={renderFooter}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0}
                ref={(ref) => listNews = ref}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefreshMore}
                    />
                }
            />
            <TouchableOpacity style={styles.scrollTopButton} onPress={scrollTop}>
                <AntDesign name="upcircle" size={36} color={COLORS.primary} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16
    },
    video: {
        height: 200,
        borderRadius: 10,
    },
    play: {
        width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.white, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
    },
    scrollTopButton: {
        position: 'absolute',
        bottom: 20,
        right: 10
    },
})
export default ListVideo