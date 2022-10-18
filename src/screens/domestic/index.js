import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native'
import url from '../../config/api';
import { COLORS, images } from '../../contains'
import { usePage } from '../../hook/usePage'

function Domestic({ navigation }) {
  let listNews = useRef()
  const { setDataBlog } = usePage(null)
  const [dataNotification, setDataNotification] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    setLoading(true)
    let axios = require('axios')
    let body = JSON.stringify({
      "mod": "get_news_category",
      "id": 6,
      "page": page
    });
    const config = {
      method: 'post',
      url: `${url}api/`,
      data: body
    }
    await axios(config)
      .then(function (response) {
        setLoading(false)
        setDataNotification(response?.data)
      })
      .catch(function (error) {
        setLoading(false)
        console.error(error)
      });
  }

  const onLoadMore = async () => {
    let axios = require('axios')
    let body = JSON.stringify({
      "mod": "get_news_category",
      "id": getId,
      "page": page + 1
    });
    const config = {
      method: 'post',
      url: `${url}api/`,
      data: body
    }
    await axios(config)
      .then(function (response) {
        setLoading(false)
        setDataNotification([...dataNotification, ...response?.data])
        setPage(...page, page + 1)
      })
      .catch(function (error) {
        setLoading(false)
        console.error(error)
      });
  }
  // loading
  const renderFooter = () => {
    return (loading ?
      <ActivityIndicator size='small' animating={true} /> : page.length - 1 ? <Text style={{ color: COLORS.gray, textAlign: 'center', width: '100%' }}>Bạn đã xem hết tin</Text> : null
    )
  }

  const scrollTop = () => {
    listNews.scrollToOffset({ offset: 0, animated: true })
  }
  const onRefreshMore = () => {
    setDataNotification([])
    getData()
  }

  // onScroll={(event) => setPosition(event.nativeEvent.contentOffset.y)}
  return (
    <>
      {loading ? <ActivityIndicator size='small' animating={true} style={{ marginTop: 10 }} /> :
        <FlatList
          data={dataNotification.data}
          renderItem={({ item, index }) =>
            <TouchableOpacity activeOpacity={0.8} style={styles.blogItem} key={item.id} onPress={() => {
              navigation.navigate('Detail')
              setDataBlog(item)
            }}>
              <View style={styles.blogImage}>
                <Image source={item.homeimgfile ? { uri: item.homeimgfile } : images.noImage} style={{ width: '100%', height: 90 }} resizeMethod='resize' />
              </View>
              <View style={styles.blogContent}>
                <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
                <Text style={styles.time}>{item.publtime}</Text>
              </View>
            </TouchableOpacity>
          }
          contentContainerStyle={{ padding: 16 }}
          keyExtractor={(item, index) => item.id}
          listKey={`list${Math.random()}`}
          ListFooterComponent={renderFooter}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          ref={(ref) => listNews = ref}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefreshMore}
            />
          }
        />
      }
      <TouchableOpacity style={styles.scrollTopButton} onPress={scrollTop}>
        <AntDesign name="upcircle" size={36} color={COLORS.primary} />
      </TouchableOpacity>
    </>
  )
}

export default Domestic

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  blogItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.gray,
    borderBottomStyle: 'solid'
  },
  blogImage: {
    width: '30%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  blogContent: {
    paddingLeft: 8,
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 90
  },
  title: {
    fontSize: 17,
    lineHeight: 24,
    flex: 1
  },
  time: {
    color: COLORS.gray2,
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 10
  },
});