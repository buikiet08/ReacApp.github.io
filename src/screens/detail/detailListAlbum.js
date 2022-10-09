import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'

function DetailListAlbum({ navigation}) {
    const {dataAlbum} = usePage()
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
                <Text style={{ fontWeight: 'bold', fontSize:18,lineHeight: 24}}>{dataAlbum.title}</Text>
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