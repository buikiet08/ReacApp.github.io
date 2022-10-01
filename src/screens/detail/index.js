import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,SafeAreaView } from 'react-native'
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'

function Detail({ navigation}) {
    const { dataBlog } = usePage()
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{fontWeight:'bold', fontSize:12}}>Bài viết</Text>
                <View style={{width:24}}></View>
            </View>
            <ScrollView style={{flex:1,padding:16}}>
                <Text style={{fontSize:20, fontWeight:'bold',lineHeight:28, marginBottom:8}}>{dataBlog.title}</Text>
                <Text style={{marginBottom:8}}>{dataBlog.time}</Text>
                <Image source={{ uri: `${dataBlog.image}` }} style={{ width: '100%', height: 160 }} resizeMethod='resize' />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:16,
        borderBottomWidth:0.5,
        borderBottomColor:COLORS.gray,
        borderBottomStyle:'solid'
    }
})
export default Detail