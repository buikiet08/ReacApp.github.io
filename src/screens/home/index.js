import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../contains'

const list = [
  {
    image: 'https://images.unsplash.com/photo-1664516918198-e7ddd1bade3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    title: 'Tặng trọn bộ thiết bị bán hàng trị giá 3.830.000đ khi mua phần mềm ECNG.',
    time: '1 giờ'
  },
  {
    image: 'https://images.unsplash.com/photo-1664516918198-e7ddd1bade3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    title: 'Tặng trọn bộ thiết bị bán hàng trị giá 3.830.000đ khi mua phần mềm ECNG.',
    time: '1 giờ'
  },
  {
    image: 'https://images.unsplash.com/photo-1664516918198-e7ddd1bade3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    title: 'Tặng trọn bộ thiết bị bán hàng trị giá 3.830.000đ khi mua phần mềm ECNG.',
    time: '1 giờ'
  },
  {
    image: 'https://images.unsplash.com/photo-1664516918198-e7ddd1bade3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    title: 'Tặng trọn bộ thiết bị bán hàng trị giá 3.830.000đ khi mua phần mềm ECNG.',
    time: '1 giờ'
  },
  {
    image: 'https://images.unsplash.com/photo-1664516918198-e7ddd1bade3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    title: 'Tặng trọn bộ thiết bị bán hàng trị giá 3.830.000đ khi mua phần mềm ECNG.',
    time: '1 giờ'
  },
  {
    image: 'https://images.unsplash.com/photo-1664516918198-e7ddd1bade3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    title: 'Tặng trọn bộ thiết bị bán hàng trị giá 3.830.000đ khi mua phần mềm ECNG.',
    time: '1 giờ'
  },
  {
    image: 'https://images.unsplash.com/photo-1664516918198-e7ddd1bade3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    title: 'Tặng trọn bộ thiết bị bán hàng trị giá 3.830.000đ khi mua phần mềm ECNG.',
    time: '1 giờ'
  },
  {
    image: 'https://images.unsplash.com/photo-1664516918198-e7ddd1bade3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    title: 'Tặng trọn bộ thiết bị bán hàng trị giá 3.830.000đ khi mua phần mềm ECNG.',
    time: '1 giờ'
  },
]
function Home() {
  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={list}
        renderItem={({ item, index }) =>
          <View style={styles.blogItem} key={index}>
            <View style={styles.blogImage}>
              <Image source={{ uri: `${item.image}`}} style={{width:'100%', height:80}} resizeMethod='resize' />
            </View>
            <View style={styles.blogContent}>
              <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
        listKey="listCategory"
      />
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16
  },
  blogItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom:16,
    paddingBottom:16,
    borderBottomWidth:0.5,
    borderBottomColor:COLORS.gray,
    borderBottomStyle:'solid'
  },
  blogImage: {
    width: '30%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  blogContent: {
    paddingLeft: 8
  },
  title: {
    fontSize:16,
    lineHeight:24,
    flex:1
  },
  time: {
    color:COLORS.gray2,
  }
});