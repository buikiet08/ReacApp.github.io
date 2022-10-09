import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native'
import HeaderContent from '../../component/HeaderContent';
import { COLORS, images } from '../../contains'
import { usePage } from '../../hook/usePage'

function World({ navigation }) {
  let listNews = useRef()
  const { setDataLaws } = usePage(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageCurrent, setPageCurrent] = useState(1)
  // fetch API
  useEffect(() => {
    getData()
  }, [pageCurrent])
  const getData = async () => {
    setLoading(true)
    let axios = require('axios')
    let body = JSON.stringify({
      "mod" : "get_laws",
      "page": pageCurrent,
    });
    const config = {
      method: 'post',
      url: 'https://hungtan-hungnguyen.nghean.gov.vn/laws/api/',
      data: body
    }
    await axios(config)
      .then(function (response) {
        setLoading(false)
        setData(response?.data)
      })
      .catch(function (error) {
        setLoading(false)
        console.error(error)
      });
  }
  const onLoadMore = async () => {
    let axios = require('axios')
    let body = JSON.stringify({
      "mod" : "get_laws",
      "page": pageCurrent + 1,
    });
    const config = {
      method: 'post',
      url: 'https://hungtan-hungnguyen.nghean.gov.vn/laws/api/',
      data: body
    }
    await axios(config)
      .then(function (response) {
        setLoading(false)
        setData([...data, ...response?.data])
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
  return (
    <>
      {loading ? <ActivityIndicator size='small' animating={true} style={{ marginTop: 10 }} /> :
        <View style={{ flex: 1 }}>
          {/* <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
            <HeaderContent title='Văn bản chỉ đạo' />
          </View> */}
          <FlatList
            data={data.data}
            renderItem={({ item, index }) =>
              <TouchableOpacity style={styles.blogContent} onPress={() => {
                navigation.navigate('DetailLaws')
                setDataLaws(item)
              }}>
                <View style={styles.contentTop}>
                  <Ionicons name='document-text' size={18} />
                  <Text style={{ fontWeight: 'bold', fontSize: 16,marginLeft:4 }}>Số</Text>
                  <Text style={{ fontSize: 16, color: 'red', marginLeft: 8 }}>{item.code}</Text>
                </View>
                <Text style={{ fontSize: 16, lineHeight: 24,color:COLORS.black4}} numberOfLines={2}>Tên : {item.title}</Text>
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
        </View>
      }
      <TouchableOpacity style={styles.scrollTopButton} onPress={scrollTop}>
        <AntDesign name="upcircle" size={36} color={COLORS.primary} />
      </TouchableOpacity>
    </>
  )
}

export default World

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  blogContent: {
    marginBottom: 15,
    paddingBottom:15,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gray,
    borderBottomStyle: 'solid'
  },
  contentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10
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