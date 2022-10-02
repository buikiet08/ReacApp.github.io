import { AntDesign } from '@expo/vector-icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, useWindowDimensions, FlatList } from 'react-native'
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'
import RenderHtml from 'react-native-render-html';

function Detail({ navigation }) {
    const { width } = useWindowDimensions();
    const { dataBlog, setDataBlog } = usePage()
    const [data, setData] = useState([])
    const [cate,setCate] = useState([])
    let body = JSON.stringify({
        "mod": "detail_news",
        "id": dataBlog.id
    });

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://hungtan.demobcb.work/api/',
            data: body
        })
            .then((res) => {
                setData(res?.data?.data)
                setCate(res?.data)
            })
    }, [])
    console.error(cate.news_category)
    const source = {
        html: `${data.bodyhtml}`
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Bài viết</Text>
                <View style={{ width: 24 }}></View>
            </View>
            <ScrollView style={{ flex: 1, padding: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 28, marginBottom: 8 }}>{data.title}</Text>
                <Text style={{ marginBottom: 8 }}>{data.publtime}</Text>
                {/* <Image source={{ uri: `${dataBlog.image}` }} style={{ width: '100%', height: 160 }} resizeMethod='resize' /> */}
                <Text style={{ marginBottom: 20 }}>{data.hometext}</Text>
                <RenderHtml
                    contentWidth={width}
                    source={source}
                />
                <Text style={{ marginVertical: 20, fontWeight: 'bold', fontSize: 16 }}>Tin liên quan</Text>
                <FlatList
                    data={cate.news_category}
                    renderItem={({ item, index }) =>
                        <View style={styles.blogItem} key={item.id}>
                            <TouchableOpacity style={styles.blogImage} onPress={() => {
                                navigation.navigate('Detail')
                                setDataBlog(item)
                            }}>
                                <Image source={{ uri: `${item.homeimgfile ? item.homeimgfile : 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png'}` }} style={{ width: '100%', height: 80 }} resizeMethod='resize' />
                            </TouchableOpacity>
                            <View style={styles.blogContent}>
                                <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
                                <Text style={styles.time}>{item.publtime}</Text>
                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => item.id}
                    listKey="new_category"
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
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
        paddingLeft: 8
    },
    title: {
        fontSize: 16,
        lineHeight: 24,
        flex: 1
    },
    time: {
        color: COLORS.gray2,
    },
})
export default Detail