import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, ImageBackground, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe';
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'

function DetailListVideo({ navigation }) {
    const scrollRef = useRef();
    const { dataVideo, setDataVideo } = usePage()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [cate, setCate] = useState([])
    const [isId, setIsId] = useState(dataVideo?.id)
    useEffect(() => {
        getData()
    }, [isId])
    const getData = async () => {
        setLoading(true)
        let axios = require('axios')
        let body = JSON.stringify({
            "mod": "detail_videoclips",
            "id": isId
        });
        const config = {
            method: 'post',
            url: 'https://hungtan-hungnguyen.nghean.gov.vn/videoclips/api/',
            data: body
        }
        await axios(config)
            .then(function (response) {
                setLoading(false)
                setData(response?.data)
                setCate(response?.data)
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
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Video</Text>
                <View style={{ width: 24 }}></View>
            </View>
            <YoutubePlayer
                videoId={data.data?.externalpath.slice(32)}
                play={false}
                height={200}
            />
            <ScrollView style={{ padding: 16, flex: 1 }} ref={scrollRef} refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={onRefreshMore}
                />}>
                {loading ? <ActivityIndicator size='small' animating={true} style={{ marginTop: -100 }} /> :
                    <>
                        <Text style={{ fontSize: 10, color: COLORS.blue, marginBottom: 4 }}>#{data.data?.keywords}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, lineHeight: 24 }}>{data.data?.title}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 20, paddingBottom: 10, borderBottomStyle: 'solid', borderBottomWidth: 0.5, borderBottomColor: COLORS.gray }}>
                            <Text style={{ color: COLORS.black4 }}><Ionicons name='eye-outline' size={16} /> lượt xem {data.data?.view}</Text>
                            <Text style={{ color: COLORS.black4 }}>
                                <Ionicons name='thumbs-up-outline' size={16} /> {data.data?.liked} <Ionicons name='thumbs-down-outline' size={16} style={{ marginLeft: 8 }} /> {data.data?.unlike}
                            </Text>
                        </View>
                        {cate?.other && Object(cate?.other) ?
                            Object.values(cate?.other)?.map(key =>
                                // console.log(key?.title ,'vàoooooooo')
                                <View key={key.id} style={{ marginBottom: 20, paddingBottom: 20, borderBottomWidth: 0.5, borderBottomColor: COLORS.gray, borderBottomStyle: 'solid' }}>
                                    <ImageBackground source={{ uri: key?.img }} style={{ height: 200, borderRadius: 10, overflow: 'hidden', borderColor: COLORS.lightGray, borderStyle: 'solid', borderWidth: 1 }} resizeMode='cover'>
                                        <TouchableOpacity activeOpacity={0.8} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}
                                            onPress={() => {
                                                setDataVideo(key)
                                                setIsId(key?.id)
                                                setData([])
                                                setCate([])
                                                getData()
                                                scrollTop()
                                            }
                                            }
                                        >
                                            <Ionicons name='play-outline' size={80} color='white' />
                                        </TouchableOpacity>
                                    </ImageBackground>
                                    <Text numberOfLines={3} style={{ marginVertical: 10, fontSize: 16, lineHeight: 24 }}>{key?.title}</Text>
                                    <Text style={{ flexDirection: 'row', alignItems: 'center', color: COLORS.black4 }}><Ionicons name='eye-outline' size={14} /> lượt xem: {key?.view}</Text>
                                </View>
                            )
                            : <Text style={{color:COLORS.black4, textAlign:'center', marginTop:20}}>Hiện không có video</Text>
                        }
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
        </SafeAreaView >
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
export default DetailListVideo