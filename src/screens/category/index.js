import { Icon, ListItem } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Linking, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view';
import url from '../../config/api';
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'

function Category({ navigation}) {
  const { setIsOpen,setIsVideo,setIsAlbum,setIsEvent, setDataBlog, setCateNews } = usePage()
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    setLoading(true)
    let axios = require('axios')
    let body = JSON.stringify({
      "mod": "get_category"
    });
    const config = {
      method: 'post',
      url: `${url}api/`,
      data: body
    }
    await axios(config)
      .then(function (response) {
        setLoading(false)
        setCategory(response?.data.data)
      })
      .catch(function (error) {
        setLoading(false)
        console.error(error)
      });
  }
  return (
    <ScrollView style={styles.container}>
      {loading ? <ActivityIndicator size='small' animating={true} style={{ marginTop: 10 }} /> :
        <>{
          category.map((item, index) =>
            <ListItem.Accordion
              key={index}
              style={{ marginBottom: 10 }}
              icon={false}
              containerStyle={{ padding: 16 }}
              content={
                <>
                  <Icon name="align-left" type='feather' size={24} color={COLORS.gray} style={{ marginRight: 8 }} />
                  <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                  </ListItem.Content>
                </>
              }
              onPress={() => {
                setIsOpen(true)
                setCateNews(item)
              }}
            />
          )}
          <ListItem.Accordion
            style={{ marginBottom: 10 }}
            icon={false}
            containerStyle={{ padding: 16 }}
            content={
              <>
                <Icon name="align-left" type='feather' size={24} color={COLORS.gray} style={{ marginRight: 8 }} />
                <ListItem.Content>
                  <ListItem.Title>Ch????ng tr??nh OCOP</ListItem.Title>
                </ListItem.Content>
              </>
            }
            onPress={() => setIsEvent(true)}
          />
          <ListItem.Accordion
            style={{ marginBottom: 10 }}
            icon={false}
            containerStyle={{ padding: 16 }}
            content={
              <>
                <Icon name="align-left" type='feather' size={24} color={COLORS.gray} style={{ marginRight: 8 }} />
                <ListItem.Content>
                  <ListItem.Title>Video n???i b???t</ListItem.Title>
                </ListItem.Content>
              </>
            }
            onPress={() => {
              setIsVideo(true)
              setIsOpen(false)
            }}
          />
          <ListItem.Accordion
            style={{ marginBottom: 30 }}
            icon={false}
            containerStyle={{ padding: 16 }}
            content={
              <>
                <Icon name="align-left" type='feather' size={24} color={COLORS.gray} style={{ marginRight: 8 }} />
                <ListItem.Content>
                  <ListItem.Title>H??nh ???nh</ListItem.Title>
                </ListItem.Content>
              </>
            }
            onPress={() => setIsAlbum(true) }
          />
        </>
      }
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