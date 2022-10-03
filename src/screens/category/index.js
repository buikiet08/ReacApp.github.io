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
      {category.map((item, index) =>
        <ListItem.Accordion
          key={index}
          style={{ marginBottom: 10 }}
          icon={false}
          containerStyle={{padding:16}}
          content={
            <>
              <Icon name="align-left" type='feather' size={24} color={COLORS.gray} style={{marginRight:8}} />
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