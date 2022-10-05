import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LogBox, ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native'
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'

function Home({ navigation }) {
  let listNews = useRef()
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  const { setDataBlog } = usePage(null)
  const [test, setTest] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageCurrent, setPageCurrent] = useState(1)
  // fetch API
  useEffect(() => {
    getData()
  }, [pageCurrent])
  const getData = async () => {
    let axios = require('axios')
    let body = JSON.stringify({
      "mod": "get_news_home",
      "page": pageCurrent,
    });
    const config = {
      method: 'post',
      url: 'https://hungtan.demobcb.work/api/',
      data: body
    }
    await axios(config)
      .then(function (response) {
        setLoading(false)
        setTest(response?.data.data)
      })
      .catch(function (error) {
        setLoading(false)
        console.error(error)
      });
  }
  const onLoadMore = async () => {
    let axios = require('axios')
    let body = JSON.stringify({
      "mod": "get_news_home",
      "page": pageCurrent + 1,
    });
    const config = {
      method: 'post',
      url: 'https://hungtan.demobcb.work/api/',
      data: body
    }
    await axios(config)
      .then(function (response) {
        setLoading(false)
        setTest([...test, ...response.data?.data])
        setPageCurrent(...pageCurrent, pageCurrent + 1)
      })
      .catch(function (error) {
        setLoading(false)
        console.error(error)
      });
  }
  // loading
  const renderFooter = () => {
    return (loading ?
      <ActivityIndicator size='large' animating={true} /> : <Text style={{ color: COLORS.gray, textAlign: 'center', width: '100%' }}>Không tìm thấy dữ liệu</Text>
    )
  }

  const scrollTop = () => {
    listNews.scrollToOffset({ offset: 0, animated: true })
  }
  const onRefreshMore = () => {
    setTest([])
    getData()
  }
  // onScroll={(event) => setPosition(event.nativeEvent.contentOffset.y)}
  return (
    <>
      {loading ? <ActivityIndicator size='small' animating={true} /> :
        <FlatList
          data={test}
          renderItem={({ item, index }) =>
            <View style={styles.blogItem} key={item.id}>
              <View style={styles.blogImage}>
                <Image source={{ uri: `${item.homeimgfile ? item.homeimgfile : 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png'}` }} style={{ width: '100%', height: 90 }} resizeMethod='resize' />
              </View>
              <TouchableOpacity style={styles.blogContent} onPress={() => {
                navigation.navigate('Detail')
                setDataBlog(item)
              }}>
                <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
                <Text style={styles.time}>{item.publtime}</Text>
              </TouchableOpacity>
            </View>
          }
          contentContainerStyle={{ padding: 16 }}
          keyExtractor={(item, index) => index.toString()}
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

export default Home

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