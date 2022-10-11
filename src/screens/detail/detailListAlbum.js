import { AntDesign, Entypo } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'

function DetailListAlbum({ navigation }) {
    const scrollRef = useRef();
    const { dataAlbum } = usePage()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        setLoading(true)
        let axios = require('axios')
        let body = JSON.stringify({
            "mod": "detail_albums",
            "id": dataAlbum?.id
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
    const onRefreshMore = () => {
        setData([])
        getData()
        setCate([])
    }
    console.log(data)
    // scroll Top
    const scrollTop = () => {
        scrollRef.current?.scrollTo({
            x: 0, // Required
            y: 0, // Required
            animated: true
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Hình ảnh</Text>
                <View style={{ width: 24 }}></View>
            </View>
            <ScrollView style={{ padding: 16, flex: 1 }} ref={scrollRef} refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={onRefreshMore}
                />}>
                {loading ? <ActivityIndicator size='small' animating={true} /> :
                    <>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, lineHeight: 24, marginBottom: 20 }}>{dataAlbum?.title}</Text>
                        {data.map((item) =>
                            <View key={item.id} style={{ marginBottom: 20 }}>
                                <Image
                                    source={{ uri: item.link }}
                                    style={{ height: 200 }}
                                />
                                <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ color: COLORS.black4 }}>{item.title}</Text>
                                    <Text style={{ color: COLORS.black4 }}>{item.num_views} lượt xem</Text>
                                </View>
                            </View>
                        )}
                    </>
                }
            </ScrollView>
            <View style={styles.containerBottomTab}>
                <TouchableOpacity style={[styles.buttonBottomTab, { width: 32 }]} onPress={() => navigation.navigate('BottomTab')}>
                    <Entypo name="news" size={24} color={COLORS.primary} />
                    <Text style={{ color: COLORS.gray3, fontSize: 10, marginTop: 4 }}>Home</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.scrollTopButton} onPress={scrollTop}>
                        <AntDesign name="upcircle" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 30,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.gray,
        borderBottomStyle: 'solid'
    },
    containerBottomTab: {
        paddingHorizontal: 24,
        paddingVertical: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.gray,
        borderTopWidth: 0.3,

    },
    buttonBottomTab: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBottomTabShare: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollTopButton: {
        width: 30,
        marginLeft: 16
    },
})
export default DetailListAlbum