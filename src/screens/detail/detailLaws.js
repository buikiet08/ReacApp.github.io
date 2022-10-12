import { AntDesign, Entypo, Feather, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, useWindowDimensions, FlatList, RefreshControl, Share, ScrollView, ActivityIndicator, Linking } from 'react-native'
import { COLORS, images } from '../../contains'
import { usePage } from '../../hook/usePage'
import RenderHtml from 'react-native-render-html';

function DetailLaws({ navigation }) {
    const scrollRef = useRef();
    const { width } = useWindowDimensions();
    const { setDataLaws, dataLaws } = usePage()
    const [data, setData] = useState([])
    const [cate, setCate] = useState([])
    const [loading, setLoading] = useState(false)
    const tagsStyles = {
        
    };
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        setLoading(true)
        let axios = require('axios')
        let body = JSON.stringify({
            "mod": "detail_law",
            "id": dataLaws.id
        });
        const config = {
            method: 'post',
            url: 'https://hungtan-hungnguyen.nghean.gov.vn/laws/api/',
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
        html: `${data.bodytext}`
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
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Văn bản</Text>
                <View style={{ width: 24 }}></View>
            </View>
            <ScrollView ref={scrollRef} style={{ flex: 1, padding: 16 }} refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={onRefreshMore}
                />
            }>
                {loading ? <ActivityIndicator size='small' animating={true} style={{ marginTop: 18 }} /> :
                    <>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 28, marginBottom: 8 }}>{data.title}</Text>
                        <View style={styles.table}>
                            <View style={[styles.row, styles.active]}>
                                <Text style={styles.lable}>Số kí hiệu</Text>
                                <Text style={styles.content}>{data.code}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.lable}>Ngày ban hành</Text>
                                <Text style={styles.content}>{data.publtime}</Text>
                            </View>
                            <View style={[styles.row, styles.active]}>
                                <Text style={styles.lable}>Ngày bắt đầu hiệu lực</Text>
                                <Text style={styles.content}>{data.start_comm_time}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.lable}>Thể loại</Text>
                                <Text style={styles.content}>{data.cat}</Text>
                            </View>
                            <View style={[styles.row, styles.active]}>
                                <Text style={styles.lable}>Lĩnh vực</Text>
                                <Text style={styles.content}>{data.aid}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.lable}>Cơ quan ban hành</Text>
                                <Text style={styles.content}>{data.subject}</Text>
                            </View>
                            <View style={[styles.row, styles.active]}>
                                <Text style={styles.lable}>Người ký</Text>
                                <Text style={styles.content}>{data.signer}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.lable}>Trạng thái</Text>
                                <Text style={styles.content}>{data.approval}</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: 16, marginVertical: 20, lineHeight: 24 }}>{data.introtext}</Text>
                        <View style={{paddingBottom: 10, marginBottom: 10, borderBottomStyle: 'solid', borderBottomColor: COLORS.gray, borderBottomWidth: 0.5 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color:COLORS.primary}}>Nội dung</Text>
                        </View>
                        <RenderHtml
                            contentWidth={width}
                            source={source}
                            tagsStyles={tagsStyles}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>Thể loại: </Text>
                            <Text>{data.cat}</Text>
                        </View>

                        {
                            data?.files &&
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Tải tập tin</Text>
                                {
                                    data?.files.map((item) =>
                                        <TouchableOpacity activeOpacity={0.8} style={{ marginBottom: 20 }} onPress={() => Linking.openURL(item.url)}>
                                            <Text style={{ color: 'blue' }}>Tải file : {item.title}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        }
                        <View style={{paddingBottom: 10, marginBottom: 10, borderBottomStyle: 'solid', borderBottomColor: COLORS.gray, borderBottomWidth: 0.5 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color:COLORS.primary}}>Văn bản khác</Text>
                        </View>
                        <FlatList
                            data={data?.other}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity style={styles.blogContent} onPress={async () => {
                                    setLoading(true);
                                    let axios = require('axios')
                                    let body = JSON.stringify({
                                        "mod": "detail_law",
                                        "id": item.id
                                    });
                                    const config = {
                                        method: 'post',
                                        url: 'https://hungtan-hungnguyen.nghean.gov.vn/laws/api/',
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
                                    setDataLaws(item)
                                    scrollTop()
                                }}>
                                    <View style={styles.contentTop}>
                                        <Ionicons name='document-text' size={18} />
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 4 }}>Số</Text>
                                        <Text style={{ fontSize: 16, color: 'red', marginLeft: 8 }}>{item.code}</Text>
                                    </View>
                                    <Text style={{ fontSize: 16, lineHeight: 24, color: COLORS.black4 }} numberOfLines={2}>Tên : {item.title}</Text>
                                </TouchableOpacity>
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
    blogContent: {
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.gray,
        borderBottomStyle: 'solid'
    },
    contentTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 10
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
    },
    table: {
        marginTop: 20
    },
    row: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    active: {
        backgroundColor: COLORS.lightGray
    },
    lable: {
        width: 120
    },
    content: {
        paddingLeft: 20
    }
})
export default DetailLaws