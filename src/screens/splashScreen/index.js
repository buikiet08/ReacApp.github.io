import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { COLORS, images } from '../../contains'

function SplashScreen({navigation}) {
    setTimeout(function () {navigation.replace('BottomTab')}, 1500)
    return (
        <LinearGradient
            colors={['#087ead','#0891ae',"#fff",'#fff','#fff', '#0891ae','#087ead',]}
            style={styles.container}>
            <Image source={images.logoNa} style={{width:220, height:220}} />
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
    },
})
export default SplashScreen