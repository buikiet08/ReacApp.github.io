import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'

function DetailListAlbum({ navigation}) {
    const {dataAlbum} = usePage()
    const [loading, setLoading] = useState(false)
    const [data,setData] = useState([])
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
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View  style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Hình ảnh</Text>
                <View style={{ width: 24 }}></View>
            </View>
            <ScrollView style={{padding: 16}}>
                <Text style={{ fontWeight: 'bold', fontSize:18,lineHeight: 24, marginBottom:20}}>{dataAlbum?.title}</Text>
                {data.map((item) => 
                <View key={item.id} style={{marginBottom:20}}>
                    <Image 
                        source={{uri: item.link}}
                        style={{height:200}}
                    />
                    <View>
                        <Text>{item.title}</Text>
                        <Text>{item.num_views} lượt xem</Text>
                    </View>
                </View>    
            )}
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
        paddingTop: 30,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.gray,
        borderBottomStyle: 'solid'
    },
})
export default DetailListAlbum