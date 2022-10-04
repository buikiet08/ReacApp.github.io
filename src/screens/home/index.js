import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LogBox, ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view';
import BackToTop from '../../component/BackToTop'
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'

function Home({ navigation }) {
  const width = Dimensions.get('window').width
  const appViewRef = useRef()
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  const { setDataBlog } = usePage(null)
  const [position, setPosition] = useState()
  const [refreshing, setRefreshing] = useState(false);
  const [onWebviewScroll, setOnWebviewScroll] = useState(true);

  const [test, setTest] = useState([])
  const [loading, setLoading] = useState()
  const [pageCurrent, setPageCurrent] = useState(1)
  // 

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
        // if (test.length > 0) {
        //   setTest([...test, ...response?.data?.data])
        // } else if (test === []) {
        //   setTest([])
        // } else {
        //   setTest(response?.data.data)
        // }
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
        if(response.data.data.length > 0) {
          setTest([...test, ...response?.data?.data])
          setPageCurrent(pageCurrent + 1)
        }
      })
      .catch(function (error) {
        setLoading(false)
        console.error(error)
      });
  }
  // loading
  const renderFooter = () => {
    return (loading ?
      <ActivityIndicator size='large' animating={true} /> : <Text style={{ color: COLORS.gray, textAlign: 'center', width: '100%', marginBottom: 30 }}>Không tìm thấy dữ kiệu</Text>
    )
  }
  // refreshing
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    appViewRef.current?.reload()
    getData()
    setRefreshing(false)
    setLoading(false)
  }, []);
  // const scrollTop = () => {
  //   setPosition((e) => e = 0)
  //   console.error(position)
  // }
  // onScroll={(event) => setPosition(event.nativeEvent.contentOffset.y)}
  return (
    <>
      <ScrollView style={styles.container}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refreshing}
      //     onRefresh={onRefresh}
      //     enabled={Platform.OS === "ios" ? true : onWebviewScroll} />
      // }

      >
        <FlatList
          // ref={appViewRef}
          // onScroll={(event) => {
          //   if (event.nativeEvent.contentOffset.y == 0) {
          //     setOnWebviewScroll(true);
          //   } else {
          //     setOnWebviewScroll(false);
          //   }
          // }}
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
          keyExtractor={(item, index) => `${item.key}${index}`}
          listKey={`list${Math.random()}`}
          ListFooterComponent={renderFooter}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0}
        />

        {/* <Panigation /> */}
      </ScrollView>
      {/* <TouchableOpacity style={styles.scrollTopButton} onPress={scrollTop}>
        <AntDesign name="upcircle" size={44} color={COLORS.primary} />
      </TouchableOpacity> */}
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
    bottom: 60,
    right: 10
  },
});