import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { COLORS, images } from '../contains'

function HeaderContent({ title }) {
    return (
        <ImageBackground source={images.headerContent} resizeMethod='resize' resizeMode='stretch' style={{ backgroundColor: COLORS.primary,borderRadius:4 }} >
            <View style={{
                paddingHorizontal: 12,
                paddingVertical: 12
            }}>
                <Text style={{ textTransform: 'uppercase', color: COLORS.white,fontWeight: 'bold'}}>{title}</Text>
            </View>
        </ImageBackground>
    )
}

export default HeaderContent