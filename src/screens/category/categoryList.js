import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view';

import { Text, Button } from "@rneui/themed";
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

function CategoryList({ navigation }) {
    const { dataBlog, setDataBlog, setIsOpen } = usePage()
    const [listNews, setListNews] = useState([])
    let body = JSON.stringify({
        "mod": "get_news_category",
        "id": dataBlog.id,
        "page": 1
    });

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://hungtan.demobcb.work/api/',
            data: body
        })
            .then((res) => {
                setListNews(res?.data?.data)
            })
    }, [])
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setIsOpen(false)}>
                    <AntDesign name="arrowleft" size={24} color={COLORS.black4} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20,fontSize: 18, fontWeight: 'bold' }}>{dataBlog.title}</Text>
            </View>
            <ScrollView style={styles.container}>
                <FlatList
                    data={listNews}
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
                    listKey="listNewsCategory"
                />
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
        padding:16
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
export default CategoryList