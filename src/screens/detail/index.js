import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, useWindowDimensions, FlatList, RefreshControl, Share, ScrollView, ActivityIndicator } from 'react-native'
import { COLORS, images } from '../../contains'
import { usePage } from '../../hook/usePage'
import RenderHtml from 'react-native-render-html';

function Detail({ navigation }) {
    const scrollRef = useRef();
    const { width } = useWindowDimensions();
    const { dataBlog, setDataBlog } = usePage()
    const [data, setData] = useState([])
    const [cate, setCate] = useState([])
    const [loading, setLoading] = useState(false)
    const tagsStyles = {
        body: {
            fontSize: 16,
            lineHeight: 24,
            flexDirection: 'colums',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        div:{
            width:width - 16,
            TextAlign: 'left',
        },
        span:{
            fontSize: 16,
            lineHeight: 24,
        },
        img:{
            textAlign:'left',
            width:'100%',
            height:'auto',
            maxWidth:width - 32
        },
        p:{
            marginBottom:0
        }
    };
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        setLoading(true)
        let axios = require('axios')
        let body = JSON.stringify({
            "mod": "detail_news",
            "id": dataBlog.id
        });
        const config = {
            method: 'post',
            url: 'https://hungtan.demobcb.work/api/',
            data: body
        }
        await axios(config)
            .then(function (response) {
                setLoading(false)
                setData(response?.data.data)
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
    }
    const source = {
        html: `${data.bodyhtml}`
    };
    // share
    const onShare = async () => {
        try {
            const result = await Share.share({
                title: 'Tin tức',
                message: `Chia sẻ , Link :${data.link}`,
                url: data.link
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
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
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Bài viết</Text>
                <View style={{ width: 24 }}></View>
            </View>
            <ScrollView ref={scrollRef} style={{ flex: 1, padding: 16 }} refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={onRefreshMore}
                />
            }>
                {loading ? <ActivityIndicator size='small' animating={true} style={{marginTop:18}} /> :
                    <>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 28, marginBottom: 8 }}>{data.title}</Text>
                        <Text style={{ marginBottom: 8 }}>{data.publtime}</Text>
                        <Text style={{ marginBottom: 20, fontSize: 16, lineHeight: 24 }}>{data.hometext}</Text>
                        <RenderHtml
                            contentWidth={width}
                            source={source}
                            tagsStyles={tagsStyles}
                        />
                        <Text style={{ marginVertical: 20, fontWeight: 'bold', fontSize: 16 }}>Tin liên quan</Text>
                        <FlatList
                            data={cate.related_news}
                            renderItem={({ item, index }) =>
                                <View style={styles.blogItem} key={item.id}>
                                    <View style={styles.blogImage}>
                                        <Image source={item.homeimgfile ? { uri: item.homeimgfile } : images.noImage} style={{ width: '100%', height: 90 }} resizeMethod='resize' />
                                    </View>
                                    <TouchableOpacity style={styles.blogContent} onPress={async () => {
                                        setLoading(true);
                                        let axios = require('axios')
                                        let body = JSON.stringify({
                                            "mod": "detail_news",
                                            "id": item.id
                                        });
                                        const config = {
                                            method: 'post',
                                            url: 'https://hungtan.demobcb.work/api/',
                                            data: body
                                        }
                                        await axios(config)
                                            .then(function (response) {
                                                setLoading(false)
                                                setData(response?.data.data)
                                                setCate(response?.data)
                                            })
                                            .catch(function (error) {
                                                setLoading(false)
                                                console.error(error)
                                            });
                                        setDataBlog(item)
                                        scrollTop()
                                    }}>
                                        <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
                                        <Text style={styles.time}>{item.publtime}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            keyExtractor={(item, index) => item.id}
                            listKey="new_category"
                        />
                    </>
                }
            </ScrollView>
            <View style={styles.containerBottomTab}>
                <TouchableOpacity style={[styles.buttonBottomTab, { width: 32 }]} onPress={() => navigation.navigate('BottomTab')}>
                    <Entypo name="news" size={24} color={COLORS.primary} />
                    <Text style={{ color: COLORS.gray3, fontSize: 10, marginTop: 4 }}>Home</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.buttonBottomTabShare} onPress={onShare}>
                        <Text style={{ color: COLORS.gray3, fontSize: 12, marginRight: 8 }}>Chia sẻ</Text>
                        <Feather name="share-2" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
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
    }
})
export default Detail