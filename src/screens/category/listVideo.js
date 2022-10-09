import { AntDesign } from '@expo/vector-icons'
import { Video } from 'expo-av'
import React, { useRef, useState } from 'react'
import { ActivityIndicator, Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, images } from '../../contains'
import { usePage } from '../../hook/usePage'

const listVideo = [
    {
        id: 1,
        title: 'Tập huấn Chương trình Mỗi xã một sản phẩm (OCOP) năm 2021 video demo',
        link: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },
    {
        id: 2,
        title: 'Tập huấn Chương trình Mỗi xã một sản phẩm (OCOP) năm 2021 video demo',
        link: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },
    {
        id: 3,
        title: 'Tập huấn Chương trình Mỗi xã một sản phẩm (OCOP) năm 2021 video demo',
        link: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },
    {
        id: 4,
        title: 'Tập huấn Chương trình Mỗi xã một sản phẩm (OCOP) năm 2021 video demo',
        link: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },
    {
        id: 5,
        title: 'Tập huấn Chương trình Mỗi xã một sản phẩm (OCOP) năm 2021 video demo',
        link: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },
]
function ListVideo() {
    const { setIsOpen,setIsVideo } = usePage()
    const video = useRef(null)
    const secondVideo = useRef(null)
    const [status, setStatus] = useState({})
    const [statusSecond, setStatusSecond] = useState({})
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
                    setIsVideo(false)
                    setIsOpen(false)
                }}>
                    <AntDesign name="arrowleft" size={24} color={COLORS.black4} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: 'bold' }}>Video nổi bật</Text>
            </View>
            <FlatList
                contentContainerStyle={{ padding: 16,paddingTop:0}}
                data={listVideo}
                renderItem={({ item, index }) =>
                    <View style={{marginBottom:20,paddingBottom:20, borderBottomWidth:0.5,borderBottomColor:COLORS.gray,borderBottomStyle:'solid'}}>
                        <Video
                            ref={video}
                            style={styles.video}
                            source={{
                                uri: item.link,
                            }}
                            useNativeControls
                            resizeMode="contain"
                            isLooping
                            onPlaybackStatusUpdate={status => setStatus(status)}
                            onPause
                        />
                        <Text numberOfLines={3} style={{marginTop:8, fontSize: 16, lineHeight: 24}}>{item.title}</Text>
                    </View>
                }
                keyExtractor={(item, index) => item.id}
                listKey="listVideo"
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
export default ListVideo