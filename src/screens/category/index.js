import { Icon, ListItem } from '@rneui/themed'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view';
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'

const list = [{ title: 'Danh mục' }, { title: 'Danh mục' }, { title: 'Danh mục' }, { title: 'Danh mục' }, { title: 'Danh mục' }]
const data = [{ title: 'Tin tức' }, { title: 'Tin tức' }, { title: 'Tin tức' }, { title: 'Tin tức' }]
function Category() {
  const { setIsOpen, setDataBlog } = usePage()
  const [expanded, setExpanded] = useState(false)
  const [category, setCategory] = useState([])
  let body = JSON.stringify({
    "mod": "get_category"
  });

  useEffect(() => {
    axios({
      method: 'post',
      url: 'https://hungtan.demobcb.work/api/',
      data: body
    })
      .then((res) => {
        setCategory(res?.data?.data)
      })
  }, [])
  return (
    <ScrollView style={styles.container}>
      {/* <FlatList
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
      /> */}
      {category.map((item, index) =>
        <ListItem.Accordion
          style={{ marginBottom: 10 }}
          content={
            <>
              {/* <Icon name="place" size={30} /> */}
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
            </>
          }
          // isExpanded={}
          onPress={() => {
            setIsOpen(true)
            setDataBlog(item)
          }}
        >
          {/* <View style={{ marginBottom: 10 }}>
            {data.map((l, i) => (
              <ListItem key={i} onPress={''} bottomDivider>
                <Avatar title={l.name[0]} source={{ uri: l.avatar_url }} />
                <ListItem.Content>
                  <ListItem.Title>{i + 1}</ListItem.Title>
                  <ListItem.Subtitle>{l.title}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))}
          </View> */}
        </ListItem.Accordion>
      )}
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