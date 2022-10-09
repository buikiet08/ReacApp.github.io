import { AntDesign } from '@expo/vector-icons'
import { Video } from 'expo-av'
import React, { useRef, useState } from 'react'
import { ActivityIndicator, Button, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, images } from '../../contains'
import { usePage } from '../../hook/usePage'

const listAlbum = [
    {
        id: 1,
        title: 'Tập huấn Chương trình Mỗi xã một sản phẩm (OCOP) năm 2021 video demo',
        link: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 2,
        title: 'Tập huấn Chương trình Mỗi xã một sản phẩm (OCOP) năm 2021 video demo',
        link: 'https://images.unsplash.com/photo-1665237814256-16b9e0f697dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 3,
        title: 'Tập huấn Chương trình Mỗi xã một sản phẩm (OCOP) năm 2021 video demo',
        link: 'https://images.unsplash.com/photo-1664575599730-0814817939de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 4,
        title: 'Tập huấn Chương trình Mỗi xã một sản phẩm (OCOP) năm 2021 video demo',
        link: 'https://images.unsplash.com/photo-1664574653790-cee0e10a4242?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
    }
]
function ListAlbum({ navigation}) {
    const { setIsAlbum,setDataAlbum } = usePage()
    const video = useRef(null)
    const [status, setStatus] = useState({})
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    // video.current.pauseAsync()
    const onLoadMore = async () => {
        
    }
    // loading
    const renderFooter = () => {
        return (loading ?
            <ActivityIndicator size='small' animating={true} /> : page.length - 1 ? <Text style={{ color: COLORS.gray, textAlign: 'center', width: '100%' }}>Bạn đã xem hết tin</Text> : null
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    setIsAlbum(false)
                }}>
                    <AntDesign name="arrowleft" size={24} color={COLORS.black4} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: 'bold' }}>Hình ảnh</Text>
            </View>
            <FlatList
                contentContainerStyle={{ padding: 16,paddingTop:0}}
                data={listAlbum}
                renderItem={({ item, index }) =>
                    <TouchableOpacity 
                    onPress={() => {
                        setDataAlbum(item)
                        navigation.navigate('DetailListAlbum')
                    }}
                    activeOpacity={0.8} 
                    style={{marginBottom:20,paddingBottom:20, borderBottomWidth:0.5,borderBottomColor:COLORS.gray,borderBottomStyle:'solid'}}>
                        <Image
                            ref={video}
                            style={styles.video}
                            source={{
                                uri: item.link,
                            }}
                            resizeMode="contain"
                        />
                        <Text numberOfLines={3} style={{marginTop:8, fontSize: 16, lineHeight: 24}}>{item.title}</Text>
                    </TouchableOpacity>
                }
                keyExtractor={(item, index) => item.id}
                listKey="listAlbum"
                ListFooterComponent={renderFooter}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0}
            />
            
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
    }
})
export default ListAlbum