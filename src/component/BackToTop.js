import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS } from '../contains'

function BackToTop({listRef}) {
    const scrollTop = () => {
        if (listRef?.current) {
          listRef.current?.scrollToOffset({ offset: 0, animated: true })
        }
      }
    return (
        <TouchableOpacity style={styles.scrollTopButton} onPress={scrollTop}>
            <AntDesign name="upcircle" size={44} color={COLORS.primary} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    scrollTopButton: {
        position: 'absolute',
        bottom: 60,
        right: 10
    },
})
export default BackToTop