import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { COLORS, images } from '../../contains'

function SplashScreen({navigation}) {
    setTimeout(function () {navigation.replace('BottomTab')}, 1500)
    return (
        <LinearGradient
            colors={['#087ead','#097ead','#0891ae', '#0891ae','#097ead','#087ead',]}
            style={styles.container}>
            <Image source={images.newspaper} style={{width:100, height:100}} />
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