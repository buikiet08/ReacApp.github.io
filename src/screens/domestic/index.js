import { Feather } from '@expo/vector-icons'
import React from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view';
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
function Domestic() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.boxBlog}>
        <View style={styles.titleHeader}>
          <Text style={styles.iconTrending} ><Feather name="trending-up" size={22} color={COLORS.primary} /></Text>
          <Text style={styles.textTrending}>Đang được quan tâm</Text>
        </View>
        <FlatList
          data={list}
          renderItem={({ item, index }) =>
            index < 3 &&
            <View style={styles.blogItem} key={index}>
              <View style={styles.blogImage}>
                <Image source={{ uri: `${item.image}` }} style={{ width: '100%', height: 80 }} resizeMethod='resize' />
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
      </View>
      <View style={styles.boxBlog}>
        <View style={styles.titleHeader}>
          <Text style={styles.iconTrending} ><Feather name="trending-up" size={22} color={COLORS.primary} /></Text>
          <Text style={styles.textTrending}>Nổi bật 24h</Text>
        </View>
        <FlatList
          data={list}
          renderItem={({ item, index }) =>
            index < 3 &&
            <View style={styles.blogItem} key={index}>
              <View style={styles.blogImage}>
                <Image source={{ uri: `${item.image}` }} style={{ width: '100%', height: 80 }} resizeMethod='resize' />
              </View>
              <View style={styles.blogContent}>
                <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
          listKey="listCategorydomestic"
        />
      </View>
    </ScrollView>
  )
}

export default Domestic

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  boxBlog:{
    marginBottom:0
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  iconTrending: {
    marginRight: 8
  },
  textTrending: {
    color: COLORS.primary,
    fontSize: 14,
    textTransform: 'uppercase',
  },
  blogItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gray,
    borderBottomStyle: 'solid'
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
    fontSize: 16,
    lineHeight: 24,
    flex: 1
  },
  time: {
    color: COLORS.gray2,
  }
});