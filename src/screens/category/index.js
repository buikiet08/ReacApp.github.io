import React, { useState } from 'react'
import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'

const data = [{ title: 'Tin tức' }, { title: 'Tin tức' }, { title: 'Tin tức' }, { title: 'Tin tức' }, { title: 'Tin tức' }, { title: 'Tin tức' }, { title: 'Tin tức' }, { title: 'Tin tức' }]
function Category() {
  const { setIsOpen,setDataBlog } = usePage()
  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={{ width: '100%' }}
        renderItem={({ item, index }) =>
          <TouchableOpacity key={index}
            style={styles.cateItem}
            activeOpacity={0.7}
            onPress={() => {
              setIsOpen(true)
              setDataBlog(item)
            }
            }>
            <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1664575600796-ffa828c5cb6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60' }}
              style={styles.background}>
              <Text style={{ textTransform: 'uppercase', color: COLORS.white, fontWeight: 'bold', zIndex: 10 }}>{item.title}</Text>
              <View style={{ position: 'absolute', top: 0, left: 0, backgroundColor: '#000', opacity: 0.6, width: '100%', height: '100%' }}></View>
            </ImageBackground>
          </TouchableOpacity>
        }
        keyExtractor={(item, index) => index.toString()}
        listKey="listCategory"
      />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingVertical: 16
  },
  cateItem: {

    marginBottom: 10,
    marginHorizontal: 4,
    flex: 1
  },
  background: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    height: 100,
  }
})
export default Category