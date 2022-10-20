import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LogBox, ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl, ImageBackground, Dimensions } from 'react-native'
import url from '../../config/api';
import { COLORS, images } from '../../contains'
import { usePage } from '../../hook/usePage'


function Home({ navigation }) {
  let listNews = useRef()
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  const { setDataBlog } = usePage(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageCurrent, setPageCurrent] = useState(1)
  const [banner, setBanner] = useState([])

  // fetch API
  let axios = require('axios')
  useEffect(() => {
    getData()
  }, [pageCurrent])
  const getData = async () => {
    setLoading(true)
    let body = JSON.stringify({
      "mod": "get_news_home",
      "page": pageCurrent,
    });
    const config = {
      method: 'post',
      url: `${url}api/`,
      data: body
    }
    await axios(config)
      .then(function (response) {
        setLoading(false)
        setData(response?.data.data)
      })
      .catch(function (error) {
        setLoading(false)
        console.error(error)
      });

    // ---------------------
    let banner = JSON.stringify({
      "mod": "get_banner"
    });
    const configBanner = {
      method: 'post',
      url: `${url}users/register/`,
      data: banner
    }
    await axios(configBanner)
      .then(function (response) {
        setLoading(false)
        setBanner(response?.data.data)
      })
      .catch(function (error) {
        setLoading(false)
        console.error(error)
      });
  }
  const onLoadMore = async () => {
    let body = JSON.stringify({
      "mod": "get_news_home",
      "page": pageCurrent + 1,
    });
    const config = {
      method: 'post',
      url: `${url}api/`,
      data: body
    }
    await axios(config)
      .then(function (response) {
        setLoading(false)
        setData([...data, ...response.data?.data])
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
      <ActivityIndicator size='small' animating={true} /> : pageCurrent.length - 1 ? <Text style={{ color: COLORS.gray, textAlign: 'center', width: '100%' }}>Bạn đã xem hết tin</Text> : null
    )
  }

  const scrollTop = () => {
    listNews.scrollToOffset({ offset: 0, animated: true })
  }

  const onRefreshMore = () => {
    setData([])
    getData()
  }

  const insert = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
  ]

  const imageUrl = banner[1]
  const imageUrl2 = banner[0]
  const result = insert(data, 3, { "homeimgfile": `${imageUrl}` })
  const result2 = insert(result, 12, { "homeimgfile": `${imageUrl2}` })
  function useImageAspectRatio1(imageUrl) {
    const [aspectRatio, setAspectRatio] = useState(1);

    useEffect(() => {
      if (!imageUrl) {
        return;
      }

      let isValid = true;
      Image.getSize(imageUrl, (width, height) => {
        if (isValid) {
          setAspectRatio(width / height);
        }
      });

      return () => {
        isValid = false;
      };
    }, [imageUrl]);

    return aspectRatio;
  }
  function useImageAspectRatio2(imageUrl2) {
    const [aspectRatio2, setAspectRatio2] = useState(0);

    useEffect(() => {
      if (!imageUrl2) {
        return;
      }

      let isValid = true;
      Image.getSize(imageUrl2, (width, height) => {
        if (isValid) {
          setAspectRatio2(width / height);
        }
      });

      return () => {
        isValid = false;
      };
    }, [imageUrl2]);

    return aspectRatio2;
  }
  const aspectRatio = useImageAspectRatio1(imageUrl);
  const aspectRatio2 = useImageAspectRatio2(imageUrl2);


  // onScroll={(event) => setPosition(event.nativeEvent.contentOffset.y)}
  // get banner
  
  return (
    <>
      {loading ? <ActivityIndicator size='small' animating={true} style={{ marginTop: 10 }} /> :
        <FlatList
          data={result2}
          renderItem={({ item, index }) =>
            index === 3 ? <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', flex: 1, alignItems: 'center', paddingVertical: 10 }}>
              <Image source={item?.homeimgfile ? { uri: item?.homeimgfile } : images.noImage} style={{
                width: '100%',
                aspectRatio,
                borderRadius: 4,
                marginBottom: 32,
                overflow: 'hidden',
              }} />
            </View> : index === 12 ? <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', flex: 1, alignItems: 'center', paddingVertical: 10 }}>
              <Image source={item?.homeimgfile ? { uri: item?.homeimgfile } : images.noImage} style={{
                width: '100%',
                aspectRatio2,
                borderRadius: 4,
                marginBottom: 32,
                minHeight: 40,
                overflow: 'hidden',
              }} />
            </View> :
              <TouchableOpacity activeOpacity={index !== 3 ? 0.8 : index !== 8 ? 0.8 : 1} style={styles.blogItem} key={item?.id} onPress={() => {
                navigation.navigate('Detail')
                setDataBlog(item)
              }}>
                <View style={styles.blogImage}>
                  <Image source={item?.homeimgfile ? { uri: item?.homeimgfile } : images.noImage} style={{ width: '100%', height: 90 }} resizeMethod='resize' />
                </View>

                <View style={styles.blogContent}>
                  <Text style={styles.title} numberOfLines={3}>{item?.title}</Text>
                  <Text style={styles.time}>{item?.publtime}</Text>
                </View>
              </TouchableOpacity>
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
    borderBottomStyle: 'solid',
    position: 'relative',
  },
  blogImage: {
    width: '30%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden'
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