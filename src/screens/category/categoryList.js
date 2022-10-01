import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text, Button } from "@rneui/themed";
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'
import { AntDesign } from '@expo/vector-icons';

function CategoryList() {
    const {dataBlog,setIsOpen} = usePage()
    console.error(dataBlog)
  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsOpen(false)}>
            <AntDesign name="arrowleft" size={24} color={COLORS.black4} />
        </TouchableOpacity>
        <Text h4 style={{marginLeft:20}}>{dataBlog.title}</Text>
        </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding:16
    },
    header:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems: 'center',
    }
})
export default CategoryList